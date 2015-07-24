HomeController = RouteController.extend({
  layoutTemplate: 'basicLayout',

  subscriptions: function() {

  },

  action: function() {
    this.render('Home');
  }
});
