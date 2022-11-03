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
class Node {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
    }
}
function buildTree(array) {
    let endIndex = array.length - 1;
    if (0 > endIndex) { return }
    else {
        let mid = parseInt(array.length / 2);
        let root = new Node(array[mid]);
        root.left = buildTree(array.slice(0, mid));
        root.right = buildTree(array.slice(mid + 1));
        return root;
    }
}
class Tree {
    constructor(array) {
        this.baseArray = array;
        this.root = buildTree(mergeSort(array));
    }
    insert(value) {
        let newArray = this.baseArray;
        newArray.push(value);
        this.root = buildTree(mergeSort(newArray));
    };
    delete(value) {
        let newArray = this.baseArray.splice(this.baseArray.indexOf(value), 1);
    }
}


let arr = [1, 4, 6]
let tree = new Tree(arr);
tree.delete(1);
tree;