var fs = require('fs');

const generateInputFromFile = (fileName) => {
	try {  
		var data = fs.readFileSync(fileName, 'utf8');
		return data.toString().split('\n').map(singleElement => parseInt(singleElement))
	} catch(e) {
		console.log('Error:', e.stack);
	}
}

const generateThreeMeasurementSlidingWindow = (arrayOfElements) => {
	const SIZE_OF_SLICE = 3
	let resultArray = []

	for(let i = 0; i <= arrayOfElements.length - SIZE_OF_SLICE; i++) {
		let threeMeasurementSlice = arrayOfElements.slice(i, i + SIZE_OF_SLICE)
		let sumOfMeasurements = threeMeasurementSlice.reduce((a, b) => a + b, 0)
		resultArray.push(sumOfMeasurements)
	}

	return resultArray
}

const countAmountOfIncreases = (arrayOfElements) => {
	let countOfIncreases = 0;
	let previousElement = arrayOfElements[0];

	arrayOfElements.forEach(singleElement => {
		if(parseInt(previousElement) < singleElement) {
			countOfIncreases++
		}

		previousElement = singleElement
	})
	
	return countOfIncreases
}

const inputArray = generateInputFromFile('input_final.txt')
const treatedArray = generateThreeMeasurementSlidingWindow(inputArray)

console.log('result of part 1:', countAmountOfIncreases(inputArray))
console.log('result of part 2:', countAmountOfIncreases(treatedArray))

module.exports = {
	generateInputFromFile,
	countAmountOfIncreases,
	generateThreeMeasurementSlidingWindow
}