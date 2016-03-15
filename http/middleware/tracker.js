//middleware for tracking api calls
var trackerEventModel = require('../../models/tracker-event.js');

function apiTrackerMiddleware(req, res, next){
      var methods =[];

      for (key in req.route.methods){
            if(req.route.methods[key])
                  methods.push(key);
      }
      var method = methods.join('|');

      var type = 'api';
      if(req.jwtdata)
            type = 'api-auth';


      var target, endpoint, targetKey;
      var path = req.route.path.split('/');
      var urlParts = req.url.split('/');

      if(path[0] === ''){
            path.shift();
            urlParts.shift();
      }

      if(path[0] != 'api')
            next();

      target = path[1];

      targetKey = 'null';
      console.log(path);
      if(path.length == 2)
            endpoint = 'index';
      else
      {
            var keyPos = path.indexOf(':slug');

            if(~keyPos){
                  targetKey = urlParts[keyPos];
            }

            endpoint = path[path.length-1];
            if(endpoint == ':slug'){
                  endpoint = path[path.length-2];
                  if(endpoint == target)
                        endpoint = 'show';
            }

      }

      var trackingEvent = new trackerEventModel(function(err){
            console.log(err);
      });
      console.log('mw');
      trackingEvent.target = target;
      trackingEvent.endpoint = endpoint;
      trackingEvent.method = method;
      trackingEvent.type = type;
      trackingEvent.targetKey = targetKey;
      trackingEvent.save();

      next();
}








module.exports = apiTrackerMiddleware;
