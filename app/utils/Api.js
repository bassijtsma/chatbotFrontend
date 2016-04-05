var axios = require('axios');

// var url = 'http://www.bastronaut.com:3000';
// var url =  'http://198.211.120.226:3000';
var url =  'http://localhost:3000';

var Api = {
  get: function(GETEndPoint) {
    console.log('performing get call for ', GETEndPoint );
    return new Promise(function (resolve, reject) {
      axios.get(url+GETEndPoint)
        .then(function(response) {
          resolve(response.data);
        })
        .catch(function(error) {
          console.log(error);
          reject(error);
        });
    });

  },
  post: function(POSTEndPoint, payload) {
    return new Promise(function (resolve, reject) {
      axios.post(url+POSTEndPoint, payload)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (response) {
          console.log(response);
          reject(response);
        });

    });
  },
  put: function(PUTEndPoint, payoad) {
    return new Promise(function (resolve, reject) {
      axios.put(url+PUTEndPoint, payload)
        .then(function (response) {
          console.log(response);
          resolve(response.data);
        })
        .catch(function (response) {
          console.log(response);
          reject(response);
        });
    });

  },
};



module.exports = Api;
