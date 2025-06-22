export class ATM {
    private balance: number;
    private bank1000: number;
    private bank500: number;
    private bank100: number;
    private initialBalance: number;
    private initialBanknotes: { bank1000: number, bank500: number, bank100: number };
    private depositDetails: { amount: number, bank1000: number, bank500: number, bank100: number }[] = [];

    constructor(bank1000: number, bank500: number, bank100: number) {
        this.balance = 0;
        this.bank1000 = 0;
        this.bank500 = 0;
        this.bank100 = 0;

        this.updateBalance(bank1000, bank500, bank100);

        this.initialBalance = this.balance;
        this.initialBanknotes = {
            bank1000: this.bank1000,
            bank500: this.bank500,
            bank100: this.bank100
        };
    }

    getBalance(): number {
        return this.balance;
    }

    getAllBanknotes(): { bank1000: number, bank500: number, bank100: number } {
        return {
            bank1000: this.bank1000,
            bank500: this.bank500,
            bank100: this.bank100
        };
    }

    updateBalance(bank1000: number, bank500: number = 0, bank100: number = 0) {
        this.bank1000 += bank1000;
        this.bank500 += bank500;
        this.bank100 += bank100;
        this.balance = ((this.bank1000 * 1000) + (this.bank500 * 500) + (this.bank100 * 100));
    }

    deposit(amount: number) {
        if (amount <= 0) {
        throw new Error("Amount must be greater than zero.");
        }

        let remainingAmount = amount;

        const need1000 = Math.floor(remainingAmount / 1000);
        const use1000 = Math.min(need1000, this.bank1000);
        remainingAmount -= use1000 * 1000;

        const need500 = Math.floor(remainingAmount / 500);
        const use500 = Math.min(need500, this.bank500);
        remainingAmount -= use500 * 500;

        const need100 = Math.floor(remainingAmount / 100);
        const use100 = Math.min(need100, this.bank100);
        remainingAmount -= use100 * 100;

        if (remainingAmount > 0) {
            throw new Error("Cannot dispense this amount with available banknotes.");
        }

        this.updateBalance(-use1000, -use500, -use100);

        this.depositDetails.push({ amount, bank1000: use1000, bank500: use500, bank100: use100 });
    }


    displayDepositDetails() {
        const nf = new Intl.NumberFormat('th-TH');
        const rows = this.depositDetails.map((r, idx) => ({
            'เบิกครั้งที่': String(idx + 1),
            'จำนวน (บาท)': nf.format(r.amount),
            'ธนบัตร 1,000': r.bank1000,
            'ธนบัตร 500': r.bank500,
            'ธนบัตร 100': r.bank100,
        }));

        rows.push({
            'เบิกครั้งที่': 'เงินเริ่มต้น',
            'จำนวน (บาท)': nf.format(this.initialBalance),
            'ธนบัตร 1,000': this.initialBanknotes.bank1000,
            'ธนบัตร 500': this.initialBanknotes.bank500,
            'ธนบัตร 100': this.initialBanknotes.bank100,
        });

        rows.push({
            'เบิกครั้งที่': 'เงินคงเหลือ',
            'จำนวน (บาท)': nf.format(this.getBalance()),
            'ธนบัตร 1,000': this.bank1000,
            'ธนบัตร 500': this.bank500,
            'ธนบัตร 100': this.bank100,
        });

        console.table(rows);
    }
}

function main() {
    const atm = new ATM(10, 20, 80);

    while (true) {
        const input = prompt("Enter amount to deposit (or 'exit' to quit): ");
        if (input === null || input.trim() === '') {
            console.log("No input provided. Exiting...");
            atm.displayDepositDetails();
            break;
        } else if (input === 'exit') {
            console.log("Exiting ATM. Final balance:", atm.getBalance());
            atm.displayDepositDetails();
            break;
        } else if (!Number(input)) {
            console.error("Invalid input. Please enter a valid number.");
            continue;
        }

        const amount = parseInt(input, 10);
        try {
            atm.deposit(amount);
            console.log(`Deposited: ${amount}. New balance: ${atm.getBalance()}`);
        } catch (error) {
            console.log("Cannot deposit this amount");
            console.log(`Try again. Current ATM balance: ${atm.getBalance()}`);
            atm.displayDepositDetails();
            break;
        }
    }


}


if (import.meta.main) {
  main();
}