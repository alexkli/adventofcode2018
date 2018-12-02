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
console.log("day 2");

let boxIds = [];

Promise.resolve().then(() => {
	return readlines('day2-input.txt', (line) => {
		boxIds.push(line);
	});
}).then(() => {
	let count2 = 0;
	let count3 = 0;

	boxIds.forEach((id) => {
		const count = {};		
		for (let i = 0; i < id.length; i++) {
			const char = id.charAt(i);
			count[char] = count[char] === undefined ? 1 : 1 + count[char];
		}
	
		if (Object.keys(count).some(char => count[char] == 2)) {
			count2 += 1;
		}
		if (Object.keys(count).some(char => count[char] == 3)) {
			count3 += 1;
		}
	});
	
	console.log(count2 * count3);
	
}).then(() => {
	console.log('part 2');
	
	function charDelta(str1, str2) {
		if (str1.length != str2.length) {
			console.log('strings with differing lengths');
			return 10;
		}

		let delta = 0;
		for (let i = 0; i < str1.length; i++) {
			if (str1.charAt(i) != str2.charAt(i)) {
				delta += 1;
			}
		}
		return delta;
	}
	
	let found = boxIds.some((id) => {
		return boxIds.some((otherId) => {
			if (charDelta(id, otherId) == 1) {
				//console.log(id);
				//console.log(otherId);
				let common = '';
				for (let i = 0; i < id.length; i++) {
					if (id.charAt(i) == otherId.charAt(i)) {
						common += id.charAt(i);
					}
				}
				console.log(common);
				return true;
			}
			return false;
		});
	});
	
	if (!found) {
		console.log('nothing found');
	}
});