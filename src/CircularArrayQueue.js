export default class CircularArrayQueue {

  /**
   * Default constructor
   * @param {int} size 
   */
  constructor(size = 10) {
    this.items = []
    this.maxSize = size
    this.currentSize = 0
    this.head = -1
    this.tail = -1
  }

  /**
   * Check if the queue is full
   * @returns {boolean} a boolean representing if the queue is full
   */
  isFull() {
    return (this.currentSize === this.maxSize)
  }

  /**
   * Check if the queue is empty
   * @returns {boolean} a boolean representing if the queue is empty
   */
  isEmpty() {
    return (this.currentSize === 0)
  }

  /**
   * Enqueue item in the array
   * @param {any} item the enqueued item
   * @returns {boolean} a boolean representing if the operation succeeded
   */
  enqueue(item) {
    try {
      // Return false if the queue is full
      if (this.isFull()) return false
      // Position the head and tail pointers to 0
      if (this.isEmpty()) head = tail = 0
      // Increment tail unless it overflows, in which case it is set to 0
      else this.tail = (this.tail + 1) % this.maxSize
      // Add the new item in the queue
      this.items[this.tail] = item
      // Increment the current size
      this.currentSize++
      // Return a value that indicates a succesful operation
      return true      
    } catch (e) {
      console.error(e)
    }
  }

  /**
   * Dequeue item from the array
   * @returns {any|boolean} The dequeued item, false if the queue is empty
   */
  dequeue() {
    try {
      // Return false if the queue is empty
      if (this.isEmpty()) return false
      // Get the item in the head
      let item = this.items[this.head]
      // Adjust head & tail values accordingly
      if (this.head === this.tail) this.head = this.tail = -1
      else this.head = (this.head + 1) % this.maxSize
      // Decrement the current size
      this.currentSize--
      // Return the dequeued item
      return item
    } catch (e) {
      console.error(e)
    }
  }

  /**
   * Peek at the value at the head of the queue
   * @returns {any|null} The item at head, null if the queue is empty
   */
  peek() {
    if (this.isEmpty() || this.head < 0 || this.head >= this.maxSize) return null
    return this.items[this.head]
  }

  static serialize(circularArray) {

  }

  static deserialize() {

  }
}