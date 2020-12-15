const request = require('request')

const forecast = (address, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=9174f646315ccb2682973e31939b0d65&query="+ encodeURIComponent(address) +"&units=f"

    request({ url, json: true }, (error, { body} = {}) => {
        if(error){
            callback('unable to connect to weather service', undefined)
        } else if(body.error){
            const error = body.error
            callback(`Error getting weather info 
                        Type: ${error.type}
                        Description: ${error.info}`, undefined)
        } else {
            callback( undefined, {
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            })
        }
    })
}

module.exports = forecast