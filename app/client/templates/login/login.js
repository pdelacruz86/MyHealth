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
        },
        'click #createAccount' : function(){
            event.preventDefault();
            Router.go("register");
        },
        'click .btn-google': function() {
            return Meteor.loginWithGoogle({
                requestPermissions: ['email']
            }, function (error) {
                if (error) {
                    return console.log(error.reason);
                }
                else{
                    console.log('entro')
                    console.log(Meteor.userId());

                    var userid = Meteor.userId();

                    Meteor.call("create_profile", userid, function(error, user_id) {
                        //Session.set("user_id", user_id);
                    });

                    Meteor.call("InitializeUserProfile");
                    //validate profile exists

                    //var profile = HB_Profiles.find({"user_id" : Meteor.userId()});

                    //console.log(profile);

                    //HB_Profiles.insert({ "user_id": '"' + Meteor.userId() +'"', "claims" : [] });

                    Router.go("home");
                }
            });
        },
        'click .btn-twitter': function() {
            return Meteor.loginWithTwitter(function(error){
                if (error) {
                    return console.log(error.reason);
                }
                else{
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
