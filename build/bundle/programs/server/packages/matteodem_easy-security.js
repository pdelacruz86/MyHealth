(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var DDP = Package.ddp.DDP;
var DDPServer = Package.ddp.DDPServer;
var _ = Package.underscore._;
var Random = Package.random.Random;

/* Package-scope variables */
var EasySecurity;

(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/matteodem:easy-security/lib/easy-security.js                                                  //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
EasySecurity = (function () {                                                                             // 1
  'use strict';                                                                                           // 2
                                                                                                          // 3
  var methods = {};                                                                                       // 4
                                                                                                          // 5
  var configuration = {                                                                                   // 6
      general: { type: 'rateLimit', ms: 500 },                                                            // 7
      hooks: {},                                                                                          // 8
      methods: {},                                                                                        // 9
      ignoredMethods: ['login'],                                                                          // 10
      maxQueueLength: 100                                                                                 // 11
  };                                                                                                      // 12
                                                                                                          // 13
  configuration._defaults = _.clone(configuration.general);                                               // 14
                                                                                                          // 15
  var Future = null;                                                                                      // 16
                                                                                                          // 17
  if (Meteor.isServer) {                                                                                  // 18
    Future = Npm.require('fibers/future');                                                                // 19
  } else if (Meteor.isClient) {                                                                           // 20
    // Future Fake                                                                                        // 21
    Future = function () {};                                                                              // 22
    Future.prototype.wait = function () {};                                                               // 23
    Future.prototype.return = function () {};                                                             // 24
  }                                                                                                       // 25
                                                                                                          // 26
  // Easy Security Error Constructor                                                                      // 27
  // This allows to check object for it's inheritance                                                     // 28
  // without having to set any custom properties to check for it                                          // 29
  var EasySecurityError = function (error) {                                                              // 30
    this.error = error;                                                                                   // 31
  };                                                                                                      // 32
                                                                                                          // 33
  /**                                                                                                     // 34
   * Helper Functions                                                                                     // 35
   */                                                                                                     // 36
  function getId(scope, rand) {                                                                           // 37
    if (scope && scope.userId) {                                                                          // 38
      var userId = scope.userId;                                                                          // 39
    }                                                                                                     // 40
                                                                                                          // 41
    if (scope && scope.connection) return scope.connection.id;                                            // 42
    else if (userId) return userId;                                                                       // 43
    else return rand;                                                                                     // 44
  }                                                                                                       // 45
                                                                                                          // 46
  function wrapHooks(name, func) {                                                                        // 47
    var hooks = configuration.hooks[name] || [];                                                          // 48
                                                                                                          // 49
    return function () {                                                                                  // 50
      var funcScope = this, args = Array.prototype.slice.call(arguments),                                 // 51
        returnVal;                                                                                        // 52
                                                                                                          // 53
      var canExecute = _.every(_.map(hooks, function (hook) {                                             // 54
        return hook.apply(funcScope, args);                                                               // 55
      }));                                                                                                // 56
                                                                                                          // 57
      if (!canExecute) {                                                                                  // 58
        throw new Meteor.Error("Hook stopped " + name + " from being executed");                          // 59
      }                                                                                                   // 60
                                                                                                          // 61
      returnVal = func.apply(this, arguments);                                                            // 62
                                                                                                          // 63
      if (returnVal instanceof EasySecurityError) {                                                       // 64
        throw returnVal.error;                                                                            // 65
      }                                                                                                   // 66
                                                                                                          // 67
      return returnVal;                                                                                   // 68
    };                                                                                                    // 69
  }                                                                                                       // 70
                                                                                                          // 71
  /**                                                                                                     // 72
   * RateLimit Method                                                                                     // 73
   */                                                                                                     // 74
  methods.rateLimit = {                                                                                   // 75
    queues: {                                                                                             // 76
      // 'someId' : { functions: [func, func, func, func...], timer: ... }                                // 77
    },                                                                                                    // 78
    callFunctionsInQueue: function (id, funcScope) {                                                      // 79
      var funcs = this.queues[id].functions,                                                              // 80
        func = funcs.shift(),                                                                             // 81
        funcData;                                                                                         // 82
                                                                                                          // 83
      if (funcs.length > configuration.maxQueueLength) {                                                  // 84
        this.queues[id].functions = [];                                                                   // 85
      }                                                                                                   // 86
                                                                                                          // 87
      if (func) {                                                                                         // 88
        funcData = func._esData;                                                                          // 89
                                                                                                          // 90
        // try to get the return value, otherwise catch errors                                            // 91
        try {                                                                                             // 92
          funcData.future.return(func.apply(funcScope, funcData.args));                                   // 93
        } catch (e) {                                                                                     // 94
          funcData.future.return(new EasySecurityError(e));                                               // 95
        }                                                                                                 // 96
                                                                                                          // 97
      } else {                                                                                            // 98
        this.queues[id].timer = null;                                                                     // 99
      }                                                                                                   // 100
    },                                                                                                    // 101
    wrap: function (func, ms, timeout) {                                                                  // 102
      var random = Random.id(),                                                                           // 103
        methodScope = methods.rateLimit;                                                                  // 104
                                                                                                          // 105
      if (!timeout) {                                                                                     // 106
        timeout = Meteor.setTimeout;                                                                      // 107
      }                                                                                                   // 108
                                                                                                          // 109
      function timeoutFunction(func, ms, id) {                                                            // 110
        if (methodScope.queues[id].timer) {                                                               // 111
          timeout(function () {                                                                           // 112
            func();                                                                                       // 113
            timeoutFunction(func, ms, id);                                                                // 114
          }, ms);                                                                                         // 115
        }                                                                                                 // 116
      }                                                                                                   // 117
                                                                                                          // 118
      return function () {                                                                                // 119
        var id = getId(this, random),                                                                     // 120
          future = new Future(),                                                                          // 121
          funcScope = this,                                                                               // 122
          args = arguments;                                                                               // 123
                                                                                                          // 124
        if (!methodScope.queues[id]) {                                                                    // 125
          methodScope.queues[id] = { 'functions' : [] };                                                  // 126
        }                                                                                                 // 127
                                                                                                          // 128
        func._esData = { args: args, future: future };                                                    // 129
        methodScope.queues[id].functions.push(func);                                                      // 130
                                                                                                          // 131
        if (!methodScope.queues[id].timer) {                                                              // 132
          methodScope.queues[id].timer = true;                                                            // 133
          methodScope.callFunctionsInQueue(id, funcScope);                                                // 134
                                                                                                          // 135
          timeoutFunction(function () {                                                                   // 136
            methodScope.callFunctionsInQueue(id, funcScope);                                              // 137
          }, ms, id);                                                                                     // 138
        }                                                                                                 // 139
                                                                                                          // 140
        return future.wait();                                                                             // 141
      };                                                                                                  // 142
    }                                                                                                     // 143
  };                                                                                                      // 144
                                                                                                          // 145
  // inspiration from http://blogorama.nerdworks.in/javascriptfunctionthrottlingan/                       // 146
                                                                                                          // 147
  /**                                                                                                     // 148
   * Throttle Method                                                                                      // 149
   */                                                                                                     // 150
  methods.throttle = {                                                                                    // 151
    queues: {                                                                                             // 152
      // 'someId' : { data: [], previousCall: time }                                                      // 153
    },                                                                                                    // 154
    wrap: function throttle(func, ms, collectData) {                                                      // 155
      var methodScope = methods.throttle,                                                                 // 156
        random = Random.id();                                                                             // 157
                                                                                                          // 158
      return function () {                                                                                // 159
        var id = getId(this, random),                                                                     // 160
          now = new Date().getTime(),                                                                     // 161
          funcScope = this || {};                                                                         // 162
                                                                                                          // 163
        if (!methodScope.queues[id]) {                                                                    // 164
          methodScope.queues[id] = { data: [], previousCall: null };                                      // 165
        }                                                                                                 // 166
                                                                                                          // 167
        if (collectData) {                                                                                // 168
          methodScope.queues[id].data.push(Array.prototype.slice.call(arguments));                        // 169
        }                                                                                                 // 170
                                                                                                          // 171
        if (!methodScope.queues[id].previousCall || (now  - methodScope.queues[id].previousCall) >= ms) { // 172
          var data = methodScope.queues[id].data;                                                         // 173
                                                                                                          // 174
          methodScope.queues[id].previousCall = now;                                                      // 175
          funcScope.collectedData = collectData ? { data: _.clone(data) } : null;                         // 176
          methodScope.queues[id].data = [];                                                               // 177
                                                                                                          // 178
          return func.apply(funcScope, arguments);                                                        // 179
        }                                                                                                 // 180
                                                                                                          // 181
        return null;                                                                                      // 182
      };                                                                                                  // 183
    }                                                                                                     // 184
  };                                                                                                      // 185
                                                                                                          // 186
  /**                                                                                                     // 187
   * Debounce Method                                                                                      // 188
   */                                                                                                     // 189
  var debounce = {                                                                                        // 190
    queues: {                                                                                             // 191
      // 'someId' : { data: [], previousCall: time }                                                      // 192
    },                                                                                                    // 193
    wrap: function (func, ms, collectData) {                                                              // 194
      var methodScope = debounce,                                                                         // 195
        random = Random.id();                                                                             // 196
                                                                                                          // 197
      return function () {                                                                                // 198
        var id = getId(this, random),                                                                     // 199
          funcScope = this || {},                                                                         // 200
          args = arguments;                                                                               // 201
                                                                                                          // 202
        if (!methodScope.queues[id]) {                                                                    // 203
          methodScope.queues[id] = { data: [], timeout: null };                                           // 204
        }                                                                                                 // 205
                                                                                                          // 206
        if (collectData) {                                                                                // 207
          methodScope.queues[id].data.push(Array.prototype.slice.call(args));                             // 208
        }                                                                                                 // 209
                                                                                                          // 210
        if (methodScope.queues[id].timeout) {                                                             // 211
          Meteor.clearTimeout(methodScope.queues[id].timeout);                                            // 212
        }                                                                                                 // 213
                                                                                                          // 214
        methodScope.queues[id].timeout = Meteor.setTimeout(function () {                                  // 215
          var data = methodScope.queues[id].data;                                                         // 216
          funcScope.collectedData = collectData ? _.clone({ data: data }) : null;                         // 217
          methodScope.queues[id].data = [];                                                               // 218
          methodScope.queues[id].timeout = null;                                                          // 219
          func.apply(funcScope, args);                                                                    // 220
        }, ms);                                                                                           // 221
                                                                                                          // 222
        return null;                                                                                      // 223
      };                                                                                                  // 224
    }                                                                                                     // 225
  };                                                                                                      // 226
                                                                                                          // 227
  return {                                                                                                // 228
    debounce: debounce.wrap,                                                                              // 229
    throttle: methods.throttle.wrap,                                                                      // 230
    rateLimit: methods.rateLimit.wrap,                                                                    // 231
    log: function () {                                                                                    // 232
      if (EasySecurity.DEBUG) {                                                                           // 233
        console.log('EasySecurity LOG: ' + Array.prototype.slice.call(arguments).join(', '));             // 234
      }                                                                                                   // 235
    },                                                                                                    // 236
    config: function (newConfig) {                                                                        // 237
      if (!newConfig) {                                                                                   // 238
        return configuration;                                                                             // 239
      }                                                                                                   // 240
                                                                                                          // 241
      configuration.general = _.extend(configuration.general, newConfig.general);                         // 242
      configuration.methods = _.extend(configuration.methods, newConfig.methods);                         // 243
      configuration.ignoredMethods = _.union(configuration.ignoredMethods, newConfig.ignoredMethods);     // 244
      EasySecurity.DEBUG = newConfig.debug;                                                               // 245
    },                                                                                                    // 246
    addHook: function (name, func) {                                                                      // 247
      if (!configuration.hooks[name]) {                                                                   // 248
        configuration.hooks[name] = [];                                                                   // 249
      }                                                                                                   // 250
                                                                                                          // 251
      configuration.hooks[name].push(func);                                                               // 252
    },                                                                                                    // 253
    addHooks: function (names, func) {                                                                    // 254
      var publicScope = this;                                                                             // 255
                                                                                                          // 256
      _.each(names, function (name) {                                                                     // 257
        publicScope.addHook(name, func);                                                                  // 258
      });                                                                                                 // 259
    },                                                                                                    // 260
    getHooks: function (name) {                                                                           // 261
      return configuration.hooks[name] || [];                                                             // 262
    },                                                                                                    // 263
    resetHooks: function (name) {                                                                         // 264
      configuration.hooks[name] = [];                                                                     // 265
    },                                                                                                    // 266
    getMethod: function (name) {                                                                          // 267
      if (!methods[name]) {                                                                               // 268
        throw new Meteor.Error('Method: ' + name + ' does not exist!');                                   // 269
      }                                                                                                   // 270
                                                                                                          // 271
      return methods[name];                                                                               // 272
    },                                                                                                    // 273
    getSecuredFunction: function (name, func) {                                                           // 274
      var conf = configuration.general;                                                                   // 275
                                                                                                          // 276
      if (configuration.methods[name]) {                                                                  // 277
        conf = configuration.methods[name];                                                               // 278
      }                                                                                                   // 279
                                                                                                          // 280
      if (configuration.ignoredMethods.indexOf(name) > -1) {                                              // 281
        return func;                                                                                      // 282
      }                                                                                                   // 283
                                                                                                          // 284
      return wrapHooks(name, this.getMethod(conf.type).wrap(func, conf.ms));                              // 285
    },                                                                                                    // 286
    _getId: getId                                                                                         // 287
  };                                                                                                      // 288
})();                                                                                                     // 289
                                                                                                          // 290
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/matteodem:easy-security/lib/server.js                                                         //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
var connections = {},                                                                                     // 1
  calls = {};                                                                                             // 2
                                                                                                          // 3
var rateLimit = EasySecurity.rateLimit(function () {                                                      // 4
  var funcScope = this, args = Array.prototype.slice.call(arguments);                                     // 5
                                                                                                          // 6
  return _.every(_.map(EasySecurity.getHooks('login'), function (hook) {                                  // 7
    return hook.apply(funcScope, args);                                                                   // 8
  }));                                                                                                    // 9
}, 500);                                                                                                  // 10
                                                                                                          // 11
Meteor.server.onConnection(function (conn) {                                                              // 12
  connections[conn.clientAddress] = conn;                                                                 // 13
});                                                                                                       // 14
                                                                                                          // 15
// Hook into the raw ddp calls being sent                                                                 // 16
Meteor.server.stream_server.server.on('connection', function (socket) {                                   // 17
  if (!calls[socket.remoteAddress]) {                                                                     // 18
    calls[socket.remoteAddress] = [];                                                                     // 19
  }                                                                                                       // 20
                                                                                                          // 21
  EasySecurity.log(socket.remoteAddress + ' connected');                                                  // 22
                                                                                                          // 23
  socket.on('data', function (raw) {                                                                      // 24
    var ipAddr = socket.remoteAddress;                                                                    // 25
                                                                                                          // 26
    calls[ipAddr].push({ time: (new Date()).getTime(), data: raw });                                      // 27
    EasySecurity.log(ipAddr + ' sent '+ raw);                                                             // 28
                                                                                                          // 29
    if (calls[ipAddr].length > 100) {                                                                     // 30
      // More than 100 times data received in the past 5 seconds, close the socket                        // 31
      if ((calls[ipAddr][calls[ipAddr].length - 1].time  - calls[ipAddr][0].time) < 1000 * 5) {           // 32
        EasySecurity.log(ipAddr + ' sent data over 100 times in the past 5 seconds!');                    // 33
        EasySecurity.log('Closing session!');                                                             // 34
        socket.end();                                                                                     // 35
        calls[ipAddr] = [];                                                                               // 36
      } else {                                                                                            // 37
        calls[ipAddr] = [];                                                                               // 38
      }                                                                                                   // 39
    }                                                                                                     // 40
  });                                                                                                     // 41
                                                                                                          // 42
  socket.on('close', function () {                                                                        // 43
    EasySecurity.log(socket.remoteAddress + ' disconnected');                                             // 44
  });                                                                                                     // 45
});                                                                                                       // 46
                                                                                                          // 47
Meteor.startup(function () {                                                                              // 48
  'use strict';                                                                                           // 49
                                                                                                          // 50
  var _methods = Meteor.methods;                                                                          // 51
                                                                                                          // 52
  function wrapMethods(methods) {                                                                         // 53
    var name;                                                                                             // 54
                                                                                                          // 55
    for (name in methods) if (methods.hasOwnProperty(name)) {                                             // 56
      methods[name] = EasySecurity.getSecuredFunction(name, methods[name]);                               // 57
    }                                                                                                     // 58
                                                                                                          // 59
    return methods;                                                                                       // 60
  }                                                                                                       // 61
                                                                                                          // 62
  // Login hooks, needs to be handled with its own hooks                                                  // 63
  if (typeof Accounts !== "undefined") {                                                                  // 64
    Accounts.onLogin(rateLimit);                                                                          // 65
    Accounts.onLoginFailure(rateLimit);                                                                   // 66
  }                                                                                                       // 67
                                                                                                          // 68
  // Rewrite current registered methods and methods function                                              // 69
  Meteor.server.method_handlers = wrapMethods(Meteor.server.method_handlers);                             // 70
                                                                                                          // 71
  Meteor.methods = function (methods) {                                                                   // 72
    return _methods.apply(this, [wrapMethods(methods)]);                                                  // 73
  };                                                                                                      // 74
});                                                                                                       // 75
                                                                                                          // 76
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['matteodem:easy-security'] = {
  EasySecurity: EasySecurity
};

})();

//# sourceMappingURL=matteodem_easy-security.js.map
