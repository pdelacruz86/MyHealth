Template['providers'].helpers({
    hasProvider : function(){


        return false;
    }
});

Template['providers'].events({

});

Template['providers'].rendered = function(){
    //$('#rootwizard').bootstrapWizard({
    //    'tabClass': 'nav nav-tabs',
    //    onTabShow: function(tab, navigation, index) {
    //        var $total = navigation.find('li').length;
    //        var $current = index+1;
    //        var $percent = ($current/$total) * 100;
    //        $('#rootwizard').find('.progress-bar').css({width:$percent+'%'});
    //    },
    //    'onNext': function(tab, navigation, index) {
    //        //var $valid = $("#wizardForm").valid();
    //        //if(!$valid) {
    //        //    $validator.focusInvalid();
    //        //    return false;
    //        //}
    //    },
    //    'onTabClick': function(tab, navigation, index) {
    //        //var $valid = $("#wizardForm").valid();
    //        //if(!$valid) {
    //        //    $validator.focusInvalid();
    //        //    return false;
    //        //}
    //    }
    //});

    Meteor.call("testingclaimsquery", function(err, data){
        if(err){
            console.log('hay error' + err);
        }else{
            console.log('data ' + data);
        }
    });
}

