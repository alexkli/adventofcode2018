const readline = require('readline');
const fs = require('fs');

function readlines(filename, lineFn) {
	return new Promise(function(resolve) {
		const rl = readline.createInterface({
		  input: fs.createReadStream(filename),
		  crlfDelay: Infinity
		});

		rl.on('line', lineFn);
		rl.on('close', resolve);
	})
}

console.log("day1");

let freq = 0;
readlines('frequency-changes.txt', (line) => {
	freq += parseInt(line, 10);
}).then(() => {
	console.log(freq);
}).then(() => {
	
	//console.log("part 2");
	
});
