var fs     = require('fs');
var fe     = require('fs-extra');
var md5ify = require('md5ify');
var globby = require('globby');
var async  = require('async');

var noop = function () {

};
var getOutput = function (url, cb) {
    fs.readFile(url, "utf8", function (err, data) {
        if (err) throw err;


        var regex = /__md5\([\'\"]([\w\./]*)[\'\"]\)/g;

        var r = [];
        while (m = regex.exec(data)) {
            r.push(m);
        }

        r.forEach(function (v) {
            var s_index = v.index,
                match   = v[0],
                e_index = v.index + match.length,
                path    = v[1];

            data = data.replace(match, getMd5(path));
        });

        cb(err, data);

    });
};

var isFile = function (path, cb) {
    cb = cb || noop;
    fs.stat(path, function (err, stats) {
        if (err) throw err;
        if (!stats.isDirectory()) {
            cb(path);
        }
    });
};

var getMd5 = function (path) {
    return md5ify(path).substr(0, 10);
};

var convert = function (url, dest, cb) {
    getOutput(url, function (err, data) {
        // console.log(data);
        cb = cb || noop;


        fe.outputFile(dest, data, cb);


    });
};

var filesToFolder = function (paths, dest, cb) {
    cb = cb || noop;

    globby(paths).then(function (paths) {
        async.map(paths, getOutput, function (err, results) {
            async.map(paths, function (item, cb) {
                convert(item, dest + item, cb);
            }, function (err, result) {
                if(err) throw err;
            });
        });
    });


};

module.exports = {
    filesToFolder: filesToFolder
};