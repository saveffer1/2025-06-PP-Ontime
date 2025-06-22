import { describe, test, expect } from "bun:test";
import { ATM } from "../index";

describe("ATM.deposit method", () => {
  test("initial balance is set correctly", () => {
    const atm = new ATM(10, 20, 80);
    expect(atm.getBalance()).toBe(28000);
    const notes = atm.getAllBanknotes();
    expect(notes).toEqual({ bank1000: 10, bank500: 20, bank100: 80 });
  });

  test("successful deposit reduces banknotes and updates balance", () => {
    const atm = new ATM(10, 20, 80);
    atm.deposit(18700);
    expect(atm.getBalance()).toBe(9300);
    const details = (atm as any).depositDetails;
    expect(details.length).toBe(1);
    expect(details[0]).toEqual({ amount: 18700, bank1000: 10, bank500: 17, bank100: 2 });
  });

  test("deposit zero or negative amount throws error", () => {
    const atm = new ATM(1, 1, 1);
    expect(() => atm.deposit(0)).toThrow();
    expect(() => atm.deposit(-100)).toThrow();
  });

  test("deposit amount not divisible by available denominations throws error", () => {
    const atm = new ATM(0, 0, 5);
    expect(() => atm.deposit(250)).toThrow("Cannot dispense this amount with available banknotes.");
  });

  test("deposit amount exceeds stock of larger notes uses smaller ones when possible", () => {
    const atm = new ATM(1, 0, 10);
    atm.deposit(1200);
    expect(atm.getBalance()).toBe((1 - 1) * 1000 + (0) * 500 + (10 - 2) * 100);
    const notes = atm.getAllBanknotes();
    expect(notes).toEqual({ bank1000: 0, bank500: 0, bank100: 8 });
  });

  test("deposit amount cannot be fulfilled with mixed stock throws error", () => {
    const atm = new ATM(2, 1, 2);
    expect(() => atm.deposit(3000)).toThrow("Cannot dispense this amount with available banknotes.");
  });
});
