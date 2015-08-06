/*****************************************************************************/
/* SetupStepTwo: Event Handlers */
/*****************************************************************************/
Template.setupStepTwo.events({

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
    var userdata = Providers.findOne({user_id: Meteor.userId(), provider_name: 'aetna'});

    if (userdata != undefined) {
    $('input#inputProviderUserName').val(userdata.provider_user_name);
    $('input#inputProviderPassword').val(userdata.provider_password);
    }
    $(".progress-bar-primary").attr("style", "width : 50%");


};

Template.setupStepTwo.destroyed = function () {
};
