'use strict';

let db = require('../config/postgres_config');
let ScoringRepository = require('../repositories/scoring_repository');
let UserRepository=require('../repositories/users_repository');
const crypto = require('crypto');

let score_BSM = (req, res, next) => {
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
                    "url": "http://147.139.129.212:2016/predict",
                    // "url": "http://localhost:2016/predict",
                    "body": JSON.stringify({
                        loan_tenor:data.loan_tenor,
                        interest_rate:data.interest_rate,
                        loan_disbursement_amount:data.loan_disbursement_amount,
                        lama_usaha_dalam_tahun:data.lama_usaha_dalam_tahun,
                        unggah_siup:data.unggah_siup,
                        unggah_bukti_akte: data.unggah_bukti_akte,
                        provinsi:data.provinsi,
                        office_status:data.office_status,
                        status_company:data.status_company,
                        jenis_bidang_usaha:data.jenis_bidang_usaha

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

let score_Modal_Antara = (req, res, next) => {
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
                    "url": "http://147.139.129.212:3000/predict",
                    // "url": "http://localhost:3000/predict",
                    "body": JSON.stringify({
                        tanggal_lahir:data.tanggal_lahir,
                        pengambilan_kredit: data.pengambilan_kredit,
                        pengalaman_kerja:data.pengalaman_kerja,
                        jabatan_id:data.jabatan_id,
                        pendapatan:data.pendapatan,
                        jumlah_tanggungan:data.jumlah_tanggungan,
                        pendidikan:data.pendidikan,
                        kepemilikan:data.kepemilikan,
                        pinjaman: data.pinjaman,
                        tenor_bulanan: data.tenor_bulanan

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

let score_Investree_Invoicing = (req, res, next) => {
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

                    "url": "http://147.139.129.212:2018/predict",
                   //"url": "http://localhost:2018/predict",
                    "body": JSON.stringify({
                        bld_id :data.bld_id,
                        bld_bpd_id :data.bld_bpd_id,
                        loan_count :data.loan_count,
                        bld_loan_tenor :data.bld_loan_tenor,
                        dpd_total :data.dpd_total,
                        loan_active :data.loan_active,
                        mob :data.mob,
                        early_loan_total :data.early_loan_total,
                        mbbf_name_en :data.mbbf_name_en,
                        bld_loan_disbursement_amount_sum :data.bld_loan_disbursement_amount_sum,
                        bld_loan_disbursement_amount_mean : data.bld_loan_disbursement_amount_mean,
                        good_loan_prop :data.good_loan_prop

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

let score_Mandala_F_Score = (req, res, next) => {
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
                    "url": "http://147.139.129.212:2021/predict",
                    //"url": "http://localhost:2021/predict",
                    "body": JSON.stringify({
                        nama:data.nama,
                        jenis_kelamin:data.jenis_kelamin,
                        provinsi:data.provinsi,
                        dpkons:data.dpkons,
                        tenor:data.tenor,
                        pengambilan_kredit_ke:data.pengambilan_kredit_ke,
                        project_amount:data.project_amount,
                        angs:data.angs,
                        taksasi:data.taksasi,
                        hrgotr:data.hrgotr,
                        tgl_lahir:data.tgl_lahir,
                        pendapatan_tahunan:data.pendapatan_tahunan,
                        bidang_pekerjaan:data.bidang_pekerjaan,
                        jenis_fasilitas:data.jenis_fasilitas

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


let score_Mandala_G_Score = (req, res, next) => {
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
                     //"url": "http://localhost:2022/predict",
                     "url": "http://147.139.129.212:2022/predict",
                    "body": JSON.stringify({
                        nama:data.nama,
                        jenis_kelamin:data.jenis_kelamin,
                        provinsi:data.provinsi,
                        pengambilan_kredit_ke:data.pengambilan_kredit_ke,
                        tgl_lahir:data.tgl_lahir,
                        pendapatan_tahunan:data.pendapatan_tahunan,
                        bidang_pekerjaan:data.bidang_pekerjaan

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

let score_BYB  = (req, res, next) => {
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
                    //"url": "http://localhost:2020/predict",
                     "url": "http://147.139.129.212:2020/predict",

                    "body": JSON.stringify({
                        birthdate:data.birthdate,
                        gender: data.gender,
                        marital_status :data.marital_status,
                        provider: data.provider,
                        length_of_stay_years :data.length_of_stay_years,
                        monthly_income : data.monthly_income,
                        loan_amount_principal :data.loan_amount_principal,
                        loan_period_months : data.loan_period_months,
                        goods_price : data.goods_price,
                        down_payment: data.down_payment

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
let score_Indofund  = (req, res, next) => {
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
                    //"url": "http://localhost:3492/indof",
                    "url": "http://147.139.129.212:3492/indof",

                    "body": JSON.stringify({
                        nama:data.nama,
                        provinsi:data.provinsi,
                        loan_tenor:data.loan_tenor,
                        interest_rate:data.interest_rate,
                        loan_disbursement_amount:data.loan_disbursement_amount,
                        jenis_bidang_usaha: data.jenis_bidang_usaha,
                        unggah_bukti_akte:data.unggah_bukti_akte,
                        unggah_siup: data.unggah_siup,
                        office_status: data.office_status,
                        status_company: data.status_company,
                        lama_usaha_dalam_tahun: data.lama_usaha_dalam_tahun

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
    score_BSM: score_BSM,
    score_Modal_Antara: score_Modal_Antara,
    score_Investree_Invoicing: score_Investree_Invoicing,
    score_Mandala_F_Score: score_Mandala_F_Score,
    score_Mandala_G_Score: score_Mandala_G_Score,
    score_BYB: score_BYB,
    score_Indofund:score_Indofund
};
