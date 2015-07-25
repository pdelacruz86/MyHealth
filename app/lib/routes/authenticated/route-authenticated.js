/**
 * Created by pdelacruz on 7/12/15.
 */
// Home Route
//Router.route('/', {
//    name: 'home',
//    action: function () {
//        this.render('home');
//        SEO.set({ title: 'Landing page - ' + Meteor.App.NAME});
//    }
//});

Router.route('/', {
    name: 'home',
    controller: 'HomeController',
    action: 'action',
    where: 'client'
});

Router.route('/home', {
    name: 'homerouting',
    controller: 'HomeController',
    action: 'action',
    where: 'client'
});

