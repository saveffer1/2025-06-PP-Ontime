
function underline(text: string): string {
  const UNDERLINE = '\x1b[4m';
  const RESET     = '\x1b[0m';
  return `${UNDERLINE}${text}${RESET}`;
}

function doubleUnderline(text: string): string {
  const DOUBLE_UL = '\x1b[21m';
  const RESET     = '\x1b[0m';
  return `${DOUBLE_UL}${text}${RESET}`;
}

export class DecimalNumber {
    public value: number;
    constructor(value: number) {
        if (typeof value !== 'number' || isNaN(value)) {
            throw new Error('Invalid decimal number');
        }
        this.value = value;
    }

    private toHexadecimal(num: number): string {
        if (num < 0 || num > 15) {
            throw new Error('Number must be between 0 and 15');
        }
        
        const hexChars = 'ABCDEF';

        if (num < 10) {
            return num.toString();
        } else {
            const char = hexChars[num - 10];
            if (!char) {
                throw new Error('Invalid hexadecimal character');
            }
            return char;
        }
    }

    toHexadecimalString(): string {
        if (this.value < 0) {
            throw new Error('Negative numbers cannot be converted to hexadecimal');
        }
        
        let hexString = '';
        let num = this.value;

        while (num > 0) {
            const remainder = num % 16;
            hexString = this.toHexadecimal(remainder) + hexString;
            num = Math.floor(num / 16);
        }

        return hexString || '0';
    }

    displayHexadecimal() {
        if (this.value < 0) {
            throw new Error('Negative numbers cannot be converted to hexadecimal');
        }

        let hexString = '';
        let num = this.value;
        let remainder: number | null = null;
        const width = String(this.value).length;

        while (num > 0) {
            const numStr = String(num).padStart(width, ' ');
            const remStr = remainder === null ? ' ' : String(remainder);

            console.log(`16)${underline(numStr)} ${remStr}`);

            remainder = num % 16;
            hexString = this.toHexadecimal(remainder) + hexString;
            num = Math.floor(num / 16);
        }

        const numStr = String(num).padStart(width, ' ');
        console.log(`   ${doubleUnderline(numStr)} ${remainder}`);
        console.log(`\noutput ${hexString}`);
    }

}

function main() {
    const decimalNumber = new DecimalNumber(2077);
    decimalNumber.displayHexadecimal();
}

if (import.meta.main) {
    main();
}