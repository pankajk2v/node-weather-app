const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

app.set('view engine', 'hbs') 
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Pankaj Kumar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Weather',
        name: 'Pankaj Kumar'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'address is required'
        })
    }

    const weather ={};

    geocode(req.query.address, (error, { location, latitude, longitude } = {}) => {
        if(error){
            return res.send({ error })
        } 
        
        forecast(location, ( error, { description, temperature, feelslike} ) => {
            if(error){
                return res.send({ error })
            } 
            
            return res.send({
                    forecast: description,
                    temperature,
                    feelslike,
                    address: location
                })            
        })        
   })

})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Pankaj Kumar'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: "Help article not found!",
        name: 'Pankaj'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: "Page not found!",
        name: 'Pankaj'
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})