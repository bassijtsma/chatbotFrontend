var axios = require('axios');

var url = '';

var Api = {
  get: function(GETEndPoint) {
    return new Promise(function (resolve, reject) {
      axios.get(url+GETEndPoint)
        .then(function(response) {
          console.log(response);
          resolve(response);
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
          console.log(response);
          resolve(response);
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
          resolve(response);
        })
        .catch(function (response) {
          console.log(response);
          reject(response);
        });
    });

  },
};



module.exports = Api;
