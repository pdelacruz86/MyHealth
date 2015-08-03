HomeController = RouteController.extend({
  layoutTemplate: 'basicLayout',

  subscriptions: function() {
      this.subscribe('hb_profiles')
  },

  data: function () {
  },

  action: function() {
    this.render('Home');


  }
});
