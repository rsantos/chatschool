const path = require('path')
const morgan = require('morgan')
const methodOverride = require('method-override')
const expressSession = require('express-session')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const hbs = require('express-hbs')
const express = require('express')

module.exports = (app) => {
    app.set('port', 9000)
    app.set('views', path.join(__dirname, './../../../build/views'))
    app.set('view engine', 'hbs')
    app.set('assets', path.join(__dirname, './../../../build'))

    app.use(express.static(app.get('assets')))
    app.use(morgan('dev'))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(methodOverride('_method'))
    app.use(expressSession({
        secret: 'QWERTYPOIUYTASDFLKJHGZXCVMNB',
        resave: false,
        saveUninitialized: false
    }))
    app.use(expressValidator())
    app.engine('hbs', hbs.express4({
        defaultLayout: path.join(app.get('views'), 'layouts/main.hbs'),
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
    }))
}
