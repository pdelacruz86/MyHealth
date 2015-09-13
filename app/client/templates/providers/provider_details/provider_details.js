/*****************************************************************************/
/* ProviderDetails: Event Handlers */
/*****************************************************************************/
Template.ProviderDetails.events({
	'click #reload-button': function(evt){
		evt.preventDefault();

		BlockUI.configure({
			spinnerStyle: "background-color:#fff",  //this will change the default color of spinner. You can add more styles of course
			spinnerTemplate: "blockUi"  //this will change default spinner template
		});

		BlockUI.block();

		Meteor.call("provider/reload_user_data","aetna",function(error,result){
			if(error){
				console.log('Eploto el metodo reload_user_data');
			} else {
				BlockUI.unblock();

				Router.go("/");

				Meteor.call("load_claims_rates_no_options",function(error,result){
					if(error){
						console.log('Eploto la carga de el detalle');
					} else {
						console.log('Carga de el detalle iniciada');
					}
				});
			}
		});
	},
	'click #refresh-button': function(evt){
		// https://github.com/channikhabra/meteor-block-ui
		// http://tobiasahlin.com/spinkit/

		evt.preventDefault();

		BlockUI.configure({
			spinnerStyle: "background-color:#fff",  //this will change the default color of spinner. You can add more styles of course
			spinnerTemplate: "blockUi"  //this will change default spinner template
		});

		BlockUI.block();

		Meteor.call("provider/refresh_user_data","aetna",function(error,result){
			if(error){
				console.log('Eploto el metodo refresh_user_data');
			} else {
				BlockUI.unblock();
				Router.go("/");

				Meteor.call("load_claims_rates_no_options",function(error,result){
					if(error){
						console.log('Eploto la carga de el detalle');
					} else {
						console.log('Carga de el detalle iniciada');
					}
				});
			}
		});
	},
	'click #delete-button' : function(evt){
		evt.preventDefault();

		Meteor.call("user_remove_provider");

	}
});

/*****************************************************************************/
/* ProviderDetails: Helpers */
/*****************************************************************************/
Template.ProviderDetails.helpers({
});

/*****************************************************************************/
/* ProviderDetails: Lifecycle Hooks */
/*****************************************************************************/
Template.ProviderDetails.created = function () {
};

Template.ProviderDetails.rendered = function () {
};

Template.ProviderDetails.destroyed = function () {
};
