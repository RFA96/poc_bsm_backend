'use strict';

let User = require('../model/users');
let db = require('../config/postgres_config');

let UserRepository = function (db) {

};

UserRepository.prototype = {

  save: function (user, cb, errCb) {

    let query = "INSERT INTO public.users (id_user, username, password, api_key) VALUES ('" + user.id_user + "','" + user.username + "','" + user.password + "','" + user.api_key + "');";
    db.query(query, (err, result) => {
      if (err) {
        errCb(err);
      }
      cb(result);
    });
  },
  findUser: function (user, cb, errCb) {
    let query = "SELECT * FROM public.users WHERE username ='" + user.username + "' AND password='" + user.password + "'";
    db.query(query, (err, results, fields) => {
      if (err) {
        errCb(err);
      }
      let result = results.rows[0];
      if (!result) {
        let datacek = {
          api_key: null,
        }
        cb(datacek);
      } else {
        let user = new User(result);
        cb(user);
      }
    });
  },
  findUsername: function (username, cb, errCb) {
    let query = "SELECT * FROM public.users WHERE username ='" + username + "'";
    db.query(query, (err, results) => {
      if (err) {
        errCb(err);
      }
      let result = results.rows[0];
      if (!result) {
        let cek = true;
        cb(cek);
      } else {
        let user = new User(result);
        cb(user);
      }
    });
  },

  findAll: function (cb, errCb) {
    let query = 'SELECT * FROM public.users';
    db.query(query, (error, results) => {
      if (error) {
        errCb(error);
      }

      let users = [];
      for (let i = 0; i < results.rows.length; i++) {
        let e = results.rows[i];
        let user = new User(e);
        users.push(user);
      }
      cb(users);
    });
  },
  findApiKey: function (apikey, cb, errCb) {
    let query = "SELECT * FROM public.users WHERE api_key ='" + apikey + "'";
    db.query(query, (err, results, fields) => {
      if (err) {
        errCb(err);
      } else {
        let result = results.rows[0];
        if (!result) {
          let cek = false;
          cb(cek);
        } else {
          let user = new User(result);
          cb(user);
        }
      }
    });
  },
  findId: function (cb, errCb) {
    let query = 'SELECT MAX(id_user)  AS id FROM public.users ';
    db.query(query, (error, results) => {
      if (error) {
        throw error
      } else {
        let result = results.rows[0];
        if (!result) {
          let cek = 0;
          cb(cek);
        } else {
          let e = results.rows[0];
          cb(e.id);
        }
      }
    });
  },
  delete: function (id_user, cb, errCb) {
    let query = "DELETE FROM public.users WHERE id_user ='" + id_user + "'";
    db.query(query, (err, result) => {
      if (err) {
        errCb(err);
      }
      cb(result);
    });
  },
  update: function (data, cb, errCb) {
    let query = "UPDATE public.users  SET  username='" + data.username + "', password='" + data.password + "' WHERE id_user='" + data.id_user + "'";
    db.query(query, (err, result) => {
      if (err) {
        errCb(err);
      }
      cb(result);
    });
  },

};

module.exports = UserRepository;