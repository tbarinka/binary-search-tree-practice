
function sumRange(n, total = 0) {
    if (n <= 0) { return total }
    else return sumRange(n - 1, total + n);
}

function power(base, exp) {
    if (exp == 0) {
        return 1
    } else if (exp == 1) {
        return base
    } else {
        return base * power(base, exp - 1); 
    }
}

function factorial(num) {
    if (num == 1) {
        return 1;
    } else {
        return num * factorial(num - 1);
    }
}

function all(array, cb) {
    if (array.length == 0) { return true }
    else if (cb(array[0])) {
        return all(array.slice(1), cb);
    } else return false;
}

function productOfArray(array) {
    if (array.length == 1) return array[0] 
    else return array[0] * productOfArray(array.slice(1));
}

function parse(array, total = 0) {
    if (array.length == 0) return total;

    if (Number.isInteger(array[0])) {
        array.shift()
        return parse(array, total + 1)
    } else if (!Array.isArray(array[0]) && !Number.isInteger(array[0])) {
        array.shift()
        return parse(array, total)
    } else if (Array.isArray(array[0])) {
        let subtotal = parse(array.shift());
        return parse(array, total + subtotal);
    }
}

function fibs(num, array = [0]) {
    let n = 1;
    for (let i = 0; i <= num; i++) {
        n += (n - 1) + (n);
        array.push(n);
    }
    return array;
}

//each number is the sum of the two preceding ones

function fibs(num, array = [0, 1]) {
    for (let i = 2; i <= num; i++) {
        let copy = array.slice();
        let n1 = copy.pop();
        let n2 = copy.pop();
        array.push(n1 + n2);
    }
    return array;
}

function recFibs(num, array = [0, 1]) {
    if (num == 0) return array;

    else {
        let copy = array.slice();
        let n1 = copy.pop();
        let n2 = copy.pop();
        return recFibs(num - 1, array.push(n1 + n2));
    }
}

//merge sort
//if array[first] < array[last]
    //1. split the array --> A1 & A2
            //halveArray(array);
    //2. take left array
            //halveArray(array)[0];

        //if A0's iFirst < iLast
            //1. split the array --> A1 & A2
            //2. take left array
        //if A0's iFirst == iLast
            //1. merge A0 & A1

        //if A1's iFirst < iLast
            //1. split the array --> A1 & A2
            //2. take left array
        //if A1's iFirst == iLast
            //1. merge A0 & A1

                //Merge
                //1. Compare A1[0] to A2[0]
                //2. Select lowest value V from relevant array A
                //3. A3.push(A.shift());

    //3. take right array
            //halveArray(array)[1];

//base case


//suite of functions for recursive mergeSort
function halveArray(array) {
    let arrayHalf = array.length / 2;
    return [array.slice(0, arrayHalf), array.slice(arrayHalf)]
}

function mergeArray(array1, array2) {
    let newArray = [];
    let loops = array1.length + array2.length;
    for (let i = 0; i < loops; i++) {
        if (array2.length == 0) {
            newArray.push(array1.shift());
        }
        else if (array1[0] < array2[0]) {
            newArray.push(array1.shift());
        } else {
            newArray.push(array2.shift());
        }
    }
    return newArray;
}

function mergeSort(array) {
    if (halveArray(array)[0].length == 1 && halveArray(array)[1].length == 1) {
        if (halveArray(array)[1][0] < halveArray(array)[0][0]) {
            return [halveArray(array)[1][0], halveArray(array)[0][0]]
        } else {
            return array
        }
    } else if (halveArray(array)[0].length > 1 && halveArray(array)[1].length == 1) {
        return mergeArray(mergeSort(halveArray(array)[0]), halveArray(array)[1]);
    } else if (halveArray(array)[0].length == 1 && halveArray(array)[1].length > 1) { 
        return mergeArray(mergeSort(halveArray(array)[1]), halveArray(array)[0]);
    } else {
        return mergeArray(mergeSort(halveArray(array)[0]), mergeSort(halveArray(array)[1]));
    }
}

mergeSort([3, 1, 5, 4, 6, 2]);

//1. find the middle element of the array
    //make it the root of the tree;
//2. then perform the same operation on the left subarray
    //for the root’s left child
//3. and the same operation on the right subarray
    //for the root’s right child.