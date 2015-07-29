

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