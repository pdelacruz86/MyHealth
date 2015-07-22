/**
 * Created by pdelacruz on 7/12/15.
 */
// Home Route
Router.route('/', {
    name: 'home',
    action: function () {
        this.render('home');
        SEO.set({ title: 'Landing page - ' + Meteor.App.NAME});
    }
});
