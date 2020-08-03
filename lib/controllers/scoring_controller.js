'use strict';

let db = require('../config/postgres_config');
let ScoringRepository = require('../repositories/scoring_repository');
let UserRepository=require('../repositories/users_repository');
let Scoring = require('../model/scoring');
const crypto = require('crypto');

let score_indosat_auto = (req, res, next) => {
    if (!req.body) {
        next('semua field harus diisi...')
    }
    let data = req.body;
    let dataheader=req.headers;
    let api_key = dataheader.api_key;
    let userRepo = new UserRepository(db);
    userRepo.findApiKey(api_key, result => {
            if (result == false) {
                res.status(401).json({
                    status: 'failed',
                    message: 'API Key expired or not found!'
                });
                next();
            } else {
                data.id_user = result.id_user;
                let Request = require("request");
                Request.post({
                    "headers": {
                        "content-type": "application/json"
                    },
                    "url": "http://localhost:2012/indosat_auto",
                    "body": JSON.stringify({
                        status:data.status,
                        tenure:data.tenure,
                        subscriber_type:data.subscriber_type,
                        area:data.area,
                        handset_type:data.handset_type,
                        handset_brand:data.handset_brand,
                        apps_travel:data.apps_travel,
                        apps_ecommerce:data.apps_ecommerce,
                        apps_finance:data.apps_finance,
                        apps_socialnet:data.apps_socialnet,
                        apps_transportation:data.apps_transportation,
                        apps_video:data.apps_video,
                        age_catg:data.age_catg,
                        gender:data.gender,
                        package_name:data.package_name,
                        usage_in_a_month:data.usage_in_a_month,
                        vol_of_usg:data.vol_of_usg,
                        data_rev:data.data_rev,
                        sms_offnet_hits:data.sms_offnet_hits,
                        sms_offnet_rev:data.sms_offnet_rev,
                        sms_onnet_hits:data.sms_onnet_hits,
                        sms_onnet_rev:data.sms_onnet_rev,
                        voice_rev:data.voice_rev,
                        data_usage_in_mb:data.data_usage_in_mb

                    })
                }, (error, response, body) => {
                    if (error) {
                        next(error);
                    }
                    let datainput=dataheader;
                    datainput.id_user=data.id_user;
                    datainput.scoring_results=body;
                    let scoringRepo = new ScoringRepository(db);
                    scoringRepo.findId(result => {
                        datainput.id_scoring = result + 1;
                            let saveRepo = new ScoringRepository(db);
                            saveRepo.save(datainput, result => {
                                res.status(200).json(JSON.parse(body));
                                next();
                            }, err => {
                                if (err) {
                                    next(err);
                                }
                            });
                    });

                });
            }
        },
        err => {
            if (err) {
                next(err);
            }
        });
};

let score_indosat_micro = (req, res, next) => {
    if (!req.body) {
        next('semua field harus diisi...')
    }
    let data = req.body;
    let dataheader=req.headers;
    let api_key = dataheader.api_key;
    let userRepo = new UserRepository(db);
    userRepo.findApiKey(api_key, result => {
            if (result == false) {
                res.status(401).json({
                    status: 'failed',
                    message: 'API Key expired or not found!'
                });
                next();
            } else {
                data.id_user = result.id_user;
                let Request = require("request");
                Request.post({
                    "headers": {
                        "content-type": "application/json"
                    },
                    "url": "http://localhost:2013/indosat_micro",
                    "body": JSON.stringify({
                        status:data.status,
                        tenure:data.tenure,
                        subscriber_type:data.subscriber_type,
                        area:data.area,
                        handset_type:data.handset_type,
                        handset_brand:data.handset_brand,
                        apps_travel:data.apps_travel,
                        apps_ecommerce:data.apps_ecommerce,
                        apps_finance:data.apps_finance,
                        apps_socialnet:data.apps_socialnet,
                        apps_transportation:data.apps_transportation,
                        apps_video:data.apps_video,
                        age_catg:data.age_catg,
                        gender:data.gender,
                        package_name:data.package_name,
                        usage_in_a_month:data.usage_in_a_month,
                        vol_of_usg:data.vol_of_usg,
                        data_rev:data.data_rev,
                        sms_offnet_hits:data.sms_offnet_hits,
                        sms_offnet_rev:data.sms_offnet_rev,
                        sms_onnet_hits:data.sms_onnet_hits,
                        sms_onnet_rev:data.sms_onnet_rev,
                        voice_rev:data.voice_rev,
                        data_usage_in_mb:data.data_usage_in_mb

                    })
                }, (error, response, body) => {
                    if (error) {
                        next(error);
                    }
                    let datainput=dataheader;
                    datainput.id_user=data.id_user;
                    datainput.scoring_results=body;
                    let scoringRepo = new ScoringRepository(db);
                    scoringRepo.findId(result => {
                        datainput.id_scoring = result + 1;
                        let saveRepo = new ScoringRepository(db);
                        saveRepo.save(datainput, result => {
                            res.status(200).json(JSON.parse(body));
                            next();
                        }, err => {
                            if (err) {
                                next(err);
                            }
                        });
                    });

                });
            }
        },
        err => {
            if (err) {
                next(err);
            }
        });
};

let score_indosat_payday = (req, res, next) => {
    if (!req.body) {
        next('semua field harus diisi...')
    }
    let data = req.body;
    let dataheader=req.headers;
    let api_key = dataheader.api_key;
    let userRepo = new UserRepository(db);
    userRepo.findApiKey(api_key, result => {
            if (result == false) {
                res.status(401).json({
                    status: 'failed',
                    message: 'API Key expired or not found!'
                });
                next();
            } else {
                data.id_user = result.id_user;
                let Request = require("request");
                Request.post({
                    "headers": {
                        "content-type": "application/json"
                    },
                    "url": "http://localhost:2014/indosat_payday",
                    "body": JSON.stringify({
                        status:data.status,
                        tenure:data.tenure,
                        subscriber_type:data.subscriber_type,
                        area:data.area,
                        handset_type:data.handset_type,
                        handset_brand:data.handset_brand,
                        apps_travel:data.apps_travel,
                        apps_ecommerce:data.apps_ecommerce,
                        apps_finance:data.apps_finance,
                        apps_socialnet:data.apps_socialnet,
                        apps_transportation:data.apps_transportation,
                        apps_video:data.apps_video,
                        age_catg:data.age_catg,
                        gender:data.gender,
                        package_name:data.package_name,
                        usage_in_a_month:data.usage_in_a_month,
                        vol_of_usg:data.vol_of_usg,
                        data_rev:data.data_rev,
                        sms_offnet_hits:data.sms_offnet_hits,
                        sms_offnet_rev:data.sms_offnet_rev,
                        sms_onnet_hits:data.sms_onnet_hits,
                        sms_onnet_rev:data.sms_onnet_rev,
                        voice_rev:data.voice_rev,
                        data_usage_in_mb:data.data_usage_in_mb

                    })
                }, (error, response, body) => {
                    if (error) {
                        next(error);
                    }
                    let datainput=dataheader;
                    datainput.id_user=data.id_user;
                    datainput.scoring_results=body;
                    let scoringRepo = new ScoringRepository(db);
                    scoringRepo.findId(result => {
                        datainput.id_scoring = result + 1;
                        let saveRepo = new ScoringRepository(db);
                        saveRepo.save(datainput, result => {
                            res.status(200).json(JSON.parse(body));
                            next();
                        }, err => {
                            if (err) {
                                next(err);
                            }
                        });
                    });

                });
            }
        },
        err => {
            if (err) {
                next(err);
            }
        });
};

let score_indosat_sample = (req, res, next) => {
    if (!req.body) {
        next('semua field harus diisi...')
    }
    let data = req.body;
    let dataheader=req.headers;
    let api_key = dataheader.api_key;
    let userRepo = new UserRepository(db);
    userRepo.findApiKey(api_key, result => {
            if (result == false) {
                res.status(401).json({
                    status: 'failed',
                    message: 'API Key expired or not found!'
                });
                next();
            } else {
                data.id_user = result.id_user;
                let Request = require("request");
                Request.post({
                    "headers": {
                        "content-type": "application/json"
                    },
                    "url": "http://localhost:2011/indosat_sample",
                    "body": JSON.stringify({
                        status:data.status,
                        tenure:data.tenure,
                        subscriber_type:data.subscriber_type,
                        area:data.area,
                        handset_type:data.handset_type,
                        handset_brand:data.handset_brand,
                        apps_travel:data.apps_travel,
                        apps_ecommerce:data.apps_ecommerce,
                        apps_finance:data.apps_finance,
                        apps_socialnet:data.apps_socialnet,
                        apps_transportation:data.apps_transportation,
                        apps_video:data.apps_video,
                        age_catg:data.age_catg,
                        gender:data.gender,
                        package_name:data.package_name,
                        usage_in_a_month:data.usage_in_a_month,
                        vol_of_usg:data.vol_of_usg,
                        data_rev:data.data_rev,
                        sms_offnet_hits:data.sms_offnet_hits,
                        sms_offnet_rev:data.sms_offnet_rev,
                        sms_onnet_hits:data.sms_onnet_hits,
                        sms_onnet_rev:data.sms_onnet_rev,
                        voice_rev:data.voice_rev,
                        data_usage_in_mb:data.data_usage_in_mb

                    })
                }, (error, response, body) => {
                    if (error) {
                        next(error);
                    }
                    let datainput=dataheader;
                    datainput.id_user=data.id_user;
                    datainput.scoring_results=body;
                    let scoringRepo = new ScoringRepository(db);
                    scoringRepo.findId(result => {
                        datainput.id_scoring = result + 1;
                        let saveRepo = new ScoringRepository(db);
                        saveRepo.save(datainput, result => {
                            res.status(200).json(JSON.parse(body));
                            next();
                        }, err => {
                            if (err) {
                                next(err);
                            }
                        });
                    });

                });
            }
        },
        err => {
            if (err) {
                next(err);
            }
        });
};


let score_indosat_SME = (req, res, next) => {
    if (!req.body) {
        next('semua field harus diisi...')
    }
    let data = req.body;
    let dataheader=req.headers;
    let api_key = dataheader.api_key;
    let userRepo = new UserRepository(db);
    userRepo.findApiKey(api_key, result => {
            if (result == false) {
                res.status(401).json({
                    status: 'failed',
                    message: 'API Key expired or not found!'
                });
                next();
            } else {
                data.id_user = result.id_user;
                let Request = require("request");
                Request.post({
                    "headers": {
                        "content-type": "application/json"
                    },
                    "url": "http://localhost:2010/indosat_SME",
                    "body": JSON.stringify({
                        status:data.status,
                        tenure:data.tenure,
                        subscriber_type:data.subscriber_type,
                        area:data.area,
                        handset_type:data.handset_type,
                        handset_brand:data.handset_brand,
                        apps_travel:data.apps_travel,
                        apps_ecommerce:data.apps_ecommerce,
                        apps_finance:data.apps_finance,
                        apps_socialnet:data.apps_socialnet,
                        apps_transportation:data.apps_transportation,
                        apps_video:data.apps_video,
                        age_catg:data.age_catg,
                        gender:data.gender,
                        package_name:data.package_name,
                        usage_in_a_month:data.usage_in_a_month,
                        vol_of_usg:data.vol_of_usg,
                        data_rev:data.data_rev,
                        sms_offnet_hits:data.sms_offnet_hits,
                        sms_offnet_rev:data.sms_offnet_rev,
                        sms_onnet_hits:data.sms_onnet_hits,
                        sms_onnet_rev:data.sms_onnet_rev,
                        voice_rev:data.voice_rev,
                        data_usage_in_mb:data.data_usage_in_mb

                    })
                }, (error, response, body) => {
                    if (error) {
                        next(error);
                    }
                    let datainput=dataheader;
                    datainput.id_user=data.id_user;
                    datainput.scoring_results=body;
                    let scoringRepo = new ScoringRepository(db);
                    scoringRepo.findId(result => {
                        datainput.id_scoring = result + 1;
                        let saveRepo = new ScoringRepository(db);
                        saveRepo.save(datainput, result => {
                            res.status(200).json(JSON.parse(body));
                            next();
                        }, err => {
                            if (err) {
                                next(err);
                            }
                        });
                    });

                });
            }
        },
        err => {
            if (err) {
                next(err);
            }
        });
};

let score_indosat_whitegood = (req, res, next) => {
    if (!req.body) {
        next('semua field harus diisi...')
    }
    let data = req.body;
    let dataheader=req.headers;
    let api_key = dataheader.api_key;
    let userRepo = new UserRepository(db);
    userRepo.findApiKey(api_key, result => {
            if (result == false) {
                res.status(401).json({
                    status: 'failed',
                    message: 'API Key expired or not found!'
                });
                next();
            } else {
                data.id_user = result.id_user;
                let Request = require("request");
                Request.post({
                    "headers": {
                        "content-type": "application/json"
                    },
                    "url": "http://localhost:2015/indosat_whitegood",
                    "body": JSON.stringify({
                        status:data.status,
                        tenure:data.tenure,
                        subscriber_type:data.subscriber_type,
                        area:data.area,
                        handset_type:data.handset_type,
                        handset_brand:data.handset_brand,
                        apps_travel:data.apps_travel,
                        apps_ecommerce:data.apps_ecommerce,
                        apps_finance:data.apps_finance,
                        apps_socialnet:data.apps_socialnet,
                        apps_transportation:data.apps_transportation,
                        apps_video:data.apps_video,
                        age_catg:data.age_catg,
                        gender:data.gender,
                        package_name:data.package_name,
                        usage_in_a_month:data.usage_in_a_month,
                        vol_of_usg:data.vol_of_usg,
                        data_rev:data.data_rev,
                        sms_offnet_hits:data.sms_offnet_hits,
                        sms_offnet_rev:data.sms_offnet_rev,
                        sms_onnet_hits:data.sms_onnet_hits,
                        sms_onnet_rev:data.sms_onnet_rev,
                        voice_rev:data.voice_rev,
                        data_usage_in_mb:data.data_usage_in_mb

                    })
                }, (error, response, body) => {
                    if (error) {
                        next(error);
                    }
                    let datainput=dataheader;
                    datainput.id_user=data.id_user;
                    datainput.scoring_results=body;
                    let scoringRepo = new ScoringRepository(db);
                    scoringRepo.findId(result => {
                        datainput.id_scoring = result + 1;
                        let saveRepo = new ScoringRepository(db);
                        saveRepo.save(datainput, result => {
                            res.status(200).json(JSON.parse(body));
                            next();
                        }, err => {
                            if (err) {
                                next(err);
                            }
                        });
                    });

                });
            }
        },
        err => {
            if (err) {
                next(err);
            }
        });
};
module.exports = {
    score_indosat_auto: score_indosat_auto,
    score_indosat_micro: score_indosat_micro,
    score_indosat_payday: score_indosat_payday,
    score_indosat_sample: score_indosat_sample,
    score_indosat_SME: score_indosat_SME,
    score_indosat_whitegood: score_indosat_whitegood
};
