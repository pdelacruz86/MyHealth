HB_Profiles = new Mongo.Collection("hb_profiles");

Meteor.methods({
  create_profile: function(user_id) {
    console.log("CREATING profile");

    var profileid = HB_Profiles.insert({"user_id": user_id, "claims" : []});
    return profileid;
  },
  update_profile: function(){

  }
});


function loadUser(user) {
  var userAlreadyExists = typeof Meteor.users.findOne({ username : user.username }) === 'object';

  if (!userAlreadyExists) {
    Accounts.createUser(user);
  }
}

function InitializeUserProfile(user){
  console.log(user);
  //HB_Profiles.insert({"user_id": })
}

Meteor.startup(function () {
  var users = YAML.eval(Assets.getText('users.yml'));

  //console.log(this)

  for (key in users) if (users.hasOwnProperty(key)) {
    loadUser(users[key]);
  }


});