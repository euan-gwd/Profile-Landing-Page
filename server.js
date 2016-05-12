(function() {
    'use strict';

    var express = require('express'),
        path = require('path'),
        port = 3000,
        server = express();

    server.use(express.static(__dirname + '/public'));

    server.get('/', function(req,res) {
        res.sendFile(path.join(__dirname + '/public/index.html'));
    });

    server.listen(port, function() {
        console.log('ExpressJS server is running on port ' + port + ' !, ctrl-c to quit');
    });

}());
