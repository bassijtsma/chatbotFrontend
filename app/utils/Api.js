var axios = require('axios');
// var url = 'http://www.bastronaut.com:3000';
// var url =  'http://198.211.120.226:3000';
var url =  'http://localhost:3000';
var querystring = require('querystring');
var header = { headers : {"Content-Type": "application/x-www-form-urlencoded"}};
//
// var axios = axiosr.create({
//   baseURL: 'https://api.example.com',
//   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
// });

// Alter defaults after instance has been created
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
console.log(axios);

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
    console.log(payload);
    return new Promise(function (resolve, reject) {
      axios.post(url+POSTEndPoint, querystring.stringify(payload), headers)
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
  delete: function(DELETEEndPoint, payload) {
    console.log(querystring.stringify(payload));
    return new Promise(function (resolve, reject) {
    //   axios.post(url+DELETEEndPoint,
    //     querystring.stringify({
    //         username: 'abcd', //gave the values directly for testing
    //         password: '1235!',
    //         client_id: 'user-client'
    //       }), {
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   }
    // }).then(function(response) {
    //       console.log(response.data);
    //       resolve(response.data);
    //     console.log(response);
    // });
      axios.delete(url+DELETEEndPoint, payload, querystring.stringify(payload), {
          headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(function (response) {
          console.log(response.data);
          resolve(response.data);
        })
        .catch(function (response) {
          console.log(response);
          reject(response);
        });
    });
  }
};



module.exports = Api;
