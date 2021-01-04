/**
 * Circular Array Queue Implementation
 * @packageDocumentation
 */

interface Options {
  overwrite?: boolean
}

/**
 * CircularArrayQueue
 * 
 * ```
 * // ES6 import
 * import CircularArrayQueue from 'circular-array-queue'
 * // CommonJS import
 * const CircularArrayQueue = require('circular-array-queue')
 * 
 * // Initialize with default size (10)
 * const queue = new CircularArrayQueue()
 * // Initialize with predefined size
 * const queue = new CircularArrayQueue(15)
 * // Initialize with size and options
 * const queue = new CircularArrayQueue(15, { overwrite: true })
 * ```
 */
class CircularArrayQueue<T> {

  /**
   * PRIVATE PROPERTIES
   */

  private readonly _queue: Array<T|null>
  private readonly _size: number
  private readonly _settings?: Options
  private _count: number
  private _head: number
  private _tail: number

  /**
   * Default constructor
   */
  constructor(size: number = 10,options?: Options) {
    this._queue = [...new Array<T>(size)].map(() => null)
    this._size = size
    this._count = 0
    this._head = 0
    this._tail = 0
    this._settings = options
  }

  /**
   * PUBLIC METHODS
   */

  /**
   * Check if the queue is full
   * 
   * ```
   * if (queue.isFull()) console.log('Queue is full')
   * ```
   */
  public isFull(): boolean {
    return (this._count === this._size)
  }

  /**
   * Check if the queue is empty
   * 
   * ```
   * if (queue.isEmpty()) console.log('Queue is empty')
   * ```
   */
  public isEmpty(): boolean {
    return (this._count === 0)
  }

  /**
   * Enqueue item in the array
   * 
   * ```
   * const item = { message: 'Hello' }
   * queue.enqueue(item) // Returns a boolean value
   * ```
   */
  public enqueue(item: any): boolean {
    try {
      if (!this._settings?.overwrite && this.isFull()) 
        throw new Error('Overwriting not allowed')
      // Increment head if the value to be overwritten is not null
      if (this.items[this._tail] != null)
        this._incrementHead()
      // Add the new item in the queue
      this._addItem(item)
      // Increment the current size
      this._incrementCount()
      this._incrementTail()
      // Return a value that indicates a succesful operation
      return true      
    } catch (e) {
      console.error(e)
      return false
    }
  }

  /**
   * Dequeue item from the array
   * 
   * ```
   * const item = queue.dequeue()
   * ```
   */
  public dequeue(): T | null {
    try {
      if (this.isEmpty())
        throw new Error('Queue empty')
      let item = this._getItem()
      this._nullHead()
      this._incrementHead()
      this._decrementCount()
      return item
    } catch (e) {
      console.error(e)
      return null
    }
  }

  /**
   * Peek at the value at the head of the queue
   * 
   * ```
   * const nextInLine = queue.peek() 
   * ```
   */
  public peek(): T | null {
    return this._queue[this._head]
  }

  /**
   * Clear the queue
   */
  public clear(): void {
    let i: number
    for (i = 0; i < this._size; i++) {
      this._queue[i] = null
    }
    this._resetProps()
  }

  /**
   * PRIVATE METHODS
   */

  /**
   * Adds an item in tail location in the queue
   */
  private _addItem(item: T): void {
    this._queue[this._tail] = item
  }

  /**
   * Returns an item from the head location in the queue
   */
  private _getItem(): T | null {
    return this._queue[this._head]
  }

  /**
   * Nullificate the location of head in the queue
   */
  private _nullHead(): void {
    this._queue[this._head] = null
  }

  /**
   * Reset head, tail and count to 0
   */
  private _resetProps(): void {
    this._head = this._tail = this._count = 0
  }

  /**
   * Increment tail by one
   * 
   * If the tail tries to overflow the queue,
   * it is set to 0
   */
  private _incrementTail(): void {
    // Increment tail unless it overflows, in which case it is set to 0
    this._tail = (this._tail + 1) % this._size
  }

  /**
   * Increment head by one
   * 
   * If the head tries to overflow the queue,
   * it is set to 0
   */
  private _incrementHead(): void {
    this._head = (this._head + 1) % this._size
  }

  /**
   * Increment count by one
   * 
   * If the count tries to overflow the queue,
   * it is set to the maximum value
   */
  private _incrementCount(): void {
    this._count = Math.min(this._count + 1, this._size)
  }

  /**
   * Decrement count by one
   * 
   * If the count tries to underflow array,
   * it is set to the minimun value of 0
   */
  private _decrementCount():void {
    this._count = Math.max(this._count - 1, 0)
  }

  /**
   * GETTERS
   */

  /**
   * Get the head index
   */
  get head(): number { return this._head }

  /**
   * Get the tail index
   */
  get tail(): number { return this._tail }

  /**
   * Get the count of items in the queue
   */
  get count(): number { return this._count }

  /**
   * Get the items in the queue
   */
  get items(): Array<T|null> { return this._queue }

  /**
   * Get the size of the queue
   */
  get size(): number { return this._size }
}

export = CircularArrayQueue