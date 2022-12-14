//http://localhost:9000/workbook?model=<modelId>&unit=<unitId>[&firstExport=true][&flushCache=true]
//http://localhost:9000/teacherbook?model=<modelId>&unit=<unitId>[&firstExport=true][&flushCache=true]

const express = require('express');
const _ = require('lodash');
const config = require('./config.json');

const app = express();
const router = require('./api');
const cookieSession = require("cookie-session");
const frontendDistPath='./dist/green-ninja-sales';

var port = process.env.PORT || 4201;


app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT, DELETE, POST, GET");

    next();
  });

app.use(
    cookieSession({
      name: 'session',
      keys: [
        'secretSessionTextWhichIncludesWordsGreenAndNinjaForTheGreenNinjaOrgWebsite'
      ],
      domain: process.env.DOMAIN,
      // Cookie Options
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    })
);

app.use('/api', router);

app.use('/', express.static(frontendDistPath));


const server=app.listen(port, null, function() {
    console.log('Express server listening on port %d', port);
});
server.timeout = 0;
