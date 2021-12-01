var fs = require('fs');

const generateInputFromFile = (fileName) => {
	try {  
		var data = fs.readFileSync(fileName, 'utf8');
		return data.toString().split('\n')
	} catch(e) {
		console.log('Error:', e.stack);
	}
}

const countAmountOfIncreases = (arrayOfElements) => {
	let countOfIncreases = 0;
	let previousElement = parseInt(arrayOfElements[0]);

	arrayOfElements.forEach(singleElement => {
		if(parseInt(previousElement) < parseInt(singleElement)) {
			countOfIncreases++
		}

		previousElement = singleElement
	})
	
	return countOfIncreases
}

const inputArray = generateInputFromFile('input_final.txt')
const result = countAmountOfIncreases(inputArray)

console.log(result)

module.exports = {
	generateInputFromFile,
	countAmountOfIncreases
}