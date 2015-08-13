(function(){/**
 * Created by pdelacruz on 7/12/15.
 */


Router.route('/register', {
    name: 'register',
    action: function () {
        this.layout('slimLayout');
        this.render('register');
        //SEO.set({ title: 'Home - ' + Meteor.App.NAME + ' testing' });
    }
});

Router.route('/login', {
    name: 'login',
    action: function () {
        this.layout('slimLayout');
        this.render('login');
        //SEO.set({ title: 'Home - ' + Meteor.App.NAME + ' testing' });
    }
});

})();
