export class NumberArray {
    private data: number[];
    private isSorted: boolean = false;

    constructor(data: number[]) {
        if (!Array.isArray(data) || !data.every(x => Number.isInteger(x) && x > 0)) {
            throw new Error('Invalid input: must be an array of positive integers');
        }
        this.data = data;
    }

    private merge(left: number[], right: number[]): number[] {
        let resultArray: number[] = [], leftIndex = 0, rightIndex = 0;

        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex]! > right[rightIndex]!) {
                resultArray.push(left[leftIndex]!);
                leftIndex++;
            } else {
                resultArray.push(right[rightIndex]!);
                rightIndex++;
            }
        }

        return resultArray
                .concat(left.slice(leftIndex))
                .concat(right.slice(rightIndex));
    }

    private mergeSort(arr: number[]): number[] {
        if (arr.length <= 1) {
            return arr;
        }

        const mid = Math.floor(arr.length / 2);
        const left = this.mergeSort(arr.slice(0, mid));
        const right = this.mergeSort(arr.slice(mid));

        return this.merge(right, left);
    }

    sortMaxToMin(): string {
        if (this.data.length === 0) {
            return '';
        }
        if (this.isSorted) {
            return this.data.join(' ');
        }
        this.data = this.mergeSort(this.data);
        this.isSorted = true;
        return this.data.join(' ');
    }

    div(): string {
        if (this.data.length === 0) {
            throw new Error('Array is empty, cannot compute max/min');
        }

        if (this.isSorted) {
            if (this.data[this.data.length - 1] === 0) {
                throw new Error('Division by zero is not allowed');
            }
            const value =  this.data[0]! / this.data[this.data.length - 1]!;
            return `${value.toFixed(2)}`;
        } else {
            const max = Math.max(...this.data);
            const min = Math.min(...this.data);
            if (min === 0) {
                throw new Error('Division by zero is not allowed');
            }
            const value = Math.ceil(max / min);
            return `${value.toFixed(2)}`;
        }
    }
}


function main() {
    const input = prompt('Enter postive integer separated by a space:');
    if (input === null || input.trim() === '') {
    console.error('No input provided. Exiting.');
    return;
    }

    const str = input.trim().split(/\s+/);
    const data: number[] = str.map(Number);

    let numberArray: NumberArray;
    try {
        numberArray = new NumberArray(data);
    } catch (err: any) {
        console.error(err.message);
        return;
    }

    const sortedData = numberArray.sortMaxToMin();
    console.log('Sorting (Max-to-Min):', sortedData);
    console.log('Max/Min:', numberArray.div());
} 

if (import.meta.main) {
  main();
}