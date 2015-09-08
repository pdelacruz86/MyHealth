/**
 * Created by pdelacruz on 7/12/15.
 */


/*
UI Helpers
Define UI helpers for common template functionality.
*/
UI.registerHelper('currentRoute', function(route) {
    if (Session.equals('currentRoute', route)) {
        return 'active';
    } else {
        return '';
    }
});

UI.registerHelper('userIdentity', function(userId) {
    var getService, getUser, services;
    getUser = Meteor.users.findOne({
        _id: Meteor.userId()
    });
    if (getUser.emails) {
        return getUser.emails[0].address;
    } else if (getUser.services) {
        services = getUser.services;
        getService = (function() {
            switch (false) {
                case !services.facebook:
                    return services.facebook.email;
                case !services.github:
                    return services.github.email;
                case !services.google:
                    return services.google.email;
                case !services.twitter:
                    return services.twitter.screenName;
                default:
                    return false;
            }
        })();
        return getService;
    } else {
        return getUser.profile.name;
    }
});

UI.registerHelper('userPicture', function(userId) {
    var getService, getUser, services;
    getUser = Meteor.users.findOne({
        _id: Meteor.userId()
    });
    if (getUser.emails) {
        return "";//getUser.emails[0].address;
    } else if (getUser.services) {
        services = getUser.services;
        getService = (function() {
            switch (false) {
                case !services.facebook:
                    return services.facebook.email;
                case !services.github:
                    return services.github.email;
                case !services.google:
                    return services.google.picture;
                case !services.twitter:
                    return services.twitter.profile_image_url;
                default:
                    return false;
            }
        })();
        return getService;
    } else {
        return getUser.profile.name;
    }
});