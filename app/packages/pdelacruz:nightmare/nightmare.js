/**
 * Created by pdelacruz on 7/17/15.
 */
nightmare =
    Npm.require('nightmare'),
    path = Npm.require('path'); // include
    process.env.PATH += ':' + path.dirname(nightmare.path);