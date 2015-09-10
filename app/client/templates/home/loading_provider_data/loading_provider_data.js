/*****************************************************************************/
/* LoadingProviderData: Event Handlers */
/*****************************************************************************/
Template.LoadingProviderData.events({
});

/*****************************************************************************/
/* LoadingProviderData: Helpers */
/*****************************************************************************/
Template.LoadingProviderData.helpers({
});

/*****************************************************************************/
/* LoadingProviderData: Lifecycle Hooks */
/*****************************************************************************/
Template.LoadingProviderData.created = function () {
};

Template.LoadingProviderData.rendered = function () {

    var progres1 = NProgress;
    progres1.configure({ showSpinner: true });

    progres1.settings.parent = ".loadingtarget";

    progres1.start();

    //var progres2 = NProgress;
    //progres2.configure({ showSpinner: false });
    //
    //progres2.settings.parent = "div#dvClaims";
    //
    //progres2.start();
};

Template.LoadingProviderData.destroyed = function () {
};
