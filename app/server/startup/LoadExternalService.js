var createServiceConfiguration;
createServiceConfiguration = function(service, clientId, secret) {
    var config;
    ServiceConfiguration.configurations.remove({
        service: service
    });
    config = {
        generic: {
            service: service,
            clientId: clientId,
            secret: secret
        },
        facebook: {
            service: service,
            appId: clientId,
            secret: secret
        },
        twitter: {
            service: service,
            consumerKey: clientId,
            secret: secret
        }
    };
    switch (service) {
        case 'facebook':
            return ServiceConfiguration.configurations.insert(config.facebook);
        case 'twitter':
            return ServiceConfiguration.configurations.insert(config.twitter);
        default:
            return ServiceConfiguration.configurations.insert(config.generic);
    }
};

/*createServiceConfiguration('facebook', 'Insert your appId here.', 'Insert your secret here.');
createServiceConfiguration('github', 'Insert your clientId here.', 'Insert your secret here.');*/
createServiceConfiguration('google', process.env["EXT_SERVICE_GOOGLE_CLIENT_ID"], process.env["EXT_SERVICE_GOOGLE_SECRET"]);
createServiceConfiguration('twitter', process.env["EXT_SERVICE_TWITTER_CLIENT_ID"],process.env["EXT_SERVICE_TWITTER_SECRET"]);