export class Idata {
    public data: Record<string, any>;

    constructor() {
        this.data = {};
    }

    getLength() {
        return Object.keys(this.data).length;
    }


    pushData(data: string) {
        if (typeof data !== 'string') {
            throw new Error('Data must be a string');
        }

        if (data.length !== 2) {
            throw new Error('Data must contain exactly one character and one number');
        }

        const key = data.charAt(0).toUpperCase();
        const digit = data.charAt(1);
        const value = Number(digit);

        if (!key.match(/[A-Z]/)) {
            throw new Error('First character must be a letter');
        }

        if (Number.isNaN(value) || value < 0) {
            throw new Error('Second character must be a non-negative digit');
        }

        this.data[key] = value;
    }


    displayData() {
        if (this.getLength() <= 0) {
            console.log('No data to display.');
            return;
        }

        const copyData = { ...this.data };

        while (true) {
            let maxKeyList: string[] = [];
            try {
                maxKeyList = this.findMaxData(copyData);
            } catch (error) {
                // print all key of copyData
                console.log(`${Object.keys(copyData).join(' ')} `);
                break;
            }

            let print: string = '';
            
            for (const [key, value] of Object.entries(copyData)) {
                if (maxKeyList.includes(key)) {
                    print += `*`;
                } else {
                    print += ' ';
                }
                print += ' ';
            }

            console.log(print);

            // decrement of max value
            for (const key of maxKeyList) {
                copyData[key] -= 1;
            }
        }
    }

    private findMaxData(copyData: Record<string, any>) {
        let maxKey: string[] = [];
        let maxValue: number = 0;

        for (const [key, value] of Object.entries(copyData)) {
            if (value > maxValue) {
                maxValue = value;
                maxKey = [key];
            } else if (value === 0) {
                continue;
            } else if (value === maxValue) {
                maxKey.push(key);
            }
        }

        if (maxKey.length === 0) {
            throw new Error('No data available to find max value');
        }

        return maxKey

    }
}

export function loopInput(idata: Idata = new Idata()) {

    while (true) {
        if (idata.getLength() >= 6) {
            console.log('Maximum data limit reached (6 items).');
            break;
        }

        const input = prompt('Enter a character and a digit (e.g., A1), or press Enter to finish:');
        
        if (input === null || input.trim() === '') {
            break;
        }

        try {
            idata.pushData(input);
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Error: ${error.message}`);
            } else {
                console.error('An unknown error occurred');
            }
        }
    }
}

function main() {
    const idata = new Idata();
    // loopInput(idata);

    idata.displayData();
}

if (import.meta.main) {
    main();
}