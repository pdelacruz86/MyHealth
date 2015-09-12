/*****************************************************************************/
/* ProviderDetails: Event Handlers */
/*****************************************************************************/
Template.ProviderDetails.events({
	'click #reload-button': function(){
		console.log('Entro');
		event.preventDefault();
		Meteor.call("provider/reload_user_data","aetna",function(error,result){
			if(error){
				console.log('Eploto el metodo reload_user_data');
			} else {
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
