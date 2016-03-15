var trackerEventModel = require('./../../models/tracker-event.js');

var trackerEventSeeder = function(){


      function getRandom(arr){
            var l = arr.length;
            return arr[Math.floor(Math.random()*l)];
      }

      function getRandomKey(){
            return Math.floor(Math.random()*10000000);
      }

      function getRandomDate(){
            return new Date(new Date()-Math.floor(Math.random()*1000*60*60*24*400));
      }

      data = [];

      var methods = ['get', 'delete', 'post'];
      var targets = ['pages', 'fields', 'options'];
      var types = ['api','api-auth','public'];
      var endpoints = ['show','list','delete','create','index'];




      for(var i = 0; i <= 50000; i++){
            var obj = {
                  method : getRandom(methods),
                  type : getRandom(types),
                  endpoint : getRandom(endpoints),
                  target : getRandom(targets),
                  created_at : getRandomDate(),
                  targetKey : getRandomKey(),
            };
            var s = new trackerEventModel(obj);
            s.save(function(err,d){
                  if(i == 50000)
                        return res.json(err);
            });
      }
}


module.exports = trackerEventSeeder;
