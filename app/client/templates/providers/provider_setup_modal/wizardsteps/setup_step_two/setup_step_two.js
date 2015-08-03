/*****************************************************************************/
/* SetupStepTwo: Event Handlers */
/*****************************************************************************/
Template.setupStepTwo.events({
    "click #btnvalidatecredentials" : function(e, tmp){

        e.preventDefault();
//debugger;
//        $("#btnvalidatecredentials").attr("class", "btn btn-primary disabled");
//        $("#btnvalidatecredentials").text("loading...");
//        $("#btnvalidatecredentials").attr("disabled", "disabled");
//
//        $("#step2btn").attr("class", "btn btn-success btn-lg pull-right disabled");
//        $("#step2btn").text("loading...");
//        $("#step2btn").attr("disabled", "disabled");
//
//        //validate provider exists
//        var exists = Providers.find({user_id :  Meteor.userId(), provider_name : "aetna"}).fetch();
//
//        var providername="aetna", providerusername=tmp.find('input#inputProviderUserName').value,
//            providerpassword=tmp.find('input#inputProviderPassword').value;
//
//        console.log(providerusername, providerpassword);
//
//
//        if(exists.length > 0){
//            //update
//            Meteor.call("user_update_provider",providername, providerusername, providerpassword, function(error, user_id) {
//                console.log(user_id);
//            });
//        }else{
//            //insert
//            Meteor.call("user_add_provider",providername, providerusername, providerpassword, function(error, user_id) {
//                console.log(user_id);
//            });
//        }
//
//        Meteor.call("providers_validate_credentials", function(err, data){
//            Meteor.call("user_update_provider_set_valid_credentials",providername, data);
//
//            $("#btnvalidatecredentials").attr("class", "btn btn-primary");
//            $("#btnvalidatecredentials").text("Validate Credentials");
//            $("#btnvalidatecredentials").removeAttr("disabled");
//
//
//            $("#step2btn").text("Next");
//
//            if(data){
//                $("#step2btn").attr("class", "bbtn btn-success btn-lg pull-right");
//                $("#step2btn").removeAttr("disabled");
//
//                tmp.find('#step2btn').click();
//            }
//            else{
//
//            }
//        });

        ///------------------------end of final code ------------------------------------
    }
});

/*****************************************************************************/
/* SetupStepTwo: Helpers */
/*****************************************************************************/
Template.setupStepTwo.helpers({
    InvalidCredentials : function(){
        return Providers.findOne({user_id : Meteor.userId(), provider_name : 'aetna'}).valid_credentials;
    }
});

/*****************************************************************************/
/* SetupStepTwo: Lifecycle Hooks */
/*****************************************************************************/
Template.setupStepTwo.created = function () {
    //Meteor.call("user_update_provider_set_valid_credentials", "aetna", null);

};

Template.setupStepTwo.rendered = function () {
    var userdata = Providers.findOne({user_id : Meteor.userId(), provider_name : 'aetna'});

    $('input#inputProviderUserName').val(userdata.provider_user_name);
    $('input#inputProviderPassword').val(userdata.provider_password);

};

Template.setupStepTwo.destroyed = function () {
};
