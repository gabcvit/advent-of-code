var fs = require('fs');

const generateInputFromFile = (fileName) => {
	try {
		var data = fs.readFileSync(fileName, 'utf8');
		return data.toString().split('\n').map(singleLine => {
			return extractDataFromLine(singleLine)
		})
	} catch (e) {
		console.log('Error:', e.stack);
	}
}

const extractDataFromLine = (line) => {
	let match = line.match(/([0-9]+)-([0-9]+) ([a-z]): ([a-z]+)/)

	return {
		lowestNumber: parseInt(match[1]),
		highestNumber: parseInt(match[2]),
		letter: match[3],
		password: match[4]
	}
}

const checkPasswordPt1 = (commandToRun) => {
	let regex = new RegExp( commandToRun.letter, 'g' )
	const amountOfMatches = commandToRun.password.match(regex)
	return amountOfMatches && 
			amountOfMatches.length >= commandToRun.lowestNumber && 
				amountOfMatches.length <= commandToRun.highestNumber
}

const checkPasswordPt2 = (commandToRun) => {
	return checkIfLetterIsInCorrectIndexOfText(commandToRun.password, commandToRun.letter, commandToRun.lowestNumber - 1) ^ // ^ == XOR case
			checkIfLetterIsInCorrectIndexOfText(commandToRun.password, commandToRun.letter, commandToRun.highestNumber - 1)
}

const checkIfLetterIsInCorrectIndexOfText = (text, letter, index) => {
	return text[index] === letter
}

const countAllCorrectPasswords = (commandsToRun, filterFunction) => {
	return commandsToRun.filter(singleCommand => filterFunction(singleCommand)).length
}

const runPart1 = (commandsToRun) => {
	return countAllCorrectPasswords(commandsToRun, checkPasswordPt1)
}

const runPart2 = (commandsToRun) => {
	return countAllCorrectPasswords(commandsToRun, checkPasswordPt2)
}


let inputArray = generateInputFromFile('input_final.txt')

// pt 1
console.log('result of part 1:', runPart1(inputArray))

// pt 2
inputArray = generateInputFromFile('input_final.txt')
console.log('result of part 2:', runPart2(inputArray)) 


module.exports = {
	generateInputFromFile,
	extractDataFromLine,
	checkPasswordPt1,
	checkPasswordPt2,
	runPart1,
	runPart2,
	countAllCorrectPasswords
}