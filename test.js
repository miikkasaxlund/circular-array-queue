const CircularArrayQueue = require('./src/CircularArrayQueue')

let n = 1
const queue = new CircularArrayQueue(3)

const printQueue = (q, note = '') => {
  try {
    items = q.getItems()
    console.log(`------start printQueue-----`)
    console.log('Print operation #', n)
    console.info('Note:', note)
    console.table(items)
    console.log('Head:', q.getHead())
    console.log('Tail:', q.getTail())
    console.log('Size:', q.getSize())
    console.log(`------end printQueue-----`)
    n++
  } catch (e) {
    console.error(e)
  }
}

// Try to print an empty queue
printQueue(queue, 'Print an empty queue')

// Print a queue with 1 item
queue.enqueue('item1')
printQueue(queue, 'Print a queue with 1 item')

// Print a queue with 2 items
queue.enqueue('item2')
printQueue(queue, 'Print a queue with 2 items')

// Print a full queue
queue.enqueue('item3')
printQueue(queue, 'Print a full queue')

// Overflow and print queue
queue.enqueue('item4')
printQueue(queue, 'Overflow and print queue')

// Continue overflow
queue.enqueue('item5')
printQueue(queue, 'Continue overflow')

// Second overflow
queue.enqueue('item6')
queue.enqueue('item7')
printQueue(queue, 'Second overflow')

// Dequeue an item
queue.dequeue()
printQueue(queue, 'Dequeue an item')