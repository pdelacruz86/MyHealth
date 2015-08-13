(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

/* Package-scope variables */
var nightmare, path;

(function () {

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
// packages/pdelacruz:nightmare/nightmare.js                                 //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////
                                                                             //
/**                                                                          // 1
 * Created by pdelacruz on 7/17/15.                                          // 2
 */                                                                          // 3
                                                                             // 4
nightmare = Npm.require('nightmare'), path = Npm.require('path'); // include // 5
process.env.PATH += ':' + path.dirname(nightmare.path);                      // 6
///////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['pdelacruz:nightmare'] = {
  nightmare: nightmare
};

})();

//# sourceMappingURL=pdelacruz_nightmare.js.map
