/*****************************************************************************/
/* EditCredentials: Event Handlers */
/*****************************************************************************/
Template.EditCredentials.events({
    'click #btnUpdateCredential' : function(tmp, evt){
        //evt.preventDefault();

        console.log('entro !!!!')
        var username =  $('input#inputProviderUserName').val();
        var pass = $('input#inputProviderPassword').val();

        console.log(username, pass);

        Meteor.call("user_update_provider", "aetna", username, pass);


    }
});

/*****************************************************************************/
/* EditCredentials: Helpers */
/*****************************************************************************/
Template.EditCredentials.helpers({
});

/*****************************************************************************/
/* EditCredentials: Lifecycle Hooks */
/*****************************************************************************/
Template.EditCredentials.created = function () {
};

Template.EditCredentials.rendered = function () {
};

Template.EditCredentials.destroyed = function () {
};
