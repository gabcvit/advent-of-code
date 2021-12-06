const { it, expect } = require("@jest/globals")
const { generateInputFromFile,generateIndexTable } = require("./index.js")


describe('Testing index functionaities', () => {
	it('part1: should split the input file into a valid object', () => {
		const inputObject = generateInputFromFile('input_example.txt')

		expect(inputObject.drawNumbers.length).toBe(27) // 27 numbers to be drawn
		expect(inputObject.tables.length).toBe(3) // 3 bingo tables to be read
		expect(inputObject.tables[0].length).toBe(5) // 5 rows for each table
		expect(inputObject.tables[0][0].length).toBe(5)// 5 columns for each row (5x5 matrix)
		expect(inputObject.tables[0][0][0].isMarked).toBe(false)// Flag for first position
		expect(inputObject.tables[0][0][0].value).toBe(22)// Value for first position
		expect(inputObject.tables[0][4][4].value).toBe(19)// Value for last position in first block
	})

	it('part1: should return a array with position of numbers', () => {
		const inputObject = generateInputFromFile('input_example.txt')
		const bagOfNumbers = generateIndexTable(inputObject.tables)

		expect(bagOfNumbers.length).toBe(27)
		expect(bagOfNumbers[7][0].x).toBe(2)
		expect(bagOfNumbers[7][0].y).toBe(4) 
		expect(bagOfNumbers[7][0].block).toBe(0)
	})





})
