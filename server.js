
/**
 * Basic Express Server - allows serving of built version of the app
 */
//Install express server
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/en'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/en/index.html'));
});

app.listen(process.env.PORT || 8080);