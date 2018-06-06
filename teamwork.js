const request = require('request')
access_token = null;
endpoint = null;
user = null;


exports.authenticate = function(auth_code, callback) {
    console.log('using auth code: ' + auth_code);
    console.log('sending post request to teamwork launchpad to get perm access token...');
    uri = 'https://www.teamwork.com/launchpad/v1/token.json'
    request.post(
        uri,
        { json: { code:  auth_code} },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
               access_token = body.access_token;
               endpoint = body.installation.apiEndPoint;
               user = body.user;

               getTasks(175854);

               callback(null, ('Welcome to ' + endpoint + ', ' + user.firstName + '!'));
              
            }
        }
    );
};
exports.getEndpoint = function(callback) {
    callback(endpoint);
}
exports.getUser = function(callback) {
    callback(user);
}

/* return tasks for project {api_key}, {id} */
exports.getTasks = function(api_key, id, callback) {
    var company = "geigercp";
    var action = "tasklists/" + id + "/tasks.json?status=new";
    var auth = "Basic " + new Buffer.alloc(64, api_key + ":xxx").toString("base64");
   
    request.get( {
        url : 'https://' + company + '.teamwork.com/' + action,
        headers : {
            "Authorization" : auth
        }
    }, function(error, response, body) {
        callback(null, body);
    } );
};
/*exports.createProject = function(api_key, callback) {

    var company = "geigercp";
    var action = "tasklists/" + id + "/tasks.json";
    var auth = "Basic " + new Buffer.alloc(64, api_key + ":xxx").toString("base64");
   
    request.post( {
        url : 'https://' + company + '.teamwork.com/' + action,
        headers : {
            "Authorization" : auth
        },
        data : {"todo-item": { "content": task_name, "due-date": due_date }};
    }, function(error, response, body) {
        callback(null, body);
    } );

};
*/