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

const markAllPositionOf = (number, bagOfNumbers, tables) => {

	bagOfNumbers[number].forEach(indexedNumber => {
		tables[indexedNumber.block][indexedNumber.x][indexedNumber.y].isMarked = true
	})

	return tables
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

const findBingoBlock = (tables) => {
	let indexOfBingoBlock = null

	tables.forEach( (table, index) => {
		for (let x = 0; x < 5; x++) {
			if(table[x][0].isMarked === true) {
				if (checkLineOfTableForBingo(x, table)) {
					indexOfBingoBlock = index;
					break;
				 }
			}
		}
		for (let y = 0; y < 5; y++) {
			if(table[0][y].isMarked === true) {
				if (checkColumnOfTableForBingo(y,table)) {
					indexOfBingoBlock = index;
					break;
				}
			}
		}
	})
	// find block that has a full line or a full column with isMarked == true
	return indexOfBingoBlock;
}

const solvePartOne = (filename) => {
	const inputObject = generateInputFromFile(filename)
	const bagOfNumbers = generateIndexTable(inputObject.tables)
	let indexOfBingoBlock = null;
	let lastNumber = null;
	for (let index = 0; index < inputObject.drawNumbers.length; index++) {
		inputObject.tables = markAllPositionOf(inputObject.drawNumbers[index],bagOfNumbers, inputObject.tables);
		indexOfBingoBlock = findBingoBlock(inputObject.tables);
		lastNumber = inputObject.drawNumbers[index];
		if ( indexOfBingoBlock !== null) {
			break;
		}
	}

	let sum = 0;
	inputObject.tables[indexOfBingoBlock].forEach(row => {
		row.forEach(number => {
			if(!number.isMarked) {
				sum += number.value;
			}
		})
	})
	// console.log("Bingonumber: " + lastNumber + "BingoBlock: " + indexOfBingoBlock)
	return sum * lastNumber
}

const solvePartTwo = (filename) => {

	return 0
}


// RUN THE CHALLENGE

// pt1
console.log('part 1: ', solvePartOne('input_final.txt'))

//pt 2
// console.log('part 2: ', solvePartTwo('input_final.txt'))




module.exports = {
	generateInputFromFile,
	generateIndexTable,
	markAllPositionOf,
	findBingoBlock,
	solvePartOne,
	solvePartTwo
}