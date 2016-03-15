var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var trackerEventSchema = new Schema({
  type : {type : String, required : true}, //public / api / api-auth
  method : {type : String, required : true},
  target : {required : true, type : String}, //target type, apil (page / field / we) publicus (publicpage)
  targetKey : {type : String},
  endpoint : {required : true, type : String},
}, {timestamps : { createdAt : 'created_at'}});

/*
objToMatch
      type
      method
      target
      targetKey
      endpoint
*/

trackerEventSchema.statics.getLastNDaysCallCounts = function(days, objToMatch, cb){

      var nowDate = new Date();
      nowDate.setMinutes(0);
      nowDate.setHours(0);
      nowDate.setSeconds(0);
      nowDate.setMilliseconds(0);

      targetDate = new Date(nowDate).setDate(nowDate.getDate()-days);
      objToMatch.created_at = {$gt : new Date(targetDate)};

      //gather allDates inbetween for dates where data is not present
      var allDates = {};
      var i = 0;
      var tDate = new Date(targetDate);
      while(tDate.valueOf() != nowDate.valueOf()){
            /*
            allDates.push(
                  {
                        year: tDate.getYear(),
                        month : tDate.getMonth(),
                        dayOfMonth : tDate.getDate(),
                  }
            );
            */

            allDates[tDate.valueOf()] = 0;

            tDate.setDate(tDate.getDate() + 1);
            i++;
      }


      this.aggregate(
            {
                  $match : objToMatch,
            },
            {
                  $group:{
                        _id : {
                              year: { "$year": "$created_at" },
                              month : { "$month": "$created_at"},
                              dayOfMonth: { "$dayOfMonth": "$created_at" },
                        },
                        count : { $sum: 1 }
                  }
            },
            {$sort:{_id:1}}
      , function(err,docs){
            docs.forEach(function(elem){
                  nowDate = new Date('' + elem._id.month + '/'+ elem._id.dayOfMonth +'/'+ elem._id.year);
                  allDates[nowDate.valueOf()] = elem.count;
            });

            console.log(allDates.length, docs.length);
            cb(err,allDates);
      });

}

module.exports = mongoose.model('TrackerEvent', trackerEventSchema);
