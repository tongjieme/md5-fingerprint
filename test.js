var md5Fingerprint = require('./index.js');

md5Fingerprint.filesToFolder(['src/index.html'], 'dest/', "src", function(err){
	if(err) throw err;
	console.log('done');
});