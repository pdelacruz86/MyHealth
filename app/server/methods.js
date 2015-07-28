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

    return "";
  },
  user_add_provider: function(providername, providerusername, providerpassword){

    console.log(providername,providerusername, providerpassword, this.userId, new Date());

    check(providername, String);
    check(providerusername, String);
    check(providerpassword, String);
    //

    Providers.insert({user_id : this.userId, provider_name : providername, provider_user_name : providerusername,
                      provider_password :  providerpassword, createdAt : new Date()
      });

    console.log('entro');
  },
  user_update_provider: function(providername, providerusername, providerpassword){

    check(providername, String);
    check(providerusername, String);
    check(providerpassword, String);
    //

    Providers.update({user_id : this.userId}, {$set : {provider_name : providername, provider_user_name : providerusername,
      provider_password :  providerpassword}});

    console.log('entro');
  }
});
