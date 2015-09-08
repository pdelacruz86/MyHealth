Template.header.created = function () {

};

Template['header'].helpers({
  "username" : function(){

    var username = '';
    var user = Meteor.user();

    if(user.emails == null){
      if(user.services.google != null){
        username = user.services.google.email;
      }

      if(user.services.google != null){
        username = user.services.google.email;
      }
    }

    return username;
  }
});

Template['header'].events({
  'click #logout' : function () {
    event.preventDefault();
    Meteor.logout();
    Router.go('login');
  }
});

