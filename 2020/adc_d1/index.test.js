const { it, expect } = require("@jest/globals")
const { generateInputFromFile, findTwoNumbersThatSumToValue, multiplyNumbersOfArray, findThreeNumbersThatSumToValue } = require("./index.js")


describe('Testing index functionaities', () => {
	it('scope: should split the input file into a valid array of strings', () => {
		const inputArray = generateInputFromFile('input_example.txt')

		expect(inputArray.length).toBe(10)
	})

	it('part1: should find the two numbers that sum to 2020', () => {
		const inputArray = generateInputFromFile('input_example.txt')
		const result = findTwoNumbersThatSumToValue(inputArray)
		const expectedResult = [1721, 299]

		expect(result).toEqual(expectedResult)
	})

	it('part1: should multiply numbers of array', () => {
		const inputArray = [3, 2]
		const inputArray2 = [5, 10]
		const inputArray3 = [9, 0]
		const result = multiplyNumbersOfArray(inputArray)
		const result2 = multiplyNumbersOfArray(inputArray2)
		const result3 = multiplyNumbersOfArray(inputArray3)

		expect(result).toBe(3 * 2)
		expect(result2).toBe(5 * 10)
		expect(result3).toBe(9 * 0)
	})

	it('part1: should match example', () => {
		const inputArray = generateInputFromFile('input_example.txt')
		const numbersFound = findTwoNumbersThatSumToValue(inputArray)
		const result = multiplyNumbersOfArray(numbersFound)
		const expectedResult = 514579

		expect(result).toBe(expectedResult)
	})

	it('part2: should match example', () => {
		const inputArray = generateInputFromFile('input_example.txt')
		const numbersFound = findThreeNumbersThatSumToValue(inputArray)
		const result = multiplyNumbersOfArray(numbersFound)
		const expectedResult = 241861950

		expect(result).toBe(expectedResult)
	})
})
