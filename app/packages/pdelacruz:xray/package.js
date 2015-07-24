/**
 * Created by pdelacruz on 7/17/15.
 */
Package.describe({
    name: "pdelacruz:xray",
    summary: "X-Ray is a web scraping library for NodeJS that offers a simple, schema-based way to scrape websites",
    version: "0.1.0"
});

Npm.depends({
    "x-ray" : "2.0.2"
});

Package.onUse(function(api) {
    api.addFiles('xray.js', 'server');
    api.export("Xray", "server");
});