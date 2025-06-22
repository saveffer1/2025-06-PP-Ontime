import { describe, test, spyOn, expect } from "bun:test";
import { NumberArray } from "../index";

describe("Test NumberArray class", () => {
    test("with zero in the array throws error", () => {
        expect(() => new NumberArray([10, 0])).toThrow('Invalid input: must be an array of positive integers');
    });

    test("sortMaxToMin with empty array", () => {
        const numberArray = new NumberArray([]);
        expect(numberArray.sortMaxToMin()).toBe('');
    });

    test("sortMaxToMin with already sorted array", () => {
        const numberArray = new NumberArray([5, 4, 3, 2, 1]);
        expect(numberArray.sortMaxToMin()).toBe('5 4 3 2 1');
    });

    test("sortMaxToMin with unsorted array", () => {
        const numberArray = new NumberArray([3, 1, 4, 2]);
        expect(numberArray.sortMaxToMin()).toBe('4 3 2 1');
    });

    test("sortMaxToMin with negative numbers", () => {
        expect(() => new NumberArray([-1, -3, -2])).toThrow('Invalid input: must be an array of positive integers');
    });

    test("div with empty array throws error", () => {
        const numberArray = new NumberArray([]);
        expect(() => numberArray.div()).toThrow('Array is empty, cannot compute max/min');
    });

    test("div with sorted array without zero", () => {
        const numberArray = new NumberArray([10, 5, 2]);
        expect(numberArray.div()).toBe('5.00');
    });

    test("div with unsorted array without zero", () => {
        const numberArray = new NumberArray([2, 10, 5]);
        expect(numberArray.div()).toBe('5.00');
    });
});
