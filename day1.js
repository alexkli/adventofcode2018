const readline = require('readline');
const fs = require('fs');

function readlines(filename, lineFn) {
	return new Promise(function(resolve) {
		const rl = readline.createInterface({
		  input: fs.createReadStream(filename),
		  crlfDelay: Infinity
		});

		let lastResult;
		rl.on('line', (line) => {
			lastResult = lineFn(line);
		});
		rl.on('close', () => {
			resolve(lastResult);
		});
	})
}

// ————————————————————————————————————————————————————
console.log("day1");

const freqChanges = [];

Promise.resolve().then(() => {
	return readlines('day1-input.txt', (line) => {
		freqChanges.push(parseInt(line, 10));
	});
}).then(() => {
	let freq = 0;
	freqChanges.forEach(change => {
		freq += change;
	});
	console.log(freq);

}).then(() => {	
	console.log("part 2");
	
	let seenFreqs = {};
	seenFreqs[0] = true;
	let firstRepeatedFreq;

	let freq = 0;
	for (let i = 0; i < 10000; i++) {
		if (
			freqChanges.some(change => {
				freq += change;
				if (seenFreqs[freq]) {
					firstRepeatedFreq = freq;
					console.log(`${freq} (after ${i} loops)`);
					return true;
				}
				seenFreqs[freq] = true;
				return false;
			})
		) { break; }
	}
	if (firstRepeatedFreq === undefined) {
		console.log('no repeated frequency found in 10000 loops');
	}
});
