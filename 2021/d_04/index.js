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

	// markIndex() {
	// 	[63,[64],65].forEach(|e| => (tables[e.block][e.x][e.y])
	// }
	return indexTable
}


// RUN THE CHALLENGE

// pt1
// console.log('part 1: ', runPart1('input_final.txt'))

//pt 2
// console.log('part 2: ', runPart2('input_final.txt'))




module.exports = {
	generateInputFromFile,
	generateIndexTable
}