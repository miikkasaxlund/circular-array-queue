# Circular Array Queue

CircularArrayQueue provides a data structure in which items can be stored in an end-to-end connected fixed-size buffer.

<!--
## Table of Contents



## About CircularArrayQueue


[Link to docs]()

-->

## Installation

`npm install --save circular-array-queue`

## Usage

```javascript
// ECMAScript 6
import CircularArrayQueue from 'circular-array-queue'
// CommonJS
const CircularArrayQueue = require('circular-array-queue')

// Instantiate with size of 3 (defaults to 10)
const queue = new CircularArrayQueue(3)

// Enqueue items
queue.enqueue('item1')   // ['item1']
queue.enqueue('item2')   // ['item1', 'item2']
queue.enqueue('item3')   // ['item1', 'item2', 'item3']
queue.enqueue('item4')   // ['item4', 'item2', 'item3']

// Dequeue items
queue.dequeue()          // 'item4' <- ['item2', 'item3']
queue.dequeue()          // 'item2' <- ['item3']

// Peek item at head
queue.peek()             // 'item3'

// Check if the queue is full
queue.isFull()           // false
queue.isEmpty()          // false

// Get the current size of the queue
queue.getSize()

// Get the items in the queue
const items = queue.getItems()
```

## Links

- [Circular Buffer - Wikipedia](https://en.wikipedia.org/wiki/Circular_buffer)