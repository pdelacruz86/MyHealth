var Fiber = Npm.require('fibers')
var Future = Npm.require("fibers/future");

var x =Xray();

var login = function(username, password, logintype){
    return function(nightmare) {
        nightmare
            .viewport(800, 1600)
            .goto("https://member.aetna.com/appConfig/login/login.fcc?TYPE=33554433&REALMOID=06-36d8cb4d-4ac1-44c7-b12d-a80fba4b718e&GUID=&SMAUTHREASON=0&METHOD=GET&SMAGENTNAME=-SM-jRs63Nsa3LlO0w8DBRJePrGDb%2fSrW4lCcEp3BCF2N5CYudNJWAZ6IAjtTBQZYxKV&TARGET=-SM-HTTPS%3a%2f%2fmember.aetna.com%2fMbrLanding%2fRoutingServlet%3fcreateSession%3dtrue")
            .type('input#userNameValue', username)
            .type('input#passwordValue', password)
            .click('#secureLoginBtn')
            .wait();

        if(logintype == "options"){
            nightmare
                .check("#planSponsorIndex")
                .wait()
                .click("#go-button label")
                .wait()
        }
    };
};

Meteor.methods({
    providers_validate_credentials:  function(){
        console.log('--------------------------------LOGIN STARTED------------------------------------');
        var myuser_id = this.userId;
        var providerdata = Providers.findOne({user_id :  myuser_id, provider_name: "aetna"});

        var future = new Future();

        var data = {};
        new nightmare()
            .use(login(providerdata.provider_user_name, providerdata.provider_password, providerdata.login_type))
            .url(function(url){
                //future.return({status : "Done"});
                console.log(url)
            })
            .evaluate(function () {
                return {
                    table: document.querySelector('html').outerHTML
                };
            },function (value) {

                var html =  value.table;
                if(value == null){
                    //problema
                    console.log('problema al logearse');
                    callback({error : 'error seleccionando selector, html no disponible'}, null);

                }else{
                    x(html, 'title')
                    (function(err, data){
                        console.log('data desde funcion ' + data)
                        var str = data.replace(/^\s+|\s+$/g,'');


                        if(str == ""){
                            x(html, "#pageTitle")(function(err, data){
                                str = data.replace(/^\s+|\s+$/g,'');

                                future.return({pagetitle: str});
                            })
                        }else{
                            future.return({pagetitle: str});
                        }
                    })
                }
            })
            .run();

        var result =  future.wait();

        console.log(result);
        var valid = false;
        if(s.clean(result.pagetitle) === s.clean('Home') || s.clean(result.pagetitle) === s.clean('Choose Your View')){
            valid = true;
            console.log("esta es la pagina : " + result.pagetitle)
            //if(s.clean(result.pagetitle) === s.clean('Home')){
            //    console.log('updating nooptions')
            //    Meteor.call("user_update_provider_set_login_type", myuser_id, "aetna", "nooptions");
            //}else{
            //    console.log('updating options')
            //
            //    Meteor.call("user_update_provider_set_login_type", myuser_id, "aetna", "options");
            //}

            //console.log('esta logeado pagina :' + data.pagetitle)
        }
        else{
            console.log('error en nombre de usuario o password. buscando en pagina  :' + data.pagetitle)
        }

        return valid;
    }
});

Meteor.startup(function () {
    //loadProviderData();
});