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

    $("#step3btn").attr("class", "btn btn-success btn-lg pull-right disabled");
    $("#step3btn").text("loading...");
    $("#step3btn").attr("disabled", "disabled");


    //for (var i = 0; i < 100; i++) {
    //    var sessionvalue = i.toString();
    //    console.log(i.toString())
    //    Meteor.call("get_progress", sessionvalue, function(err, data){
    //        Session.set('progressvalue', data);
    //
    //    })
    //}

    NProgress.start();

    Meteor.call("Update_user_Claims", 3, "aetna", function(err, data) {
        console.log('callback')

        NProgress.done();

        if (err) {

        } else {
            $("#step3btn").attr("class", "btn btn-success btn-lg pull-right");
            $("#step3btn").text("Next");
            $("#step3btn").removeAttr("disabled");

            $("#step3btn").click();
        }

    });
};

Template.setupStepThree.destroyed = function () {
};
