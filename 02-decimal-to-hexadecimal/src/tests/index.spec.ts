import { describe, test, spyOn, expect } from "bun:test";
import { DecimalNumber } from "../index";

describe("DecimaltoHexadecimal", () => {
    test("should convert decimal to hexadecimal", () => {
        const decimal = new DecimalNumber(2077);
        const hexString = decimal.toHexadecimalString();
        expect(hexString).toBe("81D");
        
        const consoleSpy = spyOn(console, "log").mockImplementation(() => {});
        decimal.displayHexadecimal();
        expect(consoleSpy).toHaveBeenCalledTimes(5);
        expect(consoleSpy).toHaveBeenNthCalledWith(1,`16)\x1b[4m2077\x1b[0m  `);
        expect(consoleSpy).toHaveBeenNthCalledWith(2,`16)\x1b[4m 129\x1b[0m 13`);
        expect(consoleSpy).toHaveBeenNthCalledWith(3,`16)\x1b[4m   8\x1b[0m 1`);
        expect(consoleSpy).toHaveBeenNthCalledWith(4,`   \u001B[21m   0\u001B[0m 8`);
        expect(consoleSpy).toHaveBeenNthCalledWith(5,`\noutput 81D`);
    });

    test("should handle negative numbers", () => {
        const decimal = new DecimalNumber(-10);
        expect(() => decimal.toHexadecimalString()).toThrow('Negative numbers cannot be converted to hexadecimal');
        expect(() => decimal.displayHexadecimal()).toThrow('Negative numbers cannot be converted to hexadecimal');
    });
});