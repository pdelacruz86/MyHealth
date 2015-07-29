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