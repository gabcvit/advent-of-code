const { it, expect } = require("@jest/globals")
const { generateInputFromFile } = require("./index.js")


describe('Testing index functionaities', () => {
	it('part1: should split the input file into a valid object', () => {
		const inputObject = generateInputFromFile('input_example.txt')

		expect(inputObject.drawNumbers.length).toBe(27) // 27 numbers to be drawn
		expect(inputObject.tables.length).toBe(3) // 3 bingo tables to be read
		expect(inputObject.tables[0].length).toBe(5) // 5 rows for each table
		expect(inputObject.tables[0][0].length).toBe(5) // 5 columns for each row (5x5 matrix)
	})

	
})
