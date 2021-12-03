const { it, expect } = require("@jest/globals")
const { generateInputFromFile, readCommand, runCommand, generateCommandsArray, runCommandsArray, multiplyAttributesOfSubmarine } = require("./index.js")


describe('Testing index functionaities', () => {
	it('part1: should split the input file into a valid array of strings', () => {
		const inputArray = generateInputFromFile('input_example.txt')

		expect(inputArray.length).toBe(6)
	})

	it('part1: should read the right command and pass the right parameter to it', () => {
		const commandMock = 'forward 5'
		const result = readCommand(commandMock)
		const expectedResult = {
			commandName: 'forward',
			value: 5
		}

		expect(result).toEqual(expectedResult)
	})


	it('part1: should read all the commands', () => {
		const inputArray = generateInputFromFile('input_example.txt')
		const commandsArray = generateCommandsArray(inputArray)
		const expectedResult = [
			{"commandName": "forward", "value": 5}, 
			{"commandName": "down", "value": 5}, 
			{"commandName": "forward", "value": 8}, 
			{"commandName": "up", "value": 3}, 
			{"commandName": "down", "value": 8}, 
			{"commandName": "forward", "value": 2}
		]

		expect(commandsArray).toEqual(expectedResult)
	})

	it('part1: should read all the commands', () => {
		const inputArray = generateInputFromFile('input_example.txt')
		const commandsArray = generateCommandsArray(inputArray)
		const expectedResult = [
			{"commandName": "forward", "value": 5}, 
			{"commandName": "down", "value": 5}, 
			{"commandName": "forward", "value": 8}, 
			{"commandName": "up", "value": 3}, 
			{"commandName": "down", "value": 8}, 
			{"commandName": "forward", "value": 2}
		]

		expect(commandsArray).toEqual(expectedResult)
	})

	it('part1: should match the exmaple', () => {
		const inputArray = generateInputFromFile('input_example.txt')
		const commandsArray = generateCommandsArray(inputArray)
		runCommandsArray(commandsArray)
		const result = multiplyAttributesOfSubmarine()

		const expectedResult = 150

		expect(result).toEqual(expectedResult)
	})


	it('part2: should match the exmaple', () => {
		const inputArray = generateInputFromFile('input_example.txt')
		const commandsArray = generateCommandsArray(inputArray)
		runCommandsArray(commandsArray, 2)
		const result = multiplyAttributesOfSubmarine()

		const expectedResult = 900

		expect(result).toBe(expectedResult)
	})
})
