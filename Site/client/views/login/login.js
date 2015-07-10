Template['login'].helpers({
});

Template['login'].events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();

        console.log('entro', email, password);
        Meteor.loginWithPassword(email, password, function(error){
            if(error){
                console.log(error.reason);
            } else {

                Router.go("home");
            }
        });
    }
});


Template['login'].rendered = function(){
    $('body').addClass('login-alt');
}

Template.login.destroyed = function(){
    $('body').removeClass('login-alt');
}
