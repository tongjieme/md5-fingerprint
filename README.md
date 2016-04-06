#Quick Examples
```javascript
npm install md5-fingerprint --save
```
```javascript
var md5Fingerprint = require('md5-fingerprint');

md5Fingerprint.filesToFolder(['html/**/home.html'], 'dest/', 'html', function(err){
	if(err) throw err;
	console.log('done');
});
```

##Before
```html
html/home.html
<html>
	<head>
		<script src="myjsfile.js?v=__md5('myjsfile.js')"></script>
	</head>
</html>
```

##After
```html
dest/home.html
<html>
	<head>
		<script src="myjsfile.js?v=8c16eea7f5"></script>
	</head>
</html>
```

#Options
md5Fingerprint.filesToFolder(paths, dest, noDir, cb);
##paths<Array>
Files paths to proccess
##dest<String>
The output destination
##noDir<String>
Do not generate directory. i.e. 'html' 'src'
##cb<function>
The callback function after process complete