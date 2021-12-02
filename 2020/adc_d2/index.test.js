const { it, expect } = require("@jest/globals")
const { generateInputFromFile, extractDataFromLine, checkPasswordPt1, checkPasswordPt2, runPart1, runPart2, countAllCorrectPasswords } = require("./index.js")


describe('Testing index functionaities', () => {
	it('scope: should split the input file into a valid array of strings', () => {
		const inputArray = generateInputFromFile('input_example.txt')

		expect(inputArray.length).toBe(3)
	})

	it('scope: should match the command correctly', () => {
		const line = '1-3 a: abcde'
		const result = extractDataFromLine(line)
		const expectedResult = {
			lowestNumber: 1,
			highestNumber: 3,
			letter: 'a',
			password: 'abcde'
		}

		expect(result).toEqual(expectedResult)
	})

	it('scope: should check if password is correct', () => {
		const commandMock = {
			lowestNumber: 1,
			highestNumber: 3,
			letter: 'a',
			password: 'abcde'
		}

		const commandMock2 = {
			lowestNumber: 1,
			highestNumber: 3,
			letter: 'a',
			password: 'abcdeaaa'
		}

		const result1 = checkPasswordPt1(commandMock)
		const result2 = checkPasswordPt1(commandMock2)

		expect(result1).toBe(true)
		expect(result2).toBe(false)
	})

	it('part1: should count the right amount of correct passwords', () => {
		const inputArray = [
			{ lowestNumber: 1, highestNumber: 3, letter: 'a', password: 'abcde' },
			{ lowestNumber: 1, highestNumber: 3, letter: 'a', password: 'abcdeaaa' },
			{ lowestNumber: 2, highestNumber: 3, letter: 'a', password: 'abcdea' },
		]
		const result = countAllCorrectPasswords(inputArray, checkPasswordPt1)
		const expectedResult = 2

		expect(result).toBe(expectedResult)
	})

	it('part1: should pass the example', () => {
		const inputArray = generateInputFromFile('input_example.txt')
		const result = runPart1(inputArray,)
		const expectedResult = 2

		expect(result).toBe(expectedResult)
	})

	it('part2: should count the right amount of correct passwords', () => {
		const inputArray = [
			{ lowestNumber: 1, highestNumber: 3, letter: 'a', password: 'abcde' },
			{ lowestNumber: 1, highestNumber: 3, letter: 'b', password: 'cdefg' },
			{ lowestNumber: 2, highestNumber: 9, letter: 'c', password: 'ccccccccc' },
		]
		const result = countAllCorrectPasswords(inputArray, checkPasswordPt2)
		const expectedResult = 1

		expect(result).toBe(expectedResult)
	})

	it('part2: should pass the example', () => {
		const inputArray = generateInputFromFile('input_example.txt')
		const result = runPart2(inputArray)
		const expectedResult = 1

		expect(result).toBe(expectedResult)
	})

})
