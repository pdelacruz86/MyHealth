Template['register'].helpers({
});

Template['register'].events({
    'submit form' : function(){
        //codigo para registrar

        event.preventDefault();
        var firstname = $('[name=firstname]').val();
        var lastname = $('[name=lastname]').val();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
console.log('entro', firstname, lastname, email, password);
        Accounts.createUser({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
        }, function(error){
            if(error){
                console.log(error.reason); // Output error if registration fails
            } else {
                Router.go("home"); // Redirect user if registration succeeds
            }
        });
    }
});


Template['register'].rendered = function(){
    $('body').addClass('login-alt');
}

Template.register.destroyed = function(){
    $('body').removeClass('login-alt');
}