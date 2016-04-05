#Quick Examples
```javascript
var md5Fingerprint = require('md5-fingerprint');

md5Fingerprint.filesToFolder(['html/**/*.html'], 'dest/', function(err){
	if(err) throw err;
	console.log('done');
});
```