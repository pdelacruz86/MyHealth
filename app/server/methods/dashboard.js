/**
 * Created by pdelacruz on 8/28/15.
 */
var Fiber = Npm.require('fibers')
var Future = Npm.require("fibers/future");

Meteor.methods({
    "dashboard/get_claim_chart_data" : function(membername){
        var startdate = moment().startOf('year')._d;
        var enddate = moment()._d;

        if(membername== "Family"){
            var data = Claims.aggregate([
                { $match : {
                    user_id : this.userId,
                    provider_rate : { $ne : NaN },
                    status : "Completed",
                    date_of_service: {
                        $gte: new Date(startdate),
                        $lt: new Date(enddate)
                        }
                    }
                },
                {
                    $group : {
                        _id : { type: { type: "$type" }},
                        totalClaimRate:  { $sum:  { $divide : ["$provider_rate", 100] }},
                        count: { $sum: 1 }
                    }
                }
            ]);

            console.log(data);

            return data;

        }else{
            var data = Claims.aggregate([
                { $match : {
                    user_id : this.userId,
                    provider_rate : { $ne : NaN },
                    status : "Completed",
                    member : membername,
                    date_of_service: {
                        $gte: new Date(startdate),
                        $lt: new Date(enddate)
                        }
                    }
                },
                {
                    $group : {
                        _id : { type: { type: "$type" }},
                        totalClaimRate:  { $sum:  { $divide : ["$provider_rate", 100] }},
                        count: { $sum: 1 }
                    }
                }
            ]);

            return data;

        }

    },
    "dashboard/get_current_expenditures_chart_data" : function(){
        var startdate = moment().startOf('year')._d;
        var enddate = moment()._d;

        var data = Claims.aggregate([
            {
                $match: {
                    user_id: this.userId,
                    provider_rate: {$ne: NaN},
                    status: "Completed",
                    date_of_service: {
                        $gte: new Date(startdate),
                        $lt: new Date(enddate)
                    }
                }
            },
            {
                $group : {
                    _id : { member : { member : "$member"}},
                    totalClaimRate:  { $sum:  { $divide : ["$provider_rate", 100] }},
                    count: { $sum: 1 }
                }
            }
        ]);
console.log(data);
        return data;
    },
    "dashboard/update_profile_setup_plan_performance_data" : function(planperformance){
        HB_Profiles.update({ user_id : this.userId}, {$set : { plan_performance_data : planperformance }});
    }
})
