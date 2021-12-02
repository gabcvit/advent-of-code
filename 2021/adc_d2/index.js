var fs = require('fs');

const ACTION_FORWARD = 'forward'
const ACTION_UP = 'up'
const ACTION_DOWN = 'down'

let Submarine = {
	depth: 0,
	horizontalPosition: 0,
	aim: 0
}

const resetSubmarine = () => {
	Submarine = {
		depth: 0,
		horizontalPosition: 0,
		aim: 0
	}
}

const generateInputFromFile = (fileName) => {
	try {  
		var data = fs.readFileSync(fileName, 'utf8');
		return data.toString().split('\n')
	} catch(e) {
		console.log('Error:', e.stack);
	}
}

const readCommand = (fullCommandString) => {
	let splitArray = fullCommandString.split(' ')
	return {
		commandName: splitArray[0],
		value: parseInt(splitArray[1])
	}
}

const generateCommandsArray = (inputArray) => {
	return inputArray.map(singleInput => {
		return readCommand(singleInput)
	})
}

const runCommand = (commandName, value) => {
	if(commandName === ACTION_FORWARD) {
		Submarine.horizontalPosition = Submarine.horizontalPosition + value
	} else if(commandName === ACTION_DOWN) {
		Submarine.depth = Submarine.depth + value
	} else if(commandName === ACTION_UP) {
		Submarine.depth = Submarine.depth - value
	}
}

const runCommandPt2 = (commandName, value) => {
	if(commandName === ACTION_FORWARD) {
		Submarine.horizontalPosition += value
		Submarine.depth += Submarine.aim * value
	} else if(commandName === ACTION_DOWN) {
		Submarine.aim = Submarine.aim + value
	} else if(commandName === ACTION_UP) {
		Submarine.aim = Submarine.aim - value
	}
}

const runCommandsArray = (commandsArray, part = 1) => {
	if(part === 1) {
		return commandsArray.forEach(singleCommand => {
			runCommand(singleCommand.commandName, singleCommand.value)
		})
	} else {
		return commandsArray.forEach(singleCommand => {
			runCommandPt2(singleCommand.commandName, singleCommand.value)
		})
	}
	
}

const multiplyAttributesOfSubmarine = () => {
	return Submarine.horizontalPosition * Submarine.depth
}

// Running the results
const inputArray = generateInputFromFile('input_final.txt')
const commandsArray = generateCommandsArray(inputArray)

// pt1
runCommandsArray(commandsArray)
console.log('result of part 1:', multiplyAttributesOfSubmarine())

// pt2
resetSubmarine()
runCommandsArray(commandsArray, 2)
console.log('result of part 2:', multiplyAttributesOfSubmarine()) //1971232560

module.exports = {
	generateInputFromFile,
	readCommand,
	runCommand,
	generateCommandsArray,
	multiplyAttributesOfSubmarine,
	runCommandsArray
}