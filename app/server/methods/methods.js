/*****************************************************************************/
/* Server Only Methods */
/*****************************************************************************/
Meteor.methods({
  /*
   * Example:
   *
   * '/app/items/insert': function (item) {
   * }
   */


  create_profile: function() {
    console.log("CREATING profile");

    var profileid = HB_Profiles.insert({"user_id": this.userId, "claims" : []});
  },
  update_profile_setup_claims: function(claims){

    //set claims = []
    return HB_Profiles.update({user_id : this.userId} , {$set : { claims : [] }});

    //return "";
  },
  user_add_provider: function(providername, providerusername, providerpassword){

    console.log(providername,providerusername, providerpassword, this.userId, new Date());

    check(providername, String);
    check(providerusername, String);
    check(providerpassword, String);
    //

    Providers.insert({user_id : this.userId, provider_name : providername, provider_user_name : providerusername,
                      provider_password :  providerpassword, valid_credentials: null, completed_setup : false,
                      login_type : null, createdAt : new Date()
      });
  },
  user_update_provider: function(providername, providerusername, providerpassword){

    check(providername, String);
    check(providerusername, String);
    check(providerpassword, String);
    //

    Providers.update({user_id : this.userId}, {$set : {provider_name : providername, provider_user_name : providerusername,
      provider_password :  providerpassword}});
  },
  user_update_provider_set_valid_credentials: function(providername, validlogin){

    check(providername, String);
    check(validlogin, Boolean);

    Providers.update({user_id : this.userId, provider_name : providername}, {$set : { valid_credentials :  validlogin}});
  },
  user_update_provider_set_completed_setup: function(providername, value){

    Providers.update({user_id : this.userId, provider_name : providername}, {$set : { completed_setup :  value}});
  },
  user_update_provider_set_login_type: function(providername, logintype){

    Providers.update({user_id : this.userId, provider_name : providername}, {$set : { login_type :  logintype}});
  },
  user_remove_provider: function(){

    Providers.remove({user_id : this.userId});
  }
});
