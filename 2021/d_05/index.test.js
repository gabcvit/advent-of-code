const { it, expect } = require("@jest/globals")
const { generateInputFromFile, getPointsCoveredByVector, generateHashMap, getAllCrossroadsFromHashMap, solvePartOne } = require("./index.js")


describe('Testing index functionaities', () => {
	it('part1: should split the input file into a valid array', () => {
		const inputArray = generateInputFromFile('input_example.txt')
		const expectedFirstElement = { x1: 0, y1: 9, x2: 5, y2: 9 }
		console.log(inputArray)
		expect(inputArray.length).toBe(10)
		expect(inputArray[0]).toEqual(expectedFirstElement)
	})

	it('part1: should return a valid array of points to be incremented for a vector', () => {
		const vector = { x1: 1, y1: 9, x2: 0, y2: 9 }
		const result = getPointsCoveredByVector(vector)
		const expectedResult = ['0-9', '1-9', '2-9', '3-9', '4-9', '5-9']

		console.log(result)
		expect(result).toEqual(expectedResult)
	})

	it('part1: should add all point coordinates into a hash map', () => {
		const points = ['1-1','1-2','1-3','0-3','0-2','0-1']
		const hashMap = new Map()
		generateHashMap(points, hashMap)

		let expectedResult = new Map()
		expectedResult.set('1-1', 1);
		expectedResult.set('1-2', 1);
		expectedResult.set('1-3', 1);
		expectedResult.set('0-3', 1);
		expectedResult.set('0-2', 1);
		expectedResult.set('0-1', 1);

		expect(hashMap).toEqual(expectedResult)
	})

	it('part1: count all crossroads', () => {
		let hashMap = new Map()
		hashMap.set('1-1', 1);
		hashMap.set('1-2', 2);
		hashMap.set('1-3', 2);
		hashMap.set('0-3', 1);
		hashMap.set('0-2', 1);
		hashMap.set('0-1', 3);

		const result = getAllCrossroadsFromHashMap(hashMap)

		expect(result).toBe(3)
	})

	it('part1: should pass example', () => {
		const result = solvePartOne('input_final.txt')
		const expectedResult = 5

		expect(result).toBe(expectedResult)
	})



})
