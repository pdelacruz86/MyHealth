(function(){var createServiceConfiguration;
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
createServiceConfiguration('google', '1056827996847-kbmu0l5an7giujngci9v6q3c12p266a9.apps.googleusercontent.com', '-i8lQ9gQDPsRQjvPSbcYHtxY');
createServiceConfiguration('twitter', 'YlS2oHOyYP0dpX5h8AgPqT2Di', 'v5N88Vm2P6fJGYAQqlO1uinVp3KK21oymTpOfZy8gnET2J8Zs6');

})();
