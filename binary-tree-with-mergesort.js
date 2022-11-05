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
    find(value, node = this.root) {
        if (node == null || node.value == value) return node;
        if (node.value < value) {
        return this.find(value, node.right);
        } else {
        return this.find(value, node.left);
        }
    }
    breadthFirstSearch() {
    // create a queue and a variable to store the values of nodes visited  
        let queue = []
        let result = []
    // initiate a node variable to store the current node
        let node 
    // push the root node to the queue   
        queue.push(this.root)
    // loop as long as there is anything in the queue
    while(queue.length){
    // dequeue a node from the queue 
    // push the visited node into the result
        node = queue.shift()
        result.push(node)
        // push children to the queue
        if(node.left) queue.push(node.left)
        if(node.right) queue.push(node.right)
           
    }
    //return final traversed nodes array
    return result 
    }
    levelOrder(func, node = this.root) {
        let array = this.breadthFirstSearch();
        array.forEach(element => func(element.value));
    }
    preOrder(func, node = this.root) {
        let queue = [];
        let queue2 = [];
        while (node) {  
            queue.push(node);
            if (node.right) {
                queue2.push(node.right);
            }
            node = node.left;
        }
        if (node == null) {
            while (queue2[0]) {
                node = queue2.pop();
                while (node) {  
                    queue.push(node);
                    if (node.right) {
                        queue2.push(node.right);
                    }
                    node = node.left;
                }
            }
        }
        queue.forEach(element => func(element.value));
    }
    inOrder(func, node = this.root) {
        let queue = [];
        let queue2 = [];
        let result = []
        if (node == null) { return }
        else {
            while (node.left) {
                queue.push(node);
                queue2.push(node.right);
                node = node.left
            }
            result.push(node);
            node = queue.pop();
            while (queue.length >= 1) {
                result.push(node);
                if (!node.right.left) {
                    result.push(queue2.pop());
                }
                else {
                    let newRoot = queue2.pop();
                    while (newRoot.left) {
                        queue.push(newRoot);
                        queue2.push(newRoot.right);
                        newRoot = newRoot.left
                    }
                    result.push(newRoot);
                }
                node = queue.pop();
            }
            result.push(node);
            while (queue2.length >= 1) {
                let newRoot = queue2.pop();
                while (newRoot.left) {
                    queue.push(newRoot);
                    queue2.push(newRoot.right);
                    newRoot = newRoot.left
                }
                result.push(newRoot);
                let temp = queue.pop();
                result.push(temp);
                //while (temp.right) {
                    //result.push(temp);
                    //if (!temp.right.left) {
                        //result.push(queue2.pop());
                    }
                    //else {
                        //climb down left subtree
                    //}
                    //let temp = queue.pop();
                //}
            //}
            //result.push(node.right);
            func(queue);
            func(queue2);
            func(result);
        }
    }
}

function log(x) {
    console.log(x);
}

let arr = [50, 4, 10, 15, 22, 70, 18, 24, 25, 35, 31, 44, 66, 90, 12]
let tree = new Tree(arr);
tree.inOrder(log);