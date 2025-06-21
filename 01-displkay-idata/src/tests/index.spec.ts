import { describe, test, spyOn, expect } from "bun:test";
import { Idata } from "../index";

describe("Idata Tests", () => {
    test("should print data correctly", () => {
        const idata = new Idata();
        idata.data = {'A': 5, 'B': 8, 'C': 3, 'D': 1, 'E': 6};

        const consoleSpy = spyOn(console, 'log');
        idata.displayData();
        expect(consoleSpy).toHaveBeenCalledWith('  *       ');
        expect(consoleSpy).toHaveBeenCalledWith('  *       ');
        expect(consoleSpy).toHaveBeenCalledWith('  *     * ');
        expect(consoleSpy).toHaveBeenCalledWith('* *     * ');
        expect(consoleSpy).toHaveBeenCalledWith('* *     * ');
        expect(consoleSpy).toHaveBeenCalledWith('* * *   * ');
        expect(consoleSpy).toHaveBeenCalledWith('* * * * * ');
        expect(consoleSpy).toHaveBeenCalledWith('A B C D E ');
    });

    test("should handle all 0 values", () => {
        const idata = new Idata();
        idata.data = {'A': 0, 'B': 0, 'C': 0, 'D': 0, 'E': 0};
        const consoleSpy = spyOn(console, 'log');
        idata.displayData();
        expect(consoleSpy).toHaveBeenCalledWith('A B C D E ');
    });

    test("should handle empty data", () => {
        const idata = new Idata();
        idata.data = {};

        const consoleSpy = spyOn(console, 'log');
        idata.displayData();
        expect(consoleSpy).toHaveBeenCalledWith('No data to display.');
    });
});