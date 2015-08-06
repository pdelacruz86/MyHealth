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

};

Template.ProviderSetupModal.rendered = function () {
    $($(".linkwizardtabselector i")[0]).attr("class", "fa fa-h-square m-r-xs");
    $($(".linkwizardtabselector i")[1]).attr("class", "fa fa-user m-r-xs");
    $($(".linkwizardtabselector i")[2]).attr("class", "fa fa-plug m-r-xs");
    $($(".linkwizardtabselector i")[3]).attr("class", "fa fa-check m-r-xs");

};

Template.ProviderSetupModal.destroyed = function () {
};


Template.ProviderSetupModal.steps = function() {
    return [{
        id: 'stepOne',
        title: 'Let s pick a provider',
        template: 'setupStepOne',
        showLink: 'false',
        formId: 'setup-step-one-form'
    },
    {
        id: 'stepTwo',
        title: 'Provider Access',
        template: 'setupStepTwo',
        formId: 'setup-step-two-form',
        onSubmit: function(data, mergedData) {

            $("#step2btn").attr("class", "btn btn-default pull-right disabled");
            $("#step2btn").text("loading...");
            $("#step2btn").attr("disabled", "disabled");

            var self = this;

            var username = $("input#inputProviderUserName").val();
            var password = $("input#inputProviderPassword").val();
            var confirmpassword = $("input#inputProviderPassword").val();

            if(username == '' || password == ''){
                $("#step2btn").attr("class", "btn btn-default pull-right disabled");
                $("#step2btn").attr("disabled", "disabled");
                $("#step2btn").text("next");

            }else{

                //validate provider exists
                var exists = Providers.findOne({user_id :  Meteor.userId(), provider_name : "aetna"});

                var providername="aetna", providerusername= $('input#inputProviderUserName').val(),
                    providerpassword= $('input#inputProviderPassword').val();

                console.log(providerusername, providerpassword);


                if(exists != undefined){

                    if(exists.valid_credentials ==  true && exists.provider_user_name == providerusername
                        && exists.provider_password == providerpassword)
                    {
                        this.next();
                    }else{
                        //update
                        Meteor.call("user_update_provider",providername, providerusername, providerpassword);

                        Meteor.call("providers_validate_credentials", function(err, data){
                            debugger;
                            Meteor.call("user_update_provider_set_valid_credentials",providername, data);

                            $("#step2btn").text("Next");

                            if(data){
                                $("#step2btn").attr("class", "btn btn-default pull-right");
                                $("#step2btn").removeAttr("disabled");


                                self.next();
                            }
                            else{

                            }
                        });
                    }


                }else{
                    //insert
                    Meteor.call("user_add_provider",providername, providerusername, providerpassword);

                    Meteor.call("providers_validate_credentials", function(err, data){
                        debugger;
                        Meteor.call("user_update_provider_set_valid_credentials",providername, data);

                        $("#step2btn").text("Next");

                        if(data){
                            $("#step2btn").attr("class", "btn btn-default pull-right");
                            $("#step2btn").removeAttr("disabled");


                            self.next();
                        }
                        else{

                        }
                    });

                }
            }

        }
    },
    {
        id: 'stepThree',
        title: 'Connection',
        template: 'setupStepThree',
        formId: 'setup-step-three-form',
        onSubmit: function(data, mergedData) {
            this.next()
        }
    },
    {
        id: 'stepFour',
        title: 'You are all set!',
        template: 'setupStepFour',
        formId: 'setup-step-four-form',
        onSubmit: function(data, mergedData) {
            debugger;
            $('#providersetup1').hide();
            $('.modal-backdrop').hide();

            Router.go("home");

            this.clearData();
        }
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