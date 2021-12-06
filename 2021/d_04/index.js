var fs = require('fs');

const generateInputFromFile = (fileName) => {
	try {  
		var data = fs.readFileSync(fileName, 'utf8');
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
	console.log(rowsAsString)

	rowsAsString.splice(0, 1) // remove first entry, whichare not the tables
	rowsAsString.forEach(singleRow => {
		if(singleRow !== '') {
			let match = singleRow.replace(regexpForMultipleSpaces, ' ')
								 	.split(' ')
									.filter(e => e !== '')
									.map(e => {value = e, isMarked = false});
			singleTable.push(match)
		} 
		
		if(singleTable.length === 5) {
			tables.push(singleTable)
			singleTable = []
		}
	})
	return tables
}


// RUN THE CHALLENGE

// pt1
// console.log('part 1: ', runPart1('input_final.txt'))

//pt 2
// console.log('part 2: ', runPart2('input_final.txt'))




module.exports = {
	generateInputFromFile
}