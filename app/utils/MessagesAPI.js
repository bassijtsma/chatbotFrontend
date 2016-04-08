var Api = require('../utils/Api');

var MessagesAPI = {
  deleteMessage: function(objectId) {
    return new Promise(function (resolve, reject) {
      Api.delete('/messages/', objectId)
        .then(function(result) {
          console.log(result);
          resolve(result);
        })
        .catch(function(err) {
          console.log(err);
          reject(err);
        });
    });
  }
};

module.exports = MessagesAPI;
