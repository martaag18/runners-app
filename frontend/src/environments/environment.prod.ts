export const environment = {
    production: true,
    googleMapsApiKey: process.env['GOOGLE_MAPS_API_KEY'] || ''
  };
  
console.log('Google Maps API Key (prod):', environment.googleMapsApiKey);
