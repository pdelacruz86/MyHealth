/*****************************************************************************/
/* ProviderSetupModal: Event Handlers */
/*****************************************************************************/
Template.ProviderSetupModal.events({
    "click #btnvalidatecredentials" : function(e, tmp){

        //validate provider exists
        var exists = Providers.find({user_id :  Meteor.userId(), provider_name : "aetna"}).fetch();

        var providername="aetna", providerusername="dwaller11967", providerpassword="o2zSVxyu1v";


        if(exists.length > 0){
            //update
            //insert
            Meteor.call("user_update_provider",providername, providerusername, providerpassword, function(error, user_id) {
                console.log(user_id);
            });
        }else{
            //insert
            Meteor.call("user_add_provider",providername, providerusername, providerpassword, function(error, user_id) {
                console.log(user_id);
            });
        }

    },
    "click #btnstartsync" : function(){
        Meteor.call("Update_user_Claims", function(err, data){

        });
    }
});

/*****************************************************************************/
/* ProviderSetupModal: Helpers */
/*****************************************************************************/
Template.ProviderSetupModal.helpers({
});

/*****************************************************************************/
/* ProviderSetupModal: Lifecycle Hooks */
/*****************************************************************************/
Template.ProviderSetupModal.created = function () {
};

Template.ProviderSetupModal.rendered = function () {
};

Template.ProviderSetupModal.destroyed = function () {
};
