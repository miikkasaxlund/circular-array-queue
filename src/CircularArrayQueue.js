class CircularArrayQueue {

  /**
   * Default constructor
   * @param {int} size 
   */
  constructor(size = 10, options = {
    overwrite: true
  }) {
    this.items = new Array(size).fill(null)
    this.maxSize = size
    this.currentSize = 0
    this.head = 0
    this.tail = 0
    this.settings = { ...options }
  }

  /**
   * PUBLIC METHODS
   */

  /**
   * Check if the queue is full
   * @returns {boolean} a boolean representing if the queue is full
   */
  isFull = () => {
    return (this.currentSize === this.maxSize)
  }

  /**
   * Check if the queue is empty
   * @returns {boolean} a boolean representing if the queue is empty
   */
  isEmpty = () => {
    return (this.currentSize === 0)
  }

  /**
   * Enqueue item in the array
   * @param {any} item the enqueued item
   * @returns {boolean} a boolean representing if the operation succeeded
   */
  enqueue = item => {
    try {
      if (
        !this.settings.overwrite &&
        this.isFull()
        ) throw new Error('Overwriting not allowed')
      // Increment head if the value to be overwritten is not null
      if (this.items[this.tail] != null) this._incrementHead()
      // Add the new item in the queue
      this._addItem(item)
      // Increment the current size
      this._incrementCurrentSize()
      this._incrementTail()
      // Return a value that indicates a succesful operation
      return true      
    } catch (e) {
      console.error(e)
    }
  }

  /**
   * Dequeue item from the array
   * @returns {any} The dequeued item
   */
  dequeue = () => {
    try {
      if ( this.isEmpty() ) return null
      // Get the item in the head
      let item = this._getItem()
      // Nullificate removed index
      this._nullHead()
      // Increment head pointer index
      this._incrementHead()
      // Decrement the current size
      this._decrementCurrentSize()
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
  peek = () => {
    if (this.isEmpty() || this.head < 0 || this.head >= this.maxSize) return null
    return this.items[this.head]
  }

  /**
   * Class utils
   */
  // Add the new item in the queue
  _addItem = item => {
    this.items[this.tail] = item
  }
  _getItem = () => {
    return this.items[this.head]
  }
  _nullHead = () => {
    this.items[this.head] = null
  }
  _resetPointers = () => {
    this.head = this.tail = 0
  }
  _incrementTail = () => {
    // Increment tail unless it overflows, in which case it is set to 0
    this.tail = (this.tail + 1) % this.maxSize
  }
  _incrementHead = () => {
    // Increment head unless it overflows, in which case it is set to 0
    this.head = (this.head + 1) % this.maxSize
  }
  _incrementCurrentSize = () => {
    this.currentSize = Math.min(this.currentSize + 1, this.maxSize)
  }
  _decrementCurrentSize = () => {
    // Decrement the current size
    this.currentSize = Math.max(this.currentSize - 1, 0)
  }
  /**
   * GETTERS
   */

  /**
   * Get the head index
   */
  getHead = () => {
    return this.head
  }

  /**
   * Get the tail index
   */
  getTail = () => {
    return this.tail
  }

  /**
   * Get the current size of the queue
   */
  getSize = () => {
    return this.currentSize
  }

  /**
   * Get the items in the queue
   */
  getItems = () => {
    return this.items
  }
}

module.exports = CircularArrayQueue