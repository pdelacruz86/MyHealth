/*****************************************************************************/
/* ProviderSetupModal: Event Handlers */
/*****************************************************************************/
Template.ProviderSetupModal.events({

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
    NProgress.settings.parent = ".loadingtarget";

};

Template.ProviderSetupModal.rendered = function () {
};

Template.ProviderSetupModal.destroyed = function () {
};


Template.ProviderSetupModal.steps = function() {
    return [{
        id: 'stepOne',
        title: 'Providers',
        template: 'setupStepOne',
        formId: 'setup-step-one-form'
    },
    {
        id: 'stepTwo',
        title: 'Login info',
        template: 'setupStepTwo',
        formId: 'setup-step-two-form',
        onSubmit: function(data, mergedData) {
            //$("#btnvalidatecredentials").attr("class", "btn btn-primary disabled");
            //$("#btnvalidatecredentials").text("loading...");
            //$("#btnvalidatecredentials").attr("disabled", "disabled");
            //
            //$("#step2btn").attr("class", "btn btn-success btn-lg pull-right disabled");
            //$("#step2btn").text("loading...");
            //$("#step2btn").attr("disabled", "disabled");
            //
            //var self = this;
            //
            //var username = $("input#inputProviderUserName").val();
            //var password = $("input#inputProviderPassword").val();
            //var confirmpassword = $("input#inputProviderPassword").val();
            //
            //if(username == '' || password == '' || confirmpassword == ''){
            //    $("#step2btn").attr("class", "btn btn-primary disabled");
            //    $("#step2btn").attr("disabled", "disabled");
            //}else{
            //
            //    //validate provider exists
            //    var exists = Providers.find({user_id :  Meteor.userId(), provider_name : "aetna"}).fetch();
            //
            //    var providername="aetna", providerusername= $('input#inputProviderUserName').val(),
            //        providerpassword= $('input#inputProviderPassword').val();
            //
            //    console.log(providerusername, providerpassword);
            //
            //
            //    if(exists.length > 0){
            //        //update
            //        Meteor.call("user_update_provider",providername, providerusername, providerpassword);
            //    }else{
            //        //insert
            //        Meteor.call("user_add_provider",providername, providerusername, providerpassword);
            //    }
            //
            //
            //
            //    Meteor.call("providers_validate_credentials", function(err, data){
            //        debugger;
            //        Meteor.call("user_update_provider_set_valid_credentials",providername, data);
            //
            //        $("#btnvalidatecredentials").attr("class", "btn btn-primary");
            //        $("#btnvalidatecredentials").text("Validate Credentials");
            //        $("#btnvalidatecredentials").removeAttr("disabled");
            //
            //
            //        $("#step2btn").text("Next");
            //
            //        if(data){
            //            $("#step2btn").attr("class", "bbtn btn-success btn-lg pull-right");
            //            $("#step2btn").removeAttr("disabled");
            //
            //
            //            self.next();
            //        }
            //        else{
            //
            //        }
            //    });
            //}

            this.next();
        }
    },
    {
        id: 'stepThree',
        title: 'Sync data',
        template: 'setupStepThree',
        formId: 'setup-step-three-form',
        onSubmit: function(data, mergedData) {
            this.next()
        }
    },
    {
        id: 'stepFour',
        title: 'Finish',
        template: 'setupStepFour',
        formId: 'setup-step-four-form',
        onSubmit: function(data, mergedData) {}
    }]
}

Template.setupStepOne.schema = function() {
    return new SimpleSchema({
    });
}

Template.setupStepTwo.schema = function() {
    return new SimpleSchema({

    });
}


Template.setupStepThree.schema = function() {
    return new SimpleSchema({
    });
}

Template.setupStepFour.schema = function() {
    return new SimpleSchema({

    });
}