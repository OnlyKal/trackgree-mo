module.exports = {
    API: /*  'http://localhost:5006/api' || */ 'http://api.trackgree.com/api',
    GOOGLE_API_KEY: 'AIzaSyAdJV9LXQyXqWqa1Sku19Gt6c-UABzTNrQ',
    GEOCODEAPI: (lat, lng) => `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${require('./index').GOOGLE_API_KEY}`,
    GEOCODEAPI2: (lat, lng) => `https://maps.googleapis.com/maps/api/place/textsearch/json?location=${lat},${lng}&oe=utf-8&key=${require('./index').GOOGLE_API_KEY}`,
    PASSCODE_KEY: "XYzTy5xzLauNaEv014",
    GEOCODEAPI3: (lat, lng) => `https://dev.virtualearth.net/REST/v1/Locations/${lat},${lng}?o=json&key=${require('./index').BING_API_KEY}`,
    BING_API_KEY: 'AhL1zEUj8aic-5dcvJtuOk-_eYV8jwfVjaL8sDQUyLEx8HALgFa-x573y0qZVlVe',
}