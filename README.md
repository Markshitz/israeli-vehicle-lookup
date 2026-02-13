# Israeli Vehicle Lookup - Backend Setup

## Why You Need This Backend

The Israeli government API (data.gov.il) has **CORS restrictions** that prevent direct browser access. This simple Node.js server acts as a proxy to fetch the data for you.

## Quick Setup (5 minutes)

### Step 1: Install Node.js
Download and install from: https://nodejs.org/ (choose LTS version)

### Step 2: Install Dependencies
Open terminal/command prompt in this folder and run:
```bash
npm install
```

### Step 3: Start the Server
```bash
npm start
```

You should see:
```
🚀 Server running on http://localhost:3000
📝 Test: http://localhost:3000/api/vehicle/60570703
```

### Step 4: Test It
Open your browser and go to:
```
http://localhost:3000/api/vehicle/60570703
```

You should see real data from the Israeli government database!

### Step 5: Update Your HTML App
In your israeli-vehicle-lookup.html file, change this line:

**FROM:**
```javascript
const vehicle = DEMO_DATABASE[plateNumber];
```

**TO:**
```javascript
const response = await fetch(`http://localhost:3000/api/vehicle/${plateNumber}`);
const result = await response.json();
const vehicle = result.success ? result.data : null;
```

## That's It!

Now your app will fetch REAL data from data.gov.il! 🎉

## Troubleshooting

**"npm: command not found"**
- Install Node.js from nodejs.org

**"Port 3000 is already in use"**
- Change PORT = 3000 to PORT = 3001 in server.js

**"ECONNREFUSED" or timeout errors**
- Check your internet connection
- The government API might be temporarily down

## For Production Deployment

Deploy this server to:
- **Heroku** (free tier available)
- **Railway** (easy deployment)
- **Vercel** (with serverless functions)
- **DigitalOcean** ($5/month droplet)

Then update your HTML to call your deployed server URL instead of localhost.
