// Home Route
Router.route('/', {
  name: 'home',
  action: function () {
    this.render('home');
    SEO.set({ title: 'Landing page - ' + Meteor.App.NAME});
  }
});

Router.route('/register', {
  name: 'register',
  action: function () {
    this.layout('slimLayout');
    this.render('register');
    SEO.set({ title: 'Home - ' + Meteor.App.NAME + ' testing' });
  }
});

  Router.route('/login', {
      name: 'login',
      action: function () {
        this.layout('slimLayout');
        this.render('login');
        SEO.set({ title: 'Home - ' + Meteor.App.NAME + ' testing' });
      }

});
