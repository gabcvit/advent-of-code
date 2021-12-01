const { it, expect } = require("@jest/globals")
const { generateInputFromFile, countAmountOfIncreases } = require("./index.js")


describe('Testing index functionaities', () => {
	it('should split the input file into a valid array of strings', () => {
		const inputArray = generateInputFromFile('input_example.txt')

		expect(inputArray.length).toBe(10)
	})

	it('should count corrently the amount of increases for an array', () => {
		const inputArray = generateInputFromFile('input_example.txt')
		const result = countAmountOfIncreases(inputArray)

		expect(result).toBe(7)
	})

	it('should not count any increases in a decreasing array', () => {
		const inputArray = ['3', '2', '1']
		const result = countAmountOfIncreases(inputArray)

		expect(result).toBe(0)
	})
})
