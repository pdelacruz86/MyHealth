// Home Route
Router.route('/', {
  name: 'home',
  action: function () {
    this.render('blank');
    SEO.set({ title: 'Home - ' + Meteor.App.NAME + ' testing' });
  }
});
