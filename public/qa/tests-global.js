suite('Global Tests', function() {
    test('page has a valid title', function() {
        assert(document.title && document.title.match(/\S/) &&
               document.title.toUpperCase() !== 'TODO');
    });

    test('weather widget exists', function() {
        assert(document.getElementsByName('weatherWidget'), 'Weather widget doesn\'t exist');
    });
});

