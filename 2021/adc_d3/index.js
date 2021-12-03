var fs = require('fs');

const generateInputFromFile = (fileName) => {
	try {  
		var data = fs.readFileSync(fileName, 'utf8');
		return data.toString().split('\n')
	} catch(e) {
		console.log('Error:', e.stack);
	}
}

const sumColumnDigits = (inputArray) => {
	let sumsArray = new Array(inputArray[0].length).fill(0);

	inputArray.forEach(singleBinaryNumber => {
		for(let i = 0; i < singleBinaryNumber.length; i++) {
			sumsArray[i] += parseInt(singleBinaryNumber[i])
		}
	})

	return sumsArray
}

const determineGammaRateBinary = (inputArray, lengthOfInputArray) => {

	return inputArray.map(singleDigit => {
		if(singleDigit > lengthOfInputArray / 2) {
			return '1'
		} else {
			return '0'
		}
	}).join('')	
}

const determineEpsilonRateBinary = (gammaRateBinary) => {
	return gammaRateBinary.split('').map(x => {
		return (x == 1) ? 0 : 1;
	}).join('');
}

const determinePowerConsumption = (gammaRateBinary, epsilonRateBinary) => {
	let gammaDecimal = parseInt(gammaRateBinary, 2)
	let epsilonDecimal = parseInt(epsilonRateBinary, 2)

	return gammaDecimal * epsilonDecimal
}

const getMostCommonDigitForColumnByIndex = (inputArray, index) => {
	let sumOfIndexColumn = inputArray.reduce((a, b) => {
		return a += parseInt(b[index], 10)
	}, 0)

	return sumOfIndexColumn >= inputArray.length / 2 ? '1' : '0'
}

const determineGasLevel = (inputArray, columnIndex, filterFunction) => {
	if(inputArray.length === 1) {
		return inputArray
	}

	let mostCommonDigit = getMostCommonDigitForColumnByIndex(inputArray, columnIndex)
	return determineGasLevel(inputArray.filter(singleBinaryString => filterFunction(singleBinaryString, mostCommonDigit, columnIndex)), columnIndex + 1, filterFunction)
}

const determineOxygenGeneratorRating = (inputArray) => {
	return parseInt(determineGasLevel(inputArray, 0, (inputString, mostCommonDigit, columnIndex) => {
		return inputString[columnIndex] === mostCommonDigit
	}), 2)
}

const determineCO2ScrubberRating = (inputArray) => {
	return parseInt(determineGasLevel(inputArray, 0, (inputString, mostCommonDigit, columnIndex) => {
		return inputString[columnIndex] !== mostCommonDigit
	}), 2)
}

const runPart1 = (fileName) => {
	const inputArray = generateInputFromFile(fileName)
	const summedDigits = sumColumnDigits(inputArray)
	const gammaRateBinary = determineGammaRateBinary(summedDigits, inputArray.length)
	const epsilonRateBinary = determineEpsilonRateBinary(gammaRateBinary)

	return determinePowerConsumption(gammaRateBinary, epsilonRateBinary)
}

const runPart2 = (fileName) => {
	const inputArray = generateInputFromFile(fileName)
	const oxygenGeneratorRating = determineOxygenGeneratorRating(inputArray)
	const CO2ScrubberRating = determineCO2ScrubberRating(inputArray)

	return oxygenGeneratorRating * CO2ScrubberRating
}


// RUN THE CHALLENGE

// pt1
console.log('part 1: ', runPart1('input_final.txt'))

//pt 2
console.log('part 2: ', runPart2('input_final.txt'))




module.exports = {
	generateInputFromFile,
	sumColumnDigits,
	determineGammaRateBinary,
	determineEpsilonRateBinary,
	determinePowerConsumption,
	getMostCommonDigitForColumnByIndex,
	determineOxygenGeneratorRating,
	determineCO2ScrubberRating,
	runPart2
}