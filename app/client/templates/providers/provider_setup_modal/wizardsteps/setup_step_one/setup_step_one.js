/*****************************************************************************/
/* SetupStepOne: Event Handlers */
/*****************************************************************************/
Template.setupStepOne.events({
});

/*****************************************************************************/
/* SetupStepOne: Helpers */
/*****************************************************************************/
Template.setupStepOne.helpers({
});

/*****************************************************************************/
/* SetupStepOne: Lifecycle Hooks */
/*****************************************************************************/
Template.setupStepOne.created = function () {
};

Template.setupStepOne.rendered = function () {
    $(".progress-bar-primary").attr("style", "width : 25%");
};

Template.setupStepOne.destroyed = function () {
};
