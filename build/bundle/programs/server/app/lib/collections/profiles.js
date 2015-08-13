(function(){HB_Profiles = new Mongo.Collection('hb_profiles');


if (Meteor.isServer) {
  HB_Profiles.allow({
      insert: function (userId, doc) {
        return userId === doc.userId;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return userId === doc.userId;
    }
  });
}

})();
