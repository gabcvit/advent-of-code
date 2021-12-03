const { it, expect } = require("@jest/globals")
const { generateInputFromFile, countAmountOfIncreases, generateThreeMeasurementSlidingWindow } = require("./index.js")


describe('Testing index functionaities', () => {
	it('part1: should split the input file into a valid array of strings', () => {
		const inputArray = generateInputFromFile('input_example.txt')

		expect(inputArray.length).toBe(10)
	})

	it('part1: should count corrently the amount of increases for an array', () => {
		const inputArray = generateInputFromFile('input_example.txt')
		const result = countAmountOfIncreases(inputArray)

		expect(result).toBe(7)
	})

	it('part1: should not count any increases in a decreasing array', () => {
		const inputArray = [3, 2, 1]
		const result = countAmountOfIncreases(inputArray)

		expect(result).toBe(0)
	})

	it('part2: should generate a consistent array of three-measurement sliding window', () => {
		const inputArray = generateInputFromFile('input_example.txt')
		const result = generateThreeMeasurementSlidingWindow(inputArray)
		const expectedResult = [607, 618, 618, 617, 647, 716, 769, 792]

		expect(result).toEqual(expectedResult)
	})

	it('part2: should show the same result as the example', () => {
		const inputArray = generateInputFromFile('input_example.txt')
		const treatedArray = generateThreeMeasurementSlidingWindow(inputArray)
		const result = countAmountOfIncreases(treatedArray)
		const expectedResult = 5

		expect(result).toBe(expectedResult)
	})
})
