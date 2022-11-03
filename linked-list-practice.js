class Node {
    constructor(value) {
        this.value = value
        this.next = null
    }
}
class LinkedList {
    constructor(head = null) {
        this.head = head
    }
    append(value) {
        var newNode = new Node(value);
        var current;
        if (this.head == null) {
            this.head = newNode;
        } else {
            current = this.head;
            while (current.next) {
                current = current.next
            }
            current.next = newNode;
        }
    }
    prepend(value) {
        var newNode = new Node(value);
        if (this.head == null) {
            this.head = newNode;
        } else { 
            let oldHead = this.head;
            this.head = newNode;
            console.log(oldHead);
            newNode.next = oldHead;
        }
    }
    size() {
        let tally = 0;
        if (this.head == null) {
            return tally;
        }
        var current = this.head
        if (current) {
            tally++;
        };
        while (current.next) {
            tally++;
            current = current.next;
        }
        return tally;
    }
    findHead() {
        return this.head;
    }
    findTail() {
        let current = this.head;
        if (current == null) {
            return null;
        } else {
            while (current.next) {
                current = current.next;
            }
            return current;
        }
    }
    at(index) {
        let current = this.head;
        if (index == 0) {
            return current
        }
        for (let i = 1; i <= index; i++) {
            current = current.next;
        }
        return current
    }
    pop() {
        let current = this.head;
        let currentNext = current.next
        if (!this.head.next) {
            this.head = null;
        }
        while (current.next) {
            if (currentNext.next) {
                currentNext = currentNext.next;
                current = current.next;
            } else {
                current.next = null;
            }
        }
        
    }
    contains(val) {
        let current = this.head;
        while (current) {
            if (current.value == val) {
                return true;
            }
            current = current.next;
        }
        return false;
    }
    find(val) {
        let current = this.head;
        let tally = 0;
        while (current) {
            if (current.value == val) {
                return tally;
            }
            current = current.next;
            tally++;
        }
        return null;
    }
    toString() {
        let current = this.head;
        let string;
        if (current) {
            string = current.value + "->";
            current = current.next;
        }
        while (current) {
            string = string + current.value + "->";
            current = current.next;
        }
        console.log(string + "null");
    } 
}
let l = new LinkedList;
l.append("first");
l.append("second");
l.append("third");
l.toString();


