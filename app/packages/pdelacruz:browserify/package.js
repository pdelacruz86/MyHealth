/**
 * Created by pdelacruz on 8/19/15.
 */


Package.describe({
    name: 'pdelacruz:browserify',
    version: '0.1.0',
    summary: 'using cosmos:browserify',
    git: '',
    documentation: 'README.md'
});

// Declare NPM modules for Meteor to download into .npm/package
Npm.depends({
    nightmare : "1.8.2", 'http-browserify' : "1.1.0"
});

Package.onUse(function(api) {
    api.versionsFrom('1.1.0.2');
    api.use(['cosmos:browserify@0.4.0'], 'client'); // need this package

    api.addFiles([
            'client.browserify.js',           // browserify file
            'client.browserify.options.json'  // browserify options file
        ],
        'client'
    );

    // export it to global app scope
    api.export('http', 'client');
    api.export('nightmare', 'client');

});
