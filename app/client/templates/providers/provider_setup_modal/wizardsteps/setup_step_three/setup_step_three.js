/*****************************************************************************/
/* SetupStepThree: Event Handlers */
/*****************************************************************************/
Template.setupStepThree.events({
});

/*****************************************************************************/
/* SetupStepThree: Helpers */
/*****************************************************************************/
Template.setupStepThree.helpers({
});

/*****************************************************************************/
/* SetupStepThree: Lifecycle Hooks */
/*****************************************************************************/
Template.setupStepThree.created = function () {

};

Template.setupStepThree.rendered = function () {
    $(".progress-bar-primary").attr("style", "width : 75%");

    $("#step3btn").attr("class", "btn btn-default pull-right disabled");
    $("#step3btn").text("Please wait...");
    $("#step3btn").attr("disabled", "disabled");

    NProgress.configure({ showSpinner: false });
    
    NProgress.settings.parent = ".loadingtarget";

    NProgress.start();

    var provider = Providers.findOne({user_id :  Meteor.userId(), provider_name : "aetna"});
    console.log('tiene que entrar con ' + provider.login_type);

    Meteor.call("Update_user_Claims", "aetna", function(err, data) {
        console.log('callback');

        NProgress.done();

        if (err) {

        } else {
            Meteor.call("load_claims_rates_no_options");

            $("#step3btn").attr("class", "btn btn-default pull-right");
            $("#step3btn").text("Next");
            $("#step3btn").removeAttr("disabled");

            $("#step3btn").click();
        }

    });

};

Template.setupStepThree.destroyed = function () {
};
