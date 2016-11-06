const router = require('express').Router();

require(__dirname + '/session')(router);
require(__dirname + '/api')(router);

module.exports = router;
