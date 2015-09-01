/*****************************************************************************/
/* ExaplanationsOfBenefits: Event Handlers */
/*****************************************************************************/
Template.ExaplanationsOfBenefits.events({
});

/*****************************************************************************/
/* ExaplanationsOfBenefits: Helpers */
/*****************************************************************************/
Template.ExaplanationsOfBenefits.helpers({
    EOBDeductible : function(){
        var member =  Members.findOne({ member_name : { $ne : "Family"} });

        var value = _.find(member.plan_details, function(item){
            return s.clean(item.plan_features) == s.clean(" In Network Annual Deductible Includes Pharmacy   ");
        });

        return (value.limit / 100).toFixed(2);
        //Members.find()
    },
    EOBFamilyValue : function(){
        var familymember =  Members.findOne({ member_name :  "Family" });

        var value = _.find(familymember.plan_details, function(item){
            return s.clean(item.plan_features) == s.clean(" In Network Annual Deductible Includes Pharmacy   ");
        });

        return (value.limit / 100).toFixed(2);
    },
    deductibleBreakdownList: function(){
        //family data
        var familyitem =  Members.findOne({ member_name :  "Family" });

        //var familymember =  Members.findOne({ _id :  $('.selectedmember').val() });
        var familymember =  Members.findOne({ _id :  familyitem._id });

        _.each(familymember.plan_details, function(item){
            item.limit = (item.limit / 100).toFixed(2);
            item.applied = (item.applied / 100).toFixed(2);
            item.remainder = (item.remainder / 100).toFixed(2);
        })
        return familymember.plan_details;
    },
    planfeatures : function(){

    }
});

/*****************************************************************************/
/* ExaplanationsOfBenefits: Lifecycle Hooks */
/*****************************************************************************/
Template.ExaplanationsOfBenefits.created = function () {
};

Template.ExaplanationsOfBenefits.rendered = function () {

};

Template.ExaplanationsOfBenefits.destroyed = function () {
};
