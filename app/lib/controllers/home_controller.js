HomeController = RouteController.extend({
  layoutTemplate: 'basicLayout',

  subscriptions: function() {
    this.subscribe('hb_profiles');
    this.subscribe('claims');
  },

  waitOn: function(){
    return [Meteor.subscribe('claims')];
  },

  data: function () {
  },

  action: function() {
    this.render('Home');


  }
});
