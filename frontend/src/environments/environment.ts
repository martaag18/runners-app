export const environment = {
    production: false,
    googleMapsApiKey: 'AIzaSyBoitwdYbHbH0BRwtcswB5lPVTrSR-ozQA',
    apiUrl: typeof process !== 'undefined' && process.env['NEXT_PUBLIC_API_URL']
        ? process.env['NEXT_PUBLIC_API_URL']
        : 'http://localhost:3000'  // Solo se usa en local
};