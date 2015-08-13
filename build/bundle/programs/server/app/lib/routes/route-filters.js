(function(){/**
 * Created by pdelacruz on 7/12/15.
 */


var checkUserLoggedIn, userAuthenticated;
checkUserLoggedIn = function() {
    if (!Meteor.loggingIn() && !Meteor.user()) {
        return Router.go('/login');
    } else {
        return this.next();
    }
};
/*
 Filter: Check if a User Exists
 If a user is logged in and attempts to go to a public route, re-route
 them to the main "logged in" screen.
 */
userAuthenticated = function() {
    if (!Meteor.loggingIn() && Meteor.user()) {
        return Router.go('/');
    } else {
        return this.next();
    }
};
Router.onBeforeAction(checkUserLoggedIn, {
    except: ['login', 'register']
});
Router.onBeforeAction(userAuthenticated, {
    only: ['login', 'register']
});

})();
