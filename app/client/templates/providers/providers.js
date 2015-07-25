Template['providers'].helpers({
    hasProvider : function(){
        return Providers.find({}).fetch() > 0 ;
    }
});

Template['providers'].events({
});
