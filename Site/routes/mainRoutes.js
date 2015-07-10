// Home Route
Router.route('/', {
  name: 'home',
  action: function () {
    this.render('blank');
    SEO.set({ title: 'Home - ' + Meteor.App.NAME + ' testing' });
  }

});
Router.route('/Profile', {
  name: 'home',
  action: function () {
    this.render('Profile');
    SEO.set({ title: 'Home - ' + Meteor.App.NAME + ' testing' });
  }

});
