var express = require('express');
var app = express();

// Setup handlebars view engine.
var handlebars = require('express-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Setup path for public.
app.use(express.static(__dirname + '/public'));

// Setup port.
app.set('port', process.env.PORT || 3000);

// Setup tests. Run tests if ?test=1 in URL.
app.use(function(req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' &&
                           req.query.test === '1';
    next();
});

function getWeather() {
    return {
        locations : [
            {
                name: 'Portland',
                forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
                weather: 'Overcast',
                temp: '54.1 F (12.3 C)'
            },
            {
                name: 'Bend',
                forecastUrl: 'http://wunderground.com/US/OR/Bend.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
                weather: 'Partly Cloudy',
                temp: '55.0 F (12.8 C)'
            },
            {
                name: 'Manzanita',
                forecastUrl: 'http://wunderground.com/US/OR/Manzanita.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
                weather: 'Light Rain',
                temp: '55.0 F (12.8 C)'
            }
        ]
    };
}


app.use(function(req, res, next) {
    if (!res.locals.partials) res.locals.partials = { };
    res.locals.partials.weather = getWeather();
    next();
});

/* Setting routes. */
app.get('/', function(req, res) {
    // Hbs engine automatically sets status to 200 and content type to text/html by default.
    res.render('home');
});

app.get('/about', function(req, res) {
    res.render('about', {
        pageTestScript: '/qa/tests-about.js'
    });
});

app.get('/tours/hood-river', function(req, res) {
    res.render('tours/hood-river');
});

app.get('/tours/oregon-coast', function(req, res) {
    res.render('tours/oregon-coast');
});

app.get('/tours/request-group-rate', function(req, res) {
    res.render('tours/request-group-rate');
});


/* Error Handling. */
// 404 catach-all handler (middleware)
app.use(function(req, res) {
    res.status(404);
    res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + 
                app.get('port') + ' Press Ctrl-C to terminate.');
});

