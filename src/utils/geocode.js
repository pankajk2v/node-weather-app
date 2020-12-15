const request = require('request')

const geocode = ( address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoicGFua2Fqd2xvZyIsImEiOiJja2lqY2FzOW0wMTlpMnNrYTVtMjR3bTFlIn0.qUMsf6vdpLs8rHGFIeNw4g&limit=1"

    request({ url, json: true }, (error, { body} = {}) => {

        if(error){
            callback('Error connecting to location services', undefined)
        } else if(body.features.length == 0) {
            callback('Unable to find location, try another search', undefined)
        } else {    
            const place = body.features[0]
            callback(undefined, { 
                'location': body.features[0].place_name, 
                'latitude': place.center[1], 
                'longitude': place.center[0] 
            } )
        }        
    })
}

module.exports = geocode