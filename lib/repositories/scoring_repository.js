'use strict';

let Scoring = require('../model/scoring');
let db = require('../config/postgres_config');

let ScoringRepository = function () {

};
ScoringRepository.prototype = {

    save: function (scoring, cb, errCb) {

        let tahun = new Date().getFullYear();
        let _bulan = new Date().getMonth();
        let tanggal = new Date().getDate();
        let arrbulan = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        let bulan = arrbulan[_bulan];
        let detik = new Date().getSeconds();
        let menit = new Date().getMinutes();
        let jam = new Date().getHours();
        let date = '' + tahun  + '-' + bulan + '-' + tanggal + ' ' + jam + ':' + menit + ':' + detik + '';
        let query = "INSERT INTO public.scoring(id_scoring, ip_address, scoring_results, created_datetime, id_user) VALUES('" + scoring.id_scoring + "', '" + scoring.ip_address + "', '" + scoring.scoring_results+ "', '" +date + "', '" + scoring.id_user + "') RETURNING id_scoring;";
        db.query(query, (err, result) => {
            if (err) {
                errCb(err);
            }
            cb(result);
        });
    },
    // findOne: function (id_scoring_, cb, errCb) {
    //     let query = "SELECT * FROM public.scoring WHERE id_scoring_engine ='" + id_scoring_engine + "'";
    //     db.query(query, (err, results, fields) => {
    //         if (err) {
    //             errCb(err);
    //         } else {
    //             let result = results.rows[0];
    //             if (!result) {
    //                 let cek = false;
    //                 cb(cek);
    //             } else {
    //                 let scoring_engine = new Scoring(result);
    //                 cb(scoring_engine);
    //             }
    //         }

    //     });
    // },

    // findAll: function (cb, errCb) {
    //     let query = 'SELECT * FROM public.scoring_engines';
    //     db.query(query, (error, results) => {
    //         if (error) {
    //             throw error
    //         }
    //         let scoring_engines = [];
    //         for (let i = 0; i < results.rows.length; i++) {
    //             let e = results.rows[i];
    //             let scoring_engine = new Scoring_engines(e);
    //             scoring_engines.push(scoring_engine);
    //         }
    //         cb(scoring_engines);
    //     });
    // },
    findId: function (cb, errCb) {
        let query = 'SELECT MAX(id_scoring)  AS id FROM public.scoring ';
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
    // delete: function (id_scoring, cb, errCb) {
    //     let query = "DELETE FROM public.scoring_engines WHERE id_scoring_engine ='" + id_scoring + "'";
    //     db.query(query, (err, result) => {
    //         if (err) {
    //             errCb(err);
    //         }
    //         cb(result);
    //     });
    // },
    // update: function (data, cb, errCb) {
    //     let query = "UPDATE public.scoring_engines SET  name='" + data.name + "', version='" + data.version + "' WHERE id_scoring_engine='" + data.id_scoring_engine + "'";
    //     db.query(query, (err, result) => {
    //         if (err) {
    //             errCb(err);
    //         }
    //         cb(result);
    //     });
    // },
};

module.exports = ScoringRepository;
