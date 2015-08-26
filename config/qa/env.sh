# This .sh file will be sourced before starting your application.
# You can use it to put environment variables you want accessible
# to the server side of your app by using process.env.MY_VAR
#
# Example:
# export MONGO_URL="mongodb://localhost:27017/myapp-development"
# export ROOT_URL="http://localhost:3000"

export SAMPLE_VARIABLE="somevalue"
export PROVIDERS_URL_AETNA_LOGIN="https://member.aetna.com/appConfig/login/login.fcc?TYPE=33554433&REALMOID=06-36d8cb4d-4ac1-44c7-b12d-a80fba4b718e&GUID=&SMAUTHREASON=0&METHOD=GET&SMAGENTNAME=-SM-jRs63Nsa3LlO0w8DBRJePrGDb%2fSrW4lCcEp3BCF2N5CYudNJWAZ6IAjtTBQZYxKV&TARGET=-SM-HTTPS%3a%2f%2fmember.aetna.com%2fMbrLanding%2fRoutingServlet%3fcreateSession%3dtrue"
export PROVIDERS_URL_AETNA_LOGIN_2="https://member.aetna.com/memberSecure/featureRouter/selectPlanSponsor"
export PROVIDERS_URL_AETNA_MEDICAL="https://member.aetna.com/memberSecure/featureRouter/claims/medical?cmidx=All&product=MED&fromDate=2008-01-01&claimFromHome=true"
export PROVIDERS_URL_AETNA_PHARMACY="https://member.aetna.com/memberSecure/featureRouter/claims/medical?cmidx=All&product=PHARMACY&ajaxCall=true&fromDate=2008-01-01"
export PROVIDERS_URL_AETNA_DENTAL="https://member.aetna.com/memberSecure/featureRouter/claims/medical?cmidx=All&product=DEN&ajaxCall=true&fromDate=2008-01-01"

export PROVIDERS_URL_MEDICAL_PLAN_DETAILS = "https://member.aetna.com/memberSecure/featureRouter/balances?product=medical&typecode=M"


export EXT_SERVICE_GOOGLE_CLIENT_ID="1056827996847-kbmu0l5an7giujngci9v6q3c12p266a9.apps.googleusercontent.com";
export EXT_SERVICE_GOOGLE_SECRET="-i8lQ9gQDPsRQjvPSbcYHtxY"

export EXT_SERVICE_TWITTER_CLIENT_ID="YlS2oHOyYP0dpX5h8AgPqT2Di";
export EXT_SERVICE_TWITTER_SECRET="v5N88Vm2P6fJGYAQqlO1uinVp3KK21oymTpOfZy8gnET2J8Zs6"