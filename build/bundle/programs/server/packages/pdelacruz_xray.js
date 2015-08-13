(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

/* Package-scope variables */
var Xray;

(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/pdelacruz:xray/xray.js                                   //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
/**                                                                  // 1
 * Created by pdelacruz on 7/17/15.                                  // 2
 */                                                                  // 3
                                                                     // 4
Xray = Npm.require('x-ray');                                         // 5
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['pdelacruz:xray'] = {
  Xray: Xray
};

})();

//# sourceMappingURL=pdelacruz_xray.js.map
