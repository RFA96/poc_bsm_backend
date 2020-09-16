'use strict';

const Pool = require('pg').Pool
const connect = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ScoringBSM',
  password: 'fineoz123',
  port: 5432,
});



module.exports = connect;
