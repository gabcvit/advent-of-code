const { it, expect } = require("@jest/globals")
const { generateInputFromFile, sumColumnDigits, determineGammaRateBinary, determineEpsilonRateBinary, determinePowerConsumption, getMostCommonDigitForColumnByIndex, determineOxygenGeneratorRating, determineCO2ScrubberRating, runPart2 } = require("./index.js")


describe('Testing index functionaities', () => {
	it('part1: should split the input file into a valid array of strings', () => {
		const inputArray = generateInputFromFile('input_example.txt')
		console.log(inputArray)
		expect(inputArray.length).toBe(12)
	})

	it('part1: should return the sum for every column', () => {
		const inputArray = ['00100', '11110', '10110']
		const expectedResult = [2, 1, 3, 2, 0]
		const result = sumColumnDigits(inputArray)
		expect(result).toEqual(expectedResult)
	})

	it('part1: should return the most common digit for every column', () => {
		const inputArray = [2, 1, 3, 2, 0]
		const lengthOfInputArray = 3
		const expectedResult = '10110'
		const result = determineGammaRateBinary(inputArray, lengthOfInputArray)

		expect(result).toBe(expectedResult)
	})

	it('part1: should generate epsilon rate binary out of gamma rate binary', () => {
		const gammaRateBinary = '10110'
		const expectedResult = '01001'
		const result = determineEpsilonRateBinary(gammaRateBinary)

		expect(result).toBe(expectedResult)
	})

	it('part1: should pass the example', () => {
		const inputArray = generateInputFromFile('input_example.txt')
		const summedDigits = sumColumnDigits(inputArray)
		const gammaRateBinary = determineGammaRateBinary(summedDigits, inputArray.length)
		const epsilonRateBinary = determineEpsilonRateBinary(gammaRateBinary)
		const result = determinePowerConsumption(gammaRateBinary, epsilonRateBinary)

		const expectedResult = 198

		expect(result).toBe(expectedResult)
	})

	it('part2: should determine most common digit of a single column', () => {
		const inputArray = ['00100', '11110', '10110']
		const index = 0
		const result = getMostCommonDigitForColumnByIndex(inputArray, index)
		
		const expectedResult = '1'

		expect(result).toBe(expectedResult)
	})

	it('part2: should determine the oxygen generator rating', () => {
		const inputArray = generateInputFromFile('input_example.txt')
		const result = determineOxygenGeneratorRating(inputArray)
		
		const expectedResult = 23

		expect(result).toBe(expectedResult)
	})

	it('part2: should determine the CO2 scrubber rating', () => {
		const inputArray = generateInputFromFile('input_example.txt')
		const result = determineCO2ScrubberRating(inputArray)
		
		const expectedResult = 10

		expect(result).toBe(expectedResult)
	})

	it('part2: should pass the example', () => {
		const result = runPart2('input_example.txt')
		const expectedResult = 230

		expect(result).toBe(expectedResult)
	})




	
})
