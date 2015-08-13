(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var _ = Package.underscore._;
var Router = Package['iron:router'].Router;
var RouteController = Package['iron:router'].RouteController;
var Iron = Package['iron:core'].Iron;

/* Package-scope variables */
var Preloader, PreloadController;

(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/miro:preloader/lib/server_route_controller.js            //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
// v1.2.3                                                            // 1
                                                                     // 2
Preloader = {                                                        // 3
	// Dummy placeholder until we put something smart here              // 4
};                                                                   // 5
                                                                     // 6
if ( typeof PreloadController === 'undefined' ) {                    // 7
	PreloadController = RouteController.extend({                        // 8
		// Dummy placeholder until we put something smart here             // 9
	});                                                                 // 10
}                                                                    // 11
                                                                     // 12
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['miro:preloader'] = {
  Preloader: Preloader,
  PreloadController: PreloadController
};

})();

//# sourceMappingURL=miro_preloader.js.map
