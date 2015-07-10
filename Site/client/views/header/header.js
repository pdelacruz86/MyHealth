Template.header.created = function () {

};

Template['header'].helpers({

});

Template['header'].events({
  'click #logout' : function () {
    event.preventDefault();
    Meteor.logout();
    Router.go('login');
  }
});

