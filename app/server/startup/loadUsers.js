

function loadUser(user) {
  var userAlreadyExists = typeof Meteor.users.findOne({ username : user.username }) === 'object';

  if (!userAlreadyExists) {
    Accounts.createUser(user);
  }
}

function InitializeUserProfile(user){
  console.log(user);
  //HB_Profiles.insert({"user_id": })
}

Meteor.startup(function () {

  var farmacydata = { claims : [
  {
    "_id" : "MEAM793rYx6WAYEEJ",
    "user_id" : "26uEAN2DBaJRufBe9",
    "claim_id" : "/memberSecure/featureRouter/claims/pharmDetail?pharnabp=JsGRUyj8DAWIiWgVUN0%3D&ndcCode=&claimId=FeDIqRR%2BBiJkZFRqCK6J5J%2B%2BTMJk&dtfilled=VlgmfpBEscYqamrK6ISn&rxnbr=YwtMmjCqchXtxd8MbIg%3D&refillind=Flhi1IFVk6g%3D&dispnsgstat=&memFname=SANDRA&ptnRelText=Wife&serviceDate=08/05/2015",
    "type" : "Pharmacy",
    "provider" : "aetna",
    "member" : "SANDRA (Wife)",
    "serviced_by" : "WALGREENS 07946RX0412043",
    "prescription_number" : "WALGREENS 07946RX0412043",
    "status" : "\n Completed\n ",
    "drug_name" : "DULOXETINE CAP 30MG",
    "prescription_cost" : 23218,
    "paid_by_plan" : 0
  },
  {
    "_id" : "et9coodayAoLShyFT",
      "user_id" : "26uEAN2DBaJRufBe9",
      "claim_id" : "/memberSecure/featureRouter/claims/pharmDetail?pharnabp=UoUmTRhVOY7i8u8aLkQ%3D&ndcCode=&claimId=QcITpgyqnE1zc%2FEDFSYfdqKmMld7&dtfilled=YhwZNYLPwFyMiJpNEdkB&rxnbr=IwvEzxKINshlRV1JZbg%3D&refillind=ci9nxbf6M%2B0%3D&dispnsgstat=&memFname=SANDRA&ptnRelText=Wife&serviceDate=07/25/2015",
      "type" : "Pharmacy",
      "provider" : "aetna",
      "member" : "SANDRA (Wife)",
      "serviced_by" : "WALGREENS 07946RX0407275",
      "prescription_number" : "WALGREENS 07946RX0407275",
      "status" : "\n Completed\n ",
      "drug_name" : "BUPROPN HCL TAB 300MG XL",
      "prescription_cost" : 2716,
      "paid_by_plan" : 0
  },
  {
    "_id" : "TM3nx5DJvsxPn3Em7",
      "user_id" : "26uEAN2DBaJRufBe9",
      "claim_id" : "/memberSecure/featureRouter/claims/pharmDetail?pharnabp=dvJn9j%2Fru2XU1RDWF%2B4%3D&ndcCode=&claimId=R%2BXsuPZfZj8LCwt76txsDVxcTD6P&dtfilled=YwtMmjCqcgXNxecMdIBU&rxnbr=E5I3SLshqSXD6%2FPlrwE%3D&refillind=E5I3SLshqSU%3D&dispnsgstat=&memFname=SANDRA&ptnRelText=Wife&serviceDate=07/20/2015",
      "type" : "Pharmacy",
      "provider" : "aetna",
      "member" : "SANDRA (Wife)",
      "serviced_by" : "WALGREENS 07946RX0410181",
      "prescription_number" : "WALGREENS 07946RX0410181",
      "status" : "\n Completed\n ",
      "drug_name" : "DULOXETINE CAP 30MG",
      "prescription_cost" : 11647,
      "paid_by_plan" : 0
  },
  {
    "_id" : "Cq6oRZDBtCq8E6SpH",
      "user_id" : "26uEAN2DBaJRufBe9",
      "claim_id" : "/memberSecure/featureRouter/claims/pharmDetail?pharnabp=Mi92b%2FO%2Bu1ZNXQFtce4%3D&ndcCode=&claimId=ZXmze5%2F13RJKSmiLqxeTdxSV91Jq&dtfilled=IZc7t%2Flf3S2kpo64sHUz&rxnbr=E5I3SLshqSXD48v91yk%3D&refillind=dBaYNWBV5Co%3D&dispnsgstat=&memFname=SANDRA&ptnRelText=Wife&serviceDate=06/27/2015",
      "type" : "Pharmacy",
      "provider" : "aetna",
      "member" : "SANDRA (Wife)",
      "serviced_by" : "WALGREENS 07946RX0407274",
      "prescription_number" : "WALGREENS 07946RX0407274",
      "status" : "\n Completed\n ",
      "drug_name" : "VIIBRYD TAB 20MG",
      "prescription_cost" : 20442,
      "paid_by_plan" : 0
  },
  {
    "_id" : "uvpr5WnCDHcZxQ272",
      "user_id" : "26uEAN2DBaJRufBe9",
      "claim_id" : "javascript:showReversedClaimDialog();",
      "type" : "Pharmacy",
      "provider" : "aetna",
      "member" : "SANDRA (Wife)",
      "serviced_by" : "WALGREENS 07946RX0407274",
      "prescription_number" : "WALGREENS 07946RX0407274",
      "status" : "\n Reversed\n ",
      "drug_name" : "VIIBRYD TAB 20MG",
      "prescription_cost" : -20442,
      "paid_by_plan" : 0
  },
  {
    "_id" : "8wAkPWbPhxiQRn6h2",
      "user_id" : "26uEAN2DBaJRufBe9",
      "claim_id" : "/memberSecure/featureRouter/claims/pharmDetail?pharnabp=JsGRUyj8DAWIiWgVUN0%3D&ndcCode=&claimId=JCVukHdCUwrHx%2Ffb7xJONiIidirX&dtfilled=J7DEqQOqJ1DcXH7AxwjE&rxnbr=Fyk3LqoDuLz7%2Fuj39BI%3D&refillind=VLzZvc%2F67lk%3D&dispnsgstat=&memFname=SANDRA&ptnRelText=Wife&serviceDate=06/23/2015",
      "type" : "Pharmacy",
      "provider" : "aetna",
      "member" : "SANDRA (Wife)",
      "serviced_by" : "WALGREENS 07946RX0395755",
      "prescription_number" : "WALGREENS 07946RX0395755",
      "status" : "\n Completed\n ",
      "drug_name" : "ATORVASTATIN TAB 10MG",
      "prescription_cost" : 2525,
      "paid_by_plan" : 0
  },
  {
    "_id" : "4czyxQkuQBhpooDbe",
      "user_id" : "26uEAN2DBaJRufBe9",
      "claim_id" : "/memberSecure/featureRouter/claims/pharmDetail?pharnabp=YhwZNYLPwFCImIZRBd0%3D&ndcCode=&claimId=ci9nxbf6M%2FlYWFjbV%2BJvcPr%2BRulc&dtfilled=Mi92b%2FO%2Bu1pJTR1xYep2&rxnbr=E5I3SLshqSXD48v91yE%3D&refillind=RSwTP0gi2CM%3D&dispnsgstat=&memFname=SANDRA&ptnRelText=Wife&serviceDate=06/23/2015",
      "type" : "Pharmacy",
      "provider" : "aetna",
      "member" : "SANDRA (Wife)",
      "serviced_by" : "WALGREENS 07946RX0407275",
      "prescription_number" : "WALGREENS 07946RX0407275",
      "status" : "\n Completed\n ",
      "drug_name" : "BUPROPN HCL TAB 300MG XL",
      "prescription_cost" : 2716,
      "paid_by_plan" : 0
  },
  {
    "_id" : "3x99j84K6fzYMfjtC",
      "user_id" : "26uEAN2DBaJRufBe9",
      "claim_id" : "/memberSecure/featureRouter/claims/pharmDetail?pharnabp=NUrcIe6EprSvL49X%2F0Q%3D&ndcCode=&claimId=VlgmfpBEsUcqKmvKasYnpUQE5UZq&dtfilled=QcITpgyqnEFzcfkDHyYf&rxnbr=dBaYNWBV5Crbm%2F84yFE%3D&refillind=Mi92b%2FO%2Bu1I%3D&dispnsgstat=&memFname=SANDRA&ptnRelText=Wife&serviceDate=06/15/2015",
      "type" : "Pharmacy",
      "provider" : "aetna",
      "member" : "SANDRA (Wife)",
      "serviced_by" : "WALGREENS 07946RX0406257",
      "prescription_number" : "WALGREENS 07946RX0406257",
      "status" : "\n Completed\n ",
      "drug_name" : "ALPRAZOLAM TAB 0.25MG",
      "prescription_cost" : 123,
      "paid_by_plan" : 0
  },
  {
    "_id" : "qQSyKsQLZr364e4EY",
      "user_id" : "26uEAN2DBaJRufBe9",
      "claim_id" : "/memberSecure/featureRouter/claims/pharmDetail?pharnabp=dvJn9j%2Fru2XUlZGW1%2B4%3D&ndcCode=&claimId=dUrNi6rALq%2Benrod3QVtxqDAZK%2Bf&dtfilled=FLydF97rzIdhcSFvDZu9&rxnbr=Qkm5cVUYxeXP81e7s5Q%3D&refillind=JsGRUyj8DEU%3D&dispnsgstat=&memFname=DAMIAN&ptnRelText=You&serviceDate=06/11/2015",
      "type" : "Pharmacy",
      "provider" : "aetna",
      "member" : "DAMIAN (You)",
      "serviced_by" : "CVS PHARMACY 02310RX0781604",
      "prescription_number" : "CVS PHARMACY 02310RX0781604",
      "status" : "\n Completed\n ",
      "drug_name" : "METHYLPHENID TAB 20MG ER",
      "prescription_cost" : 9959,
      "paid_by_plan" : 0
  },
  {
    "_id" : "MGcuqSznDCB9noXss",
      "user_id" : "26uEAN2DBaJRufBe9",
      "claim_id" : "javascript:showReversedClaimDialog();",
      "type" : "Pharmacy",
      "provider" : "aetna",
      "member" : "SANDRA (Wife)",
      "serviced_by" : "WALGREENS 07946RX0404874",
      "prescription_number" : "WALGREENS 07946RX0404874",
      "status" : "\n Reversed\n ",
      "drug_name" : "VENLAFAXINE CAP 75MG ER",
      "prescription_cost" : -1454,
      "paid_by_plan" : 0
  }

      ]};

var medicaldata  = { claims : [
  {
    "_id" : "tK9js9uLdCEHJdgWz",
      "user_id" : "26uEAN2DBaJRufBe9",
      "claim_id" : "javascript:getClaimDetail(\"IZc7t%2Flf3d9QUoy6aL3z\", \"RpS5Qt0JTWle\", \"VlgmfpBEsUYqKivKqEQ6\", \"Q17s3ud9dxc%3D\", \"EW1\", \"C\", \"N\", \"false\", \"N\", \"SANDRA\", \"false\", \"Wife\", \"MED\", \"Medical\", false, \"EJABN2TM3\");",
      "type" : "Medical",
      "provider" : "aetna",
      "member" : "SANDRA (Wife) \n ",
      "facility" : "QUEST DIAGNOSTICS INCORPORATED\n ",
      "status" : "\n In Progress\n ",
      "claim_amount" : 37029,
      "paid_by_plan" : 3112
  },
  {
    "_id" : "LCJRWPBx4wtGg87fC",
      "user_id" : "26uEAN2DBaJRufBe9",
      "claim_id" : "javascript:getClaimDetail(\"Qkm5cVUYxXTfw%2FqvfoRc\", \"UQ6MmkHnYChM\", \"EoVi5wlEG2SiorKsjmir\", \"FeDIqRR%2BBmw%3D\", \"EW5\", \"C\", \"N\", \"false\", \"N\", \"SANDRA\", \"false\", \"Wife\", \"MED\", \"Medical\", false, \"E8FBMMXSB\");",
      "type" : "Medical",
      "provider" : "aetna",
      "member" : "SANDRA (Wife) \n ",
      "facility" : "BARRY JONES\n ",
      "status" : "\n Completed\n ",
      "claim_amount" : 25100,
      "paid_by_plan" : 0
  },
  {
    "_id" : "S8RnKM6vDBGYiRmCJ",
      "user_id" : "26uEAN2DBaJRufBe9",
      "claim_id" : "javascript:getClaimDetail(\"VlgmfpBEsViy8rOV6pt8\", \"ZCXmxVVgF4cf\", \"NUrcIe6EppSPj8%2F3f2SS\", \"IZc7t%2Flf3cU%3D\", \"EW1\", \"C\", \"N\", \"false\", \"N\", \"SANDRA\", \"false\", \"Wife\", \"MED\", \"Medical\", false, \"EMJLM1VCH\");",
      "type" : "Medical",
      "provider" : "aetna",
      "member" : "SANDRA (Wife) \n ",
      "facility" : "BARRY JONES\n ",
      "status" : "\n Completed\n ",
      "claim_amount" : 25100,
      "paid_by_plan" : 0
  },
  {
    "_id" : "uX7sjs2s5MKpgxgEc",
      "user_id" : "26uEAN2DBaJRufBe9",
      "claim_id" : "javascript:getClaimDetail(\"YhwZNYLPwMUFAYrsGSA1\", \"ZCXmxVVgF4cf\", \"JCVukHdCU0rHx%2Bfb%2F0Lq\", \"czgyagWfgRs%3D\", \"EW2\", \"C\", \"N\", \"false\", \"N\", \"DAMIAN\", \"false\", \"You\", \"MED\", \"Medical\", false, \"E5JLMM270\");",
      "type" : "Medical",
      "provider" : "aetna",
      "member" : "DAMIAN (You) \n ",
      "facility" : "JAMES HOWARD\n ",
      "status" : "\n Not Approved\n ",
      "claim_amount" : 20000,
      "paid_by_plan" : 0
  },
  {
    "_id" : "T3K6Ltgh7zTvzkzuc",
      "user_id" : "26uEAN2DBaJRufBe9",
      "claim_id" : "javascript:getClaimDetail(\"ZXmze5%2F13f6EZAXH5XjT\", \"VLzZvc%2F67ll1\", \"JCVukHdCU0rHx%2BfbT0IZ\", \"RSwTP0gi2O0%3D\", \"EW2\", \"C\", \"N\", \"false\", \"N\", \"WILLIAM\", \"false\", \"Son\", \"MED\", \"Medical\", false, \"E6Y0L00QB\");",
      "type" : "Medical",
      "provider" : "aetna",
      "member" : "WILLIAM (Son) \n ",
      "facility" : "AARTI RAINA\n ",
      "status" : "\n Completed\n ",
      "claim_amount" : 30300,
      "paid_by_plan" : 4695
  },
  {
    "_id" : "xyaYoCmQ4WXQBGRMN",
      "user_id" : "26uEAN2DBaJRufBe9",
      "claim_id" : "javascript:getClaimDetail(\"NvJ2XHuvM0YY2Z%2B%2FtHG3\", \"VLzZvc%2F67ll1\", \"dUrNi6rALi%2Benpp9HQRj\", \"RSwTP0gi2O0%3D\", \"EW5\", \"C\", \"N\", \"false\", \"N\", \"DAMIAN\", \"false\", \"You\", \"MED\", \"Medical\", false, \"EJPBMKFHG\");",
      "type" : "Medical",
      "provider" : "aetna",
      "member" : "DAMIAN (You) \n ",
      "facility" : "QUEST DIAGNOSTICS INCORPORATED\n ",
      "status" : "\n Completed\n ",
      "claim_amount" : 37029,
      "paid_by_plan" : 3112
  },
  {
    "_id" : "NRLE7r7GsZJLk2vc5",
      "user_id" : "26uEAN2DBaJRufBe9",
      "claim_id" : "javascript:getClaimDetail(\"YhwZNYLPwImAnC%2ForN3E\", \"RpS5Qt0JTWle\", \"dBaYNWBV5Cqbm58YyKHf\", \"IZc7t%2Flf3cU%3D\", \"EW3\", \"C\", \"N\", \"false\", \"N\", \"DAMIAN\", \"false\", \"You\", \"MED\", \"Medical\", false, \"E1ABLSKW2\");",
      "type" : "Medical",
      "provider" : "aetna",
      "member" : "DAMIAN (You) \n ",
      "facility" : "TAMMY FINLEY\n ",
      "status" : "\n Completed\n ",
      "claim_amount" : 23900,
      "paid_by_plan" : 9893
  },
  {
    "_id" : "C9Q3YYaRKR3h8jmSY",
      "user_id" : "26uEAN2DBaJRufBe9",
      "claim_id" : "javascript:getClaimDetail(\"JXk7Lr3Xmc%2Fvj%2BIRFreV\", \"U5Jz4qowi8OP\", \"J7DEqQOqJ1Hc3PxAxo38\", \"FeDIqRR%2BBmw%3D\", \"EW4\", \"C\", \"N\", \"false\", \"N\", \"DAMIAN\", \"false\", \"You\", \"MED\", \"Medical\", false, \"EXJLLJVJJ\");",
      "type" : "Medical",
      "provider" : "aetna",
      "member" : "DAMIAN (You) \n ",
      "facility" : "JAMES HOWARD\n ",
      "status" : "\n Completed\n ",
      "claim_amount" : 20000,
      "paid_by_plan" : 0
  },
  {
    "_id" : "RH7i5REfjBXBSTnAM",
      "user_id" : "26uEAN2DBaJRufBe9",
      "claim_id" : "javascript:getClaimDetail(\"Mi92b%2FO%2Bu9vU6Ki8dTPT\", \"VLzZvc%2F67ll1\", \"E5I3SLshqSXj4%2FPl50m0\", \"QcITpgyqnKk%3D\", \"EW5\", \"C\", \"N\", \"false\", \"N\", \"GEORGIA\", \"false\", \"Daughter\", \"MED\", \"Medical\", false, \"ECTWL8R10\");",
      "type" : "Medical",
      "provider" : "aetna",
      "member" : "GEORGIA (Daughter) \n ",
      "facility" : "AARTI RAINA\n ",
      "status" : "\n Completed\n ",
      "claim_amount" : 13000,
      "paid_by_plan" : 0
  },
  {
    "_id" : "vxFqNmTPqqnSMiEzQ",
      "user_id" : "26uEAN2DBaJRufBe9",
      "claim_id" : "javascript:getClaimDetail(\"YZez4tt9mRjOzirvvXtJ\", \"U5Jz4qowi8OP\", \"RpS5Qt0JTSkfH58vv0kk\", \"Flhi1IFVkzU%3D\", \"EW1\", \"C\", \"N\", \"false\", \"N\", \"DAMIAN\", \"false\", \"You\", \"MED\", \"Medical\", false, \"EK35LZNZ5\");",
      "type" : "Medical",
      "provider" : "aetna",
      "member" : "DAMIAN (You) \n ",
      "facility" : "JAMES HOWARD\n ",
      "status" : "\n Completed\n ",
      "claim_amount" : 20000,
      "paid_by_plan" : 0
  }
]
};

  medicaldata.claims.forEach(function (item) {
  //caso medical

    console.log(_.last(item.claim_id.split(',')));
    var newstring  = s.replaceAll(_.last(item.claim_id.split(',')), '"\\);', '');

    newstring = s.replaceAll(newstring, '"', '');

    console.log(newstring);

  });

  farmacydata.claims.forEach(function (item) {
    //caso farmacia
    //console.log(_.last(item.claim_id.split(',')));

    //var claimiditem = item.claim_id.split('&')[2];
    //
    //if(claimiditem != undefined){
    //  console.log(_.last(claimiditem.split('=')))
    //}


  });






  var users = YAML.eval(Assets.getText('users.yml'));

  //console.log(this)

  for (key in users) if (users.hasOwnProperty(key)) {
    loadUser(users[key]);
  }


});