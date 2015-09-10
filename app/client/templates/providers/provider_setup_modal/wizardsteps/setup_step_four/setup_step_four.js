/*****************************************************************************/
/* SetupStepFour: Event Handlers */
/*****************************************************************************/
Template.setupStepFour.events({

});

/*****************************************************************************/
/* SetupStepFour: Helpers */
/*****************************************************************************/
Template.setupStepFour.helpers({
});

/*****************************************************************************/
/* SetupStepFour: Lifecycle Hooks */
/*****************************************************************************/
Template.setupStepFour.created = function () {
};

Template.setupStepFour.rendered = function () {
	$(".progress-bar-primary").attr("style", "width : 100%");

	//if(!$("#providersetup").is(':visible'))
		//{
		//	Meteor.call("user_update_provider_set_completed_setup", "aetna", true);
		//}
};

Template.setupStepFour.destroyed = function () {
};
