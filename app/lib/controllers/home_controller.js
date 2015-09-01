HomeController = RouteController.extend({
  layoutTemplate: 'basicLayout',

  subscriptions: function() {
    this.subscribe('hb_profiles');
    this.subscribe('claims');
    this.subscribe('members');
  },

  waitOn: function(){
    return [Meteor.subscribe('claims'), Meteor.subscribe('members')];
  },

  data: function () {
  },

  action: function() {
    this.render('Home');


  }
});
