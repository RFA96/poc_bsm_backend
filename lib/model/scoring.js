'use strict';

let Scoring = function (scoring) {
    this.id_scoring = scoring.id_scoring;
    this.ip_address = scoring.ip_address;
    this.scoring_results = scoring.scoring_results;
    this.created_datetime = scoring.created_datetime;
}
module.exports = Scoring;