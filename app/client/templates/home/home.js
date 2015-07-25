Template.home.helpers({

});

Template.home.events({

});


Template['home'].rendered = function(){
    var test = HB_Profiles.find({userId : Meteor.userId});


    console.log(test.fetch());
}