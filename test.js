var md5Fingerprint = require('./index.js');

md5Fingerprint.filesToFolder(['src/index.html'], 'dest/', function(err){
	if(err) throw err;
	console.log('done');
});