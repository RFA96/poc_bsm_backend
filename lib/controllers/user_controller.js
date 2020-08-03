'use strict';

let db = require('../config/postgres_config');
let UserRepository = require('../repositories/users_repository');
let User = require('../model/users');
const crypto = require('crypto');


let saveUser = (req, res, next) => {
  if (!req.body) {
    next('semua field harus diisi...')
  }
  let data = req.body;
  let userRepo = new UserRepository(db);

  userRepo.findUsername(data.username, result => {
    if (result == true) {
      userRepo.findId(result => {
        data.id_user = result + 1;
        const crypto = require('crypto');
        crypto.randomBytes(16, (err, buf) => {
          data.api_key = (buf.toString('hex'));
          let saveRepo = new UserRepository(db);
          saveRepo.save(data, result => {
            res.status(200).json({
              status: "success",
              message: "New user has been created successfully"
            });
            next();
          }, err => {
            if (err) {
              next(err);
            }
          });
        });
      });
    } else {
      res.status(403).json({
        status: 'failed',
        message: 'Username has been used. Try another username!'
      });
      next();
    }
  }, err => {
    if (err) {
      next(err);
    }
  });
};

let getUser = (req, res, next) => {
  if (!req.params) {
    next('parameter tidak ada');
  }
  let data = req.body;
  let userRepo = new UserRepository(db);
  userRepo.findUser(data, result => {
    if (result.api_key == null) {
      res.status(404).json({
        status: 'Failed',
        message: 'Username and Password do not match',
        "api_key": result.api_key
      });
      next();

    } else {
      res.status(200).json({
        status: 'success',
        "api_key": result.api_key
      });
      next();
    }


  }, err => {
    if (err) {
      res.status(404).json({
        status: 'failed',
        message: 'Not Found !'
      });
      next();
    }
  });
};

let getUsers = (req, res, next) => {
  let userRepo = new UserRepository(db);
  userRepo.findAll(result => {
    res.status(200).json(result);
    next();
  }, err => {
    if (err) {
      res.status(404).json({
        status: 'failed',
        message: 'Not Found !'
      });
      next();
    }
  });
};

let DeleteUser = (req, res, next) => {
  let data = req.headers;
  let userRepo = new UserRepository(db);
  userRepo.findApiKey(data.api_key, result => {
    if (result == false) {
      res.status(404).json({
        status: 'failed',
        message: 'Api Key Not Found !!'
      });
      next();
    } else {
          userRepo.delete(result.id_user, result => {
            res.status(200).json({
              status: 'success',
              message: 'Data berhasil di hapus !!'
            });
            next();
          }, err => {
            if (err) {
              next(err);
            }
          });
    }
  }, err => {
    if (err) {
      res.status(404).json({
        status: 'failed',
        message: 'Not Found !!'
      });
      next();
    }
  });
};
let UpdateUser = (req, res, next) => {
  let data = req.headers;
  let databody = req.body;
  let userRepo = new UserRepository(db);
  userRepo.findApiKey(data.api_key, result => {
    if (result == false) {
      res.status(404).json({
        status: 'failed',
        message: 'Api Key Not Found !!'
      });
      next();
    } else {
      let id_admin = result.id_user;
        if (!data.id_user) {
          databody.id_user = id_admin;
          userRepo.update(databody, result => {
            res.status(200).json({
              status: 'success',
              message: 'Update data sukses !!'
            });
            next();
          }, err => {
            if (err) {
              next(err);
            }
          });
        } else {
          databody.id_user = data.id_user;
          userRepo.update(databody, result => {
            res.status(200).json({
              status: 'success',
              message: 'Update data sukses !!'
            });
            next();
          }, err => {
            if (err) {
              next(err);
            }
          });
        }
    }
  }, err => {
    if (err) {
      res.status(404).json({
        status: 'failed',
        message: 'Not Found !!'
      });
      next();
    }
  });
};


module.exports = {
  getUser: getUser,
  getUsers: getUsers,
  saveUser: saveUser,
  DeleteUser: DeleteUser,
  UpdateUser: UpdateUser
};