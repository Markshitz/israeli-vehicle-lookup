// server.js - Simple Node.js backend to fetch Israeli vehicle data
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Enable CORS so your frontend can call this server
app.use(cors());
app.use(express.json());

// API endpoint to search vehicle by plate number
app.get('/api/vehicle/:plateNumber', async (req, res) => {
    const plateNumber = req.params.plateNumber;
    
    try {
        console.log(`Searching for plate: ${plateNumber}`);
        
        // Call the Israeli government API
        const response = await axios.get('https://data.gov.il/api/3/action/datastore_search', {
            params: {
                resource_id: '053cea08-09bc-40ec-8f7a-156f0677aff3',
                q: plateNumber,
                limit: 1
            },
            timeout: 10000
        });
        
        if (response.data.success && response.data.result.records.length > 0) {
            // Found the vehicle!
            const vehicle = response.data.result.records[0];
            console.log('Vehicle found:', vehicle.mispar_rechev);
            res.json({
                success: true,
                data: vehicle
            });
        } else {
            // Not found
            console.log('Vehicle not found');
            res.json({
                success: false,
                message: 'לא נמצאו נתונים עבור מספר רישוי זה'
            });
        }
        
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({
            success: false,
            message: 'שגיאה בחיבור למאגר הממשלתי',
            error: error.message
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📝 Test: http://localhost:${PORT}/api/vehicle/60570703`);
});
