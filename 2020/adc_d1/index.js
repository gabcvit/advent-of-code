var fs = require('fs');

const generateInputFromFile = (fileName) => {
	try {
		var data = fs.readFileSync(fileName, 'utf8');
		return data.toString().split('\n').map(singleElement => parseInt(singleElement))
	} catch (e) {
		console.log('Error:', e.stack);
	}
}

const findTwoNumbersThatSumToValue = (arrayOfElements, valueToReach = 2020) => {
	let numbersFound = []

	arrayOfElements.every(singleElement => {
		let numberToLook = valueToReach - singleElement
		let indexOfMissingNumber = arrayOfElements.indexOf(numberToLook)
		if (indexOfMissingNumber != -1) {
			numbersFound = [singleElement, arrayOfElements[indexOfMissingNumber]]
			return false
		} else {
			return true
		}
	})

	return numbersFound
}

const findThreeNumbersThatSumToValue = (arrayOfElements, valueToReach = 2020) => {
	let numbersFound = []

	for (let i = 0; i < arrayOfElements.length; i++) {
		let slicedArray = arrayOfElements.slice(0, i).concat(arrayOfElements.slice(i + 1));
		let foundOther2Numbers = findTwoNumbersThatSumToValue(slicedArray, valueToReach - arrayOfElements[i])

		if (foundOther2Numbers.length > 0) {
			numbersFound = [arrayOfElements[i], ...foundOther2Numbers]
			break
		}
	}

	return numbersFound
}

const multiplyNumbersOfArray = (arrayOfElements) => {
	return arrayOfElements.reduce((a, b) => a * b)
}


const inputArray = generateInputFromFile('input_final.txt')
const foundNumbersPt1 = findTwoNumbersThatSumToValue(inputArray)
const foundNumbersPt2 = findThreeNumbersThatSumToValue(inputArray)

console.log('result of part 1:', multiplyNumbersOfArray(foundNumbersPt1))
console.log('result of part 2:', multiplyNumbersOfArray(foundNumbersPt2))


module.exports = {
	generateInputFromFile,
	findTwoNumbersThatSumToValue,
	multiplyNumbersOfArray,
	findThreeNumbersThatSumToValue
}