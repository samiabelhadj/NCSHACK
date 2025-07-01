# Google Maps API Setup Guide

## Getting Your Google Maps API Key

1. **Go to Google Cloud Console**

   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one

2. **Enable Maps JavaScript API**

   - Go to "APIs & Services" > "Library"
   - Search for "Maps JavaScript API"
   - Click on it and press "Enable"

3. **Create API Key**

   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy your new API key

4. **Restrict API Key (Recommended)**
   - Click on your API key to edit it
   - Under "Application restrictions", select "HTTP referrers"
   - Add your domain (e.g., `localhost:3000/*` for development)
   - Under "API restrictions", select "Restrict key"
   - Choose "Maps JavaScript API"

## Configure the Application

1. **Update the API Key**

   - Open `public/index.html`
   - Replace `YOUR_GOOGLE_MAPS_API_KEY` with your actual API key in two places:
     - Line 16: `window.GOOGLE_MAPS_API_KEY = 'YOUR_ACTUAL_API_KEY';`
     - Line 18: `src="https://maps.googleapis.com/maps/api/js?key=YOUR_ACTUAL_API_KEY&libraries=places"`

2. **Example:**
   ```html
   <script>
     window.GOOGLE_MAPS_API_KEY = "AIzaSyBYourActualAPIKeyHere";
   </script>
   <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBYourActualAPIKeyHere&libraries=places"></script>
   ```

## Features Available

Once configured, the Google Maps integration provides:

- **Interactive Map**: Shows all bin locations with custom markers
- **Status-Based Markers**: Different colored markers for different bin statuses
  - 🟢 Green: Active bins
  - 🔴 Red: Full bins
  - 🟡 Yellow: Maintenance bins
  - ⚫ Gray: Inactive bins
- **Info Windows**: Click markers to see detailed bin information
- **Auto-Fit**: Map automatically adjusts to show all bin locations
- **Responsive Design**: Works on desktop and mobile devices

## Troubleshooting

- **Map not loading**: Check if your API key is correct and has proper restrictions
- **Markers not showing**: Ensure the Maps JavaScript API is enabled
- **CORS errors**: Make sure your domain is added to the API key restrictions

## Security Notes

- Never commit your API key to version control
- Use environment variables in production
- Restrict your API key to specific domains
- Monitor your API usage in Google Cloud Console
