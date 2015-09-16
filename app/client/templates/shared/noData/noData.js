/**
 * Created by pdelacruz on 9/14/15.
 */


Template.noData.helpers ({
    "hasProvider" : function(){
        return Providers.find({}).count > 0;
    }
})