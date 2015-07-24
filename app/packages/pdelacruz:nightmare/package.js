/**
 * Created by pdelacruz on 7/17/15.
 */
Package.describe({
    name: "pdelacruz:nightmare",
    summary: "Nightmare is a high level wrapper for PhantomJS that lets you automate browser tasks.",
    version: "0.1.0"
});

Npm.depends({
    nightmare : "1.8.2"
});

Package.onUse(function(api) {
    api.versionsFrom(['METEOR@0.9.1.1', 'METEOR@1.0']);
    api.addFiles('nightmare.js', 'server');
    api.export("nightmare", "server");
});