const CircularArrayQueue = require('../src')

describe('CircularQueueArray ->', () => {

  describe('Enqueue a new item ->', () => {

    test('Returns true if succeeded, false otherwise', () => {
      const queue = new CircularArrayQueue(1)
      expect(queue.enqueue('Item 1')).toBe(true)
      expect(queue.enqueue()).toBe(false)
    })
  
    test('Tail increments in circular manner', () => {
      const queue = new CircularArrayQueue(3)
      expect(queue.tail).toBe(0)
      queue.enqueue('Item 1')
      expect(queue.tail).toBe(1)
      queue.enqueue('Item 2')
      queue.enqueue('Item 3')
      expect(queue.tail).toBe(0)
    })

    test('Head is incrementent on overwrites', () => {
      const queue = new CircularArrayQueue(3)
      expect(queue.head).toBe(0)
      queue.enqueue('Item 1')
      queue.enqueue('Item 2')
      queue.enqueue('Item 3')
      queue.enqueue('Item 4')
      expect(queue.head).toBe(1)
    })

    test('Count gives the correct amount on enqueues', () => {
      const queue = new CircularArrayQueue(3)
      expect(queue.count).toBe(0)
      queue.enqueue('Item 1')
      queue.enqueue('Item 2')
      queue.enqueue('Item 3')
      expect(queue.count).toBe(3)
      queue.enqueue('Item 4')
      expect(queue.count).toBe(3)
    })

  })

  describe('Dequeue an item ->', () => {
    
    test('Returns the item if succesful, null otherwise', () => {
      const queue = new CircularArrayQueue(2)
      queue.enqueue('Item 1')
      expect(queue.dequeue()).toBe('Item 1')
      expect(queue.dequeue()).toBe(null)
    })

    test('Head increments in circular manner', () => {
      const queue = new CircularArrayQueue(3)
      expect(queue.head).toBe(0)
      queue.enqueue('Item 1')
      queue.enqueue('Item 2')
      queue.enqueue('Item 3')
      queue.dequeue()
      expect(queue.head).toBe(1)
      queue.dequeue()
      queue.dequeue()
      expect(queue.head).toBe(0)
    })

    test('Count gives the correct amount on dequeues', () => {
      const queue = new CircularArrayQueue(2)
      queue.enqueue('Item 1')
      queue.enqueue('Item 2')
      expect(queue.count).toBe(2)
      queue.dequeue()
      expect(queue.count).toBe(1)
      queue.dequeue()
      expect(queue.count).toBe(0)
    })

    test('Dequeued items are nullified in the queue', () => {
      const queue = new CircularArrayQueue(2)
      queue.enqueue('Item 1')
      expect(queue.items[0]).toBe('Item 1')
      queue.dequeue()
      expect(queue.items[0]).toBe(null)
    })

  })

  describe('Fill & Clear queue ->', () => {

    test('Fill the queue with items with fill', () => {
      const queue = new CircularArrayQueue(3)
      const items = ['Item 1', 'Item 2', 'Item 3']
      queue.fill(items)
      expect(queue.items).toEqual(expect.arrayContaining(items))
    })

    test('Fill increments tail in circular manner', () => {
      const queue = new CircularArrayQueue(3)
      const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']
      queue.fill(items)
      expect(queue.tail).toBe(2)
    })

    test('Clear nullificates items in the queue', () => {
      const queue = new CircularArrayQueue(3)
      const items = ['Item 1', 'Item 2', 'Item 3']
      queue.fill(items)
      expect(queue.items).toEqual(expect.arrayContaining(items))
      queue.clear()
      expect(queue.items).toEqual(expect.arrayContaining([null,null,null]))
    })

    test('Clear resets head and tail to the beginning', () => {
      const queue = new CircularArrayQueue(3)
      const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']
      queue.fill(items)
      expect(queue.tail).toBe(1)
      queue.dequeue()
      // Head is expected to be 2 because overwriting increments it
      expect(queue.head).toBe(2)
      queue.clear()
      expect(queue.head).toBe(0)
      expect(queue.tail).toBe(0)
    })

  })

  describe('Settings functionality ->', () => {

    test('options.overwrite = false prevents overwriting values in the queue', () => {
      const queue = new CircularArrayQueue(3, { overwrite: false })
      const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']
      queue.fill(items)
      expect(queue.items).toEqual(expect.arrayContaining( ['Item 1', 'Item 2', 'Item 3']))
    })

  })

})
