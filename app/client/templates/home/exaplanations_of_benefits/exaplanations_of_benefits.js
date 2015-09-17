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

        //if(member.count ==1){
        //
        //}else {
        //    var value = _.find(member.plan_details, function (item) {
        //        return s.clean(item.plan_features) == s.clean(" In Network Annual Deductible Includes Pharmacy   ");
        //    });
            if(member == undefined){
                return "";
            }else{
                return s.numberFormat((member.deductible / 100), 2, ".", ",");
            }
        //}
        //Members.find()
    },
    EOBFamilyValue : function(){
        var familymember =  Members.findOne({ member_name :  "Family" });

        //var value = _.find(familymember.plan_details, function(item){
        //    return s.clean(item.plan_features) == s.clean(" In Network Annual Deductible Includes Pharmacy   ");
        //});

        if(familymember == undefined){
            return "";
        }else{
            return s.numberFormat((member.deductible / 100), 2, ".", ",");
        }
    },
    deductibleBreakdownMainList: function(){
        var member_id = '';//Template.home.__helpers.get("selectedMember")();

        if(Session.get("selectedMember") != null){
            member_id = Session.get("selectedMember");
        }
        else{
            //family data
            var familyitem =  Members.findOne({ member_name :  "Family" });

            if(familyitem == undefined){
                familyitem =  Members.findOne({})
            }

            member_id = familyitem._id;
        }

        //var familymember =  Members.findOne({ _id :  $('.selectedmember').val() });
        var familymember =  Members.findOne({ _id :  member_id });
        //console.log(familymember)
        var newlist= [];

        _.each(familymember.plan_details, function(item){
            item.limit = s.numberFormat((item.limit / 100),2, ".", ",");
            item.applied = s.numberFormat((item.applied / 100),2, ".", ",");
            item.remainder = s.numberFormat((item.remainder / 100),2, ".", ",");

            if(s.clean(item.plan_header) ==  "Plan Features"){
                newlist.push(item);
            }
        });

        return newlist;
    },
    deductibleBreakdownSecondList: function(){
        var member_id = '';//Template.home.__helpers.get("selectedMember")();

        if(Session.get("selectedMember") != null){
            member_id = Session.get("selectedMember");
        }
        else{
            //family data
            var familyitem =  Members.findOne({ member_name :  "Family" });

            if(familyitem == undefined){
                familyitem =  Members.findOne({})
            }

            member_id = familyitem._id;
        }

        var familymember =  Members.findOne({ _id :  member_id });

        var newlist= [];

        _.each(familymember.plan_details, function(item){
            item.limit = (item.limit / 100).toFixed(2);
            item.applied = (item.applied / 100).toFixed(2);
            item.remainder = (item.remainder / 100).toFixed(2);

            if(s.clean(item.plan_header) !=  "Plan Features"){
                newlist.push(item);
            }
        });

        return newlist;
    },
    showSecondList : function(){
        var member_id = '';//Template.home.__helpers.get("selectedMember")();

        if(Session.get("selectedMember") != null){
            member_id = Session.get("selectedMember");
        }
        else{
            //family data
            var familyitem =  Members.findOne({ member_name :  "Family" });

            if(familyitem == undefined){
                familyitem =  Members.findOne({})
            }

            member_id = familyitem._id;
        }

        var familymember =  Members.findOne({ _id :  member_id });

        var newlist= [];

        _.each(familymember.plan_details, function(item){
            item.limit = (item.limit / 100).toFixed(2);
            item.applied = (item.applied / 100).toFixed(2);
            item.remainder = (item.remainder / 100).toFixed(2);

            if(s.clean(item.plan_header) !=  "Plan Features"){
                newlist.push(item);
            }
        });

        return newlist.length > 0;
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
