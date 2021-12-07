var fs = require('fs');

const generateInputFromFile = (fileName) => {
	try {
		const data = fs.readFileSync(fileName, 'utf8');
		let rowsAsString = data.toString().split('\n')
		return {
			drawNumbers: rowsAsString[0].split(','),
			tables: generateTables(rowsAsString)
		}
	} catch(e) {
		console.log('Error:', e.stack);
	}
}

const generateTables = (rowsAsString) => {
	let tables = []
	let singleTable = []
	const regexpForMultipleSpaces = /\s\s+/g

	rowsAsString.splice(0, 1) // remove first entry, which are not the tables
	rowsAsString.forEach(singleRow => {
		if(singleRow !== '') {
			let match = singleRow.replace(regexpForMultipleSpaces, ' ')
								 	.split(' ')
									.filter(e => e !== '')
									.map(e => {
										return {value : parseInt(e), isMarked : false}
									})
			singleTable.push(match)
		} 
		
		if(singleTable.length === 5) {
			tables.push(singleTable)
			singleTable = []
		}
	})
	return tables
}

const generateIndexTable = (tables) => {
	let indexTable = []
	tables.forEach((singleTable, index) => {
		for (let x = 0; x < 5; x++) {
			for (let y = 0; y < 5; y++) {
				if(indexTable[singleTable[x][y].value]==null){
					indexTable[singleTable[x][y].value] = [];
				}
				indexTable[singleTable[x][y].value].push({block: index, x : x, y: y})
			}
		}
	})

	return indexTable
}


const checkColumnOfTableForBingo = (indexOfColumn, table) => {
	let isBingo = true;
	for (let i = 0; i < 5; i++) {
		isBingo = isBingo && table[i][indexOfColumn].isMarked;
	}

	return isBingo
}

const checkLineOfTableForBingo = (indexOfLine, table) => {
	let isBingo = true;
	for (let i = 0; i < 5; i++) {
		isBingo = isBingo && table[indexOfLine][i].isMarked;
	}
	return isBingo
}

const markNumberAndUpdateTables = (tables, indexedNumber) => {
	tables[indexedNumber.block][indexedNumber.x][indexedNumber.y].isMarked = true
	return tables
}

const checkIfBingo = (xOfFoundNumber, yOfFoundNumber, table) => {
	return checkLineOfTableForBingo(xOfFoundNumber, table) || checkColumnOfTableForBingo(yOfFoundNumber, table)
}

const getSumOfAllUnmarkedNumbers = (table) => {
	let sum = 0;
	table.forEach(row => {
		row.forEach(number => {
			if(!number.isMarked) {
				sum += number.value;
			}
		})
	})

	return sum
}

const solvePartOne = (filename) => {
	const inputObject = generateInputFromFile(filename)
	const bagOfNumbers = generateIndexTable(inputObject.tables)
	let indexOfBingoBlock = null;
	let lastNumber = null;
	for (let index = 0; index < inputObject.drawNumbers.length; index++) {
		for (let indexedNumber of bagOfNumbers[inputObject.drawNumbers[index]]) {
			inputObject.tables = markNumberAndUpdateTables(inputObject.tables, indexedNumber)

			if (checkIfBingo(indexedNumber.x, indexedNumber.y, inputObject.tables[indexedNumber.block])) {
				lastNumber = inputObject.drawNumbers[index];
				indexOfBingoBlock = indexedNumber.block
				break;
			}
		}
		if (indexOfBingoBlock !== null) {
			break;
		}
	}

	const sum = getSumOfAllUnmarkedNumbers(inputObject.tables[indexOfBingoBlock]);
	return sum * lastNumber
}

const solvePartTwo = (filename) => {
	const inputObject = generateInputFromFile(filename)
	const bagOfNumbers = generateIndexTable(inputObject.tables)

	let lastNumber = null;
	let bingoedTables = Array.apply(null, Array(5)).map(x => { return false; })
	let strigifiedLastStateOfTableWhenBingo = null

	for (let index = 0; index < inputObject.drawNumbers.length; index++) {
		for (let indexedNumber of bagOfNumbers[inputObject.drawNumbers[index]]) {
			inputObject.tables = markNumberAndUpdateTables(inputObject.tables, indexedNumber)

			if (!bingoedTables[indexedNumber.block] && checkIfBingo(indexedNumber.x, indexedNumber.y, inputObject.tables[indexedNumber.block])) {
				bingoedTables[indexedNumber.block] = true
				lastNumber = inputObject.drawNumbers[index];
				strigifiedLastStateOfTableWhenBingo = JSON.stringify(inputObject.tables[indexedNumber.block])
			}
		}
	}

	const sum = getSumOfAllUnmarkedNumbers(JSON.parse(strigifiedLastStateOfTableWhenBingo));
	return sum * lastNumber
}


// RUN THE CHALLENGE

// pt1
console.log('part 1: ', solvePartOne('input_final.txt'))

//pt 2
console.log('part 2: ', solvePartTwo('input_final.txt'))




module.exports = {
	generateInputFromFile,
	generateIndexTable,
	solvePartOne,
	solvePartTwo
}