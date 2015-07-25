HomeController = RouteController.extend({
  layoutTemplate: 'basicLayout',

  subscriptions: function() {
      this.subscribe('hb_profiles')
  },

  action: function() {
    this.render('Home');
  }
});
