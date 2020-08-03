'use strict';

const Pool = require('pg').Pool
const connect = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ScoringBSM',
  password: 'almarogi',
  port: 5433,
});



module.exports = connect;