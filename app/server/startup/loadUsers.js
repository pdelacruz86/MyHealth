

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

  var users = YAML.eval(Assets.getText('users.yml'));

  //console.log(this)

  for (key in users) if (users.hasOwnProperty(key)) {
    loadUser(users[key]);
  }


  /* 1 */
 var plan_summary = [ {
    "_id" : "7iKBAZaP9aTE4SFMu",
      "user_id" : "ajHRhHWaJ488wHbqn",
      "member_name" : "Family",
      "plan_details" : [
    {
      "plan_features" : "\n In Network Annual Deductible Includes Pharmacy \n \n ",
      "limit" : "\n $ 11,500.00\n ",
      "applied" : "\n $ 242.53\n Activity Details\n \n \n ",
      "remainder" : "\n $ 11,257.47\n "
    },
    {
      "plan_features" : "\n Out of Network Annual Deductible Includes Pharmacy \n \n ",
      "limit" : "\n $ 23,000.00\n ",
      "applied" : "\n $ 0.00\n \n \n ",
      "remainder" : "\n $ 23,000.00\n "
    },
    {
      "plan_features" : "\n In Network Annual Coinsurance (Includes Deductible and Pharmacy)\n \n ",
      "limit" : "\n $ 13,200.00\n ",
      "applied" : "\n $ 455.62\n Activity Details\n \n \n ",
      "remainder" : "\n $ 12,744.38\n "
    }
  ]
  },

  /* 2 */
  {
    "_id" : "N9uCLeDbuqrgkYRg5",
      "user_id" : "ajHRhHWaJ488wHbqn",
      "member_name" : "ABRAHAM (Husband)",
      "plan_details" : [
    {
      "plan_features" : "\n In Network Annual Deductible Includes Pharmacy \n \n ",
      "limit" : "\n $ 5,750.00\n ",
      "applied" : "\n $ 0.00\n \n \n ",
      "remainder" : "\n $ 5,750.00\n "
    },
    {
      "plan_features" : "\n Out of Network Annual Deductible Includes Pharmacy \n \n ",
      "limit" : "\n $ 11,500.00\n ",
      "applied" : "\n $ 0.00\n \n \n ",
      "remainder" : "\n $ 11,500.00\n "
    },
    {
      "plan_features" : "\n In Network Annual Coinsurance (Includes Deductible and Pharmacy)\n \n ",
      "limit" : "\n $ 6,600.00\n ",
      "applied" : "\n $ 50.51\n Activity Details \n \n \n ",
      "remainder" : "\n $ 6,549.49\n "
    },
    {
      "plan_features" : "\n  Annual Routine Eye Exam Visit Maximum\n \n ",
      "limit" : "\n 1\n ",
      "applied" : "\n 0\n \n \n ",
      "remainder" : "\n 1\n "
    },
    {
      "plan_features" : "\n  Annual Inpatient Skilled Nursing Facility Days\n \n ",
      "limit" : "\n 60\n ",
      "applied" : "\n 0\n \n \n ",
      "remainder" : "\n 60\n "
    },
    {
      "plan_features" : "\n  Annual Home Health Care Visits\n \n ",
      "limit" : "\n 60\n ",
      "applied" : "\n 0\n \n \n ",
      "remainder" : "\n 60\n "
    },
    {
      "plan_features" : "\n  Annual Physical and Occupational Therapy Visits\n \n ",
      "limit" : "\n 20\n ",
      "applied" : "\n 0\n \n \n ",
      "remainder" : "\n 20\n "
    },
    {
      "plan_features" : "\n  Annual Speech Therapy Visits\n \n ",
      "limit" : "\n 20\n ",
      "applied" : "\n 0\n \n \n ",
      "remainder" : "\n 20\n "
    },
    {
      "plan_features" : "\n  Annual Spinal Manipulation Therapy Visits\n \n ",
      "limit" : "\n 20\n ",
      "applied" : "\n 0\n \n \n ",
      "remainder" : "\n 20\n "
    }
  ]
  },

  /* 3 */
  {
    "_id" : "nRzqAuvPvoo3Rdraz",
      "user_id" : "ajHRhHWaJ488wHbqn",
      "member_name" : "ANNABEL (Daughter)",
      "plan_details" : [
    {
      "plan_features" : "\n In Network Annual Deductible Includes Pharmacy \n \n ",
      "limit" : "\n $ 5,750.00\n ",
      "applied" : "\n $ 242.53\n Activity Details \n \n \n ",
      "remainder" : "\n $ 5,507.47\n "
    },
    {
      "plan_features" : "\n Out of Network Annual Deductible Includes Pharmacy \n \n ",
      "limit" : "\n $ 11,500.00\n ",
      "applied" : "\n $ 0.00\n \n \n ",
      "remainder" : "\n $ 11,500.00\n "
    },
    {
      "plan_features" : "\n In Network Annual Coinsurance (Includes Deductible and Pharmacy)\n \n ",
      "limit" : "\n $ 6,600.00\n ",
      "applied" : "\n $ 278.61\n Activity Details \n \n \n ",
      "remainder" : "\n $ 6,321.39\n "
    },
    {
      "plan_features" : "\n  Annual Routine Eye Exam Visit Maximum\n \n ",
      "limit" : "\n 1\n ",
      "applied" : "\n 0\n \n \n ",
      "remainder" : "\n 1\n "
    },
    {
      "plan_features" : "\n  Annual Inpatient Skilled Nursing Facility Days\n \n ",
      "limit" : "\n 60\n ",
      "applied" : "\n 0\n \n \n ",
      "remainder" : "\n 60\n "
    },
    {
      "plan_features" : "\n  Annual Home Health Care Visits\n \n ",
      "limit" : "\n 60\n ",
      "applied" : "\n 0\n \n \n ",
      "remainder" : "\n 60\n "
    },
    {
      "plan_features" : "\n  Annual Physical and Occupational Therapy Visits\n \n ",
      "limit" : "\n 20\n ",
      "applied" : "\n 0\n \n \n ",
      "remainder" : "\n 20\n "
    },
    {
      "plan_features" : "\n  Annual Speech Therapy Visits\n \n ",
      "limit" : "\n 20\n ",
      "applied" : "\n 0\n \n \n ",
      "remainder" : "\n 20\n "
    },
    {
      "plan_features" : "\n  Annual Spinal Manipulation Therapy Visits\n \n ",
      "limit" : "\n 20\n ",
      "applied" : "\n 0\n \n \n ",
      "remainder" : "\n 20\n "
    }
  ]
  },

  /* 4 */
  {
    "_id" : "wbEpD5DmG6pgxwM8p",
      "user_id" : "ajHRhHWaJ488wHbqn",
      "member_name" : "THOMAS (Son)",
      "plan_details" : [
    {
      "plan_features" : "\n In Network Annual Deductible Includes Pharmacy \n \n ",
      "limit" : "\n $ 5,750.00\n ",
      "applied" : "\n $ 0.00\n \n \n ",
      "remainder" : "\n $ 5,750.00\n "
    },
    {
      "plan_features" : "\n Out of Network Annual Deductible Includes Pharmacy \n \n ",
      "limit" : "\n $ 11,500.00\n ",
      "applied" : "\n $ 0.00\n \n \n ",
      "remainder" : "\n $ 11,500.00\n "
    },
    {
      "plan_features" : "\n In Network Annual Coinsurance (Includes Deductible and Pharmacy)\n \n ",
      "limit" : "\n $ 6,600.00\n ",
      "applied" : "\n $ 126.50\n Activity Details \n \n \n ",
      "remainder" : "\n $ 6,473.50\n "
    },
    {
      "plan_features" : "\n  Annual Routine Eye Exam Visit Maximum\n \n ",
      "limit" : "\n 1\n ",
      "applied" : "\n 0\n \n \n ",
      "remainder" : "\n 1\n "
    },
    {
      "plan_features" : "\n  Annual Inpatient Skilled Nursing Facility Days\n \n ",
      "limit" : "\n 60\n ",
      "applied" : "\n 0\n \n \n ",
      "remainder" : "\n 60\n "
    },
    {
      "plan_features" : "\n  Annual Home Health Care Visits\n \n ",
      "limit" : "\n 60\n ",
      "applied" : "\n 0\n \n \n ",
      "remainder" : "\n 60\n "
    },
    {
      "plan_features" : "\n  Annual Physical and Occupational Therapy Visits\n \n ",
      "limit" : "\n 20\n ",
      "applied" : "\n 0\n \n \n ",
      "remainder" : "\n 20\n "
    },
    {
      "plan_features" : "\n  Annual Speech Therapy Visits\n \n ",
      "limit" : "\n 20\n ",
      "applied" : "\n 0\n \n \n ",
      "remainder" : "\n 20\n "
    },
    {
      "plan_features" : "\n  Annual Spinal Manipulation Therapy Visits\n \n ",
      "limit" : "\n 20\n ",
      "applied" : "\n 0\n \n \n ",
      "remainder" : "\n 20\n "
    }
  ]
  },

  /* 5 */
  {
    "_id" : "4fiF2BL5zyWgZ3wKp",
      "user_id" : "ajHRhHWaJ488wHbqn",
      "member_name" : "PATRICIA (You)",
      "plan_details" : [
    {
      "plan_features" : "\n In Network Annual Deductible Includes Pharmacy \n \n ",
      "limit" : "\n $ 5,750.00\n ",
      "applied" : "\n $ 0.00\n \n \n ",
      "remainder" : "\n $ 5,750.00\n "
    },
    {
      "plan_features" : "\n Out of Network Annual Deductible Includes Pharmacy \n \n ",
      "limit" : "\n $ 11,500.00\n ",
      "applied" : "\n $ 0.00\n \n \n ",
      "remainder" : "\n $ 11,500.00\n "
    },
    {
      "plan_features" : "\n In Network Annual Coinsurance (Includes Deductible and Pharmacy)\n \n ",
      "limit" : "\n $ 6,600.00\n ",
      "applied" : "\n $ 0.00\n \n \n ",
      "remainder" : "\n $ 6,600.00\n "
    },
    {
      "plan_features" : "\n  Annual Routine Eye Exam Visit Maximum\n \n ",
      "limit" : "\n 1\n ",
      "applied" : "\n 0\n \n \n ",
      "remainder" : "\n 1\n "
    },
    {
      "plan_features" : "\n  Annual Inpatient Skilled Nursing Facility Days\n \n ",
      "limit" : "\n 60\n ",
      "applied" : "\n 0\n \n \n ",
      "remainder" : "\n 60\n "
    },
    {
      "plan_features" : "\n  Annual Home Health Care Visits\n \n ",
      "limit" : "\n 60\n ",
      "applied" : "\n 0\n \n \n ",
      "remainder" : "\n 60\n "
    },
    {
      "plan_features" : "\n  Annual Physical and Occupational Therapy Visits\n \n ",
      "limit" : "\n 20\n ",
      "applied" : "\n 0\n \n \n ",
      "remainder" : "\n 20\n "
    },
    {
      "plan_features" : "\n  Annual Speech Therapy Visits\n \n ",
      "limit" : "\n 20\n ",
      "applied" : "\n 0\n \n \n ",
      "remainder" : "\n 20\n "
    },
    {
      "plan_features" : "\n  Annual Spinal Manipulation Therapy Visits\n \n ",
      "limit" : "\n 20\n ",
      "applied" : "\n 0\n \n \n ",
      "remainder" : "\n 20\n "
    }
  ]
  }
]

  plan_summary.forEach(function(item){
    item.plan_details.forEach(function(value){
      //plan features========================================================
      value.plan_features = s.replaceAll(value.plan_features, '\\n', '');

      //limits========================================================

      var limit = s.replaceAll(value.limit, '\\n', '');
      limit = s.replaceAll(limit, ',', '');

      if(s.include(limit, '$')){
        limit = Number(s(s.splice(s(limit).trim().value(),0,1,"")).trim().value()) * 100;
      }else{
        limit = Number(limit) * 100;
      }

      value.limit = limit;

      //applied========================================================

      var applied = s.replaceAll(value.applied, '\\n', '');
      applied = s.replaceAll(applied, ',', '');
      applied = s.replaceAll(applied, 'Activity Details', '');


      if(s.include(applied, '$')){
        applied = Number(s(s.splice(s(applied).trim().value(),0,1,"")).trim().value()) * 100;
      }else{
        applied = Number(applied) * 100;
      }

      value.applied = applied;

      //remainder ========================================================

      var remainder = s.replaceAll(value.remainder, '\\n', '');
      remainder = s.replaceAll(remainder, ',', '');
      remainder = s.replaceAll(remainder, 'Activity Details', '');


      if(s.include(remainder, '$')){
        remainder = Number(s(s.splice(s(remainder).trim().value(),0,1,"")).trim().value()) * 100;
      }else{
        remainder = Number(remainder) * 100;
      }

      value.remainder = remainder;

      console.log(value)
    });

    //console.log(Number("5750.00") * 100)
  })


});