var Fiber = Npm.require('fibers')

providervalidatecredentials = function  (user_id, providername, callback){
    //set up user and pass by provider name
    var providerdata = Providers.findOne({user_id :  user_id, provider_name: providername});

    var mainurl = process.env["PROVIDERS_URL_AETNA_LOGIN"];

    var x =Xray();

    Meteor.setTimeout(function(){
        var options = new nightmare()
            .goto(mainurl)
            .type('input#userNameValue', providerdata.provider_user_name)
            .type('input#passwordValue', providerdata.provider_password)
            .click('#secureLoginBtn')
            .wait()
            .wait()
            .wait()
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

                                callback(null, {pagetitle: str});
                            })
                        }
            })

            .run();

    },5000)
}
var LoadClaimsData =  Meteor.wrapAsync(providervalidatecredentials);


Meteor.methods({

    providers_validate_credentials:  function(){
        console.log('--------------------------------EMPEZO LOGIN ------------------------------------');
        var myuser_id = this.userId;

        var result = false;

        var data = LoadClaimsData(myuser_id, "aetna");

        if(data.pagetitle === 'Home' || data.pagetitle === 'Choose Your View'){
            result = true;
            console.log('esta logeado pagina :' + data.pagetitle)
        }
        else{
            console.log('error en nombre de usuario o password. buscando en pagina  :' + data.pagetitle)
        }

        return result;

        //var handlerequest = function(user_id, provider){
        //
        //LoadClaimsData(myuser_id, "aetna", function(err, data){
        //
        //        if(err){
        //            console.log('HAY ERRORRRRRRRRRRRRRRRRRR' + err.error );
        //        }else{
        //            console.log(data.pagetitle);
        //            if(data.pagetitle === 'Home' || data.pagetitle === 'Choose Your View'){
        //                result = true;
        //                console.log('esta logeado pagina :' + data.pagetitle)
        //            }
        //            else{
        //                console.log('error en nombre de usuario o password. buscando en pagina  :' + data.pagetitle)
        //            }
        //        }
        //    });

        //}
        //
        // Fiber(
        //    function(){
        //         console.log('resultado evento : ' + handlerequest(myuser_id, "aetna"));
        //    }
        //).run();
    }
});

Meteor.startup(function () {
    //loadProviderData();
});