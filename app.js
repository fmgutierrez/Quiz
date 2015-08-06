var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var methodOverride = require('method-override');
var session = require('express-session');

var routes = require('./routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials());

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('Quiz 2015'));
app.use(session());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Auto-logout
app.use(function(req, res, next) {      

        if (req.session.user) {            
            var ahora = (new Date()).getTime();

            if (ahora>req.session.expiracion) {
                console.log("Excedido tiempo de sesión.");
                delete req.session.user;                
                res.redirect(req.session.redir.toString());
            } else {
                req.session.expiracion = ahora + 120000;      // Actualizamos el tiempo de expiración
            }          
        }  
    next();
});

// Helpers dinámicos:
app.use(function(req, res, next) {

    // guardar path en session.redir para después de login
    // He tenido que añadir no solo login y logout, sino que /stylesheets/style.css, /stylesheets/wide.css y /stylesheets/smarthphone.css
    // porque al cargar una página, después carga las hojas de estilos y req.path las recoge también. Así evito que req.session.redir las 
    // cargue.
    if (!req.path.match(/\/login|\/logout|\/stylesheets\/style.css|\/stylesheets\/wide.css|\/stylesheets\/smarthphone.css/)) {
        req.session.redir = req.path;
        //console.log(req.path); 
    }

    // Hacer visible req.session en las vistas
    res.locals.session = req.session;
    next();
});

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            errors: []
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        errors: []
    });
});


module.exports = app;
