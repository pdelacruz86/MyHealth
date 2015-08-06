Template['providers'].helpers({
    hasProvider : function(){

        var provider = Providers.findOne({user_id :  Meteor.userId(), provider_name : "aetna"})

        if(provider == undefined){
            return false;
        }else
        {
            if(provider.completed_setup){
                return true;
            }else
            {return false;}
        }
    }
});

Template['providers'].events({

});

Template['providers'].rendered = function(){

}

