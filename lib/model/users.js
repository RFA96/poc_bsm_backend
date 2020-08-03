'use strict';

let Users = function (user) {
  this.id_user = user.id_user;
  this.username = user.username;
  this.password = user.password;
  this.api_key = user.api_key;
}

module.exports = Users;