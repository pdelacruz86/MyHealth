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
                      provider_password :  providerpassword, valid_credentials: null, createdAt : new Date()
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
  },
  user_update_provider_set_valid_credentials: function(providername, validlogin){

    check(providername, String);
    check(validlogin, Boolean);

    Providers.update({user_id : this.userId, provider_name : providername}, {$set : { valid_credentials :  validlogin}});

    console.log('entro');
  },
  user_remove_provider: function(){

    Providers.remove({user_id : this.userId});
  },
  get_progress : function(currentvalue){
    this.unblock();
    check(currentvalue, String);


    Meteor._sleepForMs(100); //to simulate longer response sleep for 2 seconds
    //do something
    return currentvalue;
  },
  testingclaimsquery : function(){

    var x =  HB_Profiles.find(
        {user_id:  "26uEAN2DBaJRufBe9"});

    var results = HB_Profiles.find({user_id:  "26uEAN2DBaJRufBe9"},
        {claims : { "$elemMatch" : {  "type" : "Medical" }}}).fetch();
    console.log(results.length)

    console.log(results);

    return results;
  }
});
