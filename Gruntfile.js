module.exports = function(grunt) {
    // Load plugins.
    [
        'grunt-cafe-mocha',
        'grunt-contrib-jshint',
        'grunt-exec'
    ].forEach(function(task) {
        grunt.loadNpmTasks(task);
    });

    // Configure plugins.
    grunt.initConfig({
        cafemocha: {
            all: { src: 'qa/tests-*.js', options: { ui: 'tdd' } }
        },
        jshint : {
            app: ['meadowlark.js', 'public/js/**/*.js', 'lib/**/*.js'],
            qa: ['Gruntfile.js', 'public/qa/**/*.js', 'qa/**/*.js']
        },
        exec: { // Link checking.
            // Main site
            meadowlark: { cmd: 'linkchecker --no-warnings http://localhost:3000' }

            // Weather widget
            // weatherPortland: { cmd: 'linkchecker http://www.wunderground.com/US/OR/Portland.html'},
            // weatherBend: { cmd: 'linkchecker http://wunderground.com/US/OR/Bend.html'},
            // weatherManzanita: { cmd: 'linkchecker http://wunderground.com/US/OR/Manzanita.html'},
            // weatherCloudy: { cmd: 'linkchecker http://icons-ak.wxug.com/i/c/k/cloudy.gif'},
            // weatherPartlyCloudy: { cmd: 'linkchecker http://icons-ak.wxug.com/i/c/k/partlycloudy.gif'},
            // weatherRain: { cmd: 'linkchecker http://icons-ak.wxug.com/i/c/k/rain.gif'}
        }
    });

    // Register tasks.
    grunt.registerTask('default', ['cafemocha', 'jshint', 'exec']);
};
