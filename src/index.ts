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
 * // Initialize with size and overwrite prevention
 * const queue = new CircularArrayQueue(15, { overwrite: false })
 * ```
 */
class CircularArrayQueue<T> {

  /**
   * PRIVATE PROPERTIES
   */

  /** 
   * Array for storing the items in the queue
   * 
   * @internal 
   */
  private readonly _queue: Array<T|null>
  /** 
   * Size of the queue
   * 
   * @internal 
   */
  private readonly _size: number
  /** 
   * Settings object
   * 
   * @internal 
   */
  private readonly _settings?: Options
  /** 
   * Current count of items in the queue
   * 
   * @internal 
   */
  private _count: number
  /** 
   * Read pointer index
   * 
   * @internal 
   */
  private _head: number
  /** 
   * Write pointer index
   * 
   * @internal 
   */
  private _tail: number

  /**
   * Default constructor
   * 
   * Size minimum value is 2
   */
  constructor(size: number = 10, options: Options = {
    overwrite: true
  }) {
    this._queue = [...new Array<T>(size)].map(() => null)
    this._size = size < 2 ? 2 : size
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
   * 
   * @category Public methods
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
   * 
   * @category Public methods
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
   * 
   * @category Public methods
   */
  public enqueue(item: T): boolean {
    try {
      if (!item) throw new Error('No empty values')
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
      return (this.items[this._tail - 1] === item)
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
   * 
   * @category Public methods
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
   * Peek at the value at the head of the queue without removing it
   * 
   * ```
   * const nextInLine = queue.peek() 
   * ```
   * 
   * @category Public methods
   */
  public peek(): T | null {
    return this._queue[this._head]
  }

  /**
   * Clear the queue
   * 
   * @category Public methods
   */
  public clear(): void {
    let i: number
    for (i = 0; i < this._size; i++) {
      this._queue[i] = null
    }
    this._resetProps()
  }

  /**
   * Fill the queue
   * 
   * @category Public methods
   */
  public fill(newItems: Array<T>): void {
    newItems.forEach(newItem => {
      this.enqueue(newItem)
    })
  }

  /**
   * PRIVATE METHODS
   */

  /**
   * Adds an item in tail location in the queue
   * 
   * @internal
   */
  private _addItem(item: T): void {
    this._queue[this._tail] = item
  }

  /**
   * Returns an item from the head location in the queue
   * 
   * @internal
   */
  private _getItem(): T | null {
    return this._queue[this._head]
  }

  /**
   * Nullificate the location of head in the queue
   * 
   * @internal
   */
  private _nullHead(): void {
    this._queue[this._head] = null
  }

  /**
   * Reset head, tail and count to 0
   * 
   * @internal
   */
  private _resetProps(): void {
    this._head = this._tail = this._count = 0
  }

  /**
   * Increment tail by one
   * 
   * If the tail tries to overflow the queue,
   * it is set to 0
   * 
   * @internal
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
   * 
   * @internal
   */
  private _incrementHead(): void {
    this._head = (this._head + 1) % this._size
  }

  /**
   * Increment count by one
   * 
   * If the count tries to overflow the queue,
   * it is set to the maximum value
   * 
   * @internal
   */
  private _incrementCount(): void {
    this._count = Math.min(this._count + 1, this._size)
  }

  /**
   * Decrement count by one
   * 
   * If the count tries to underflow array,
   * it is set to the minimun value of 0
   * 
   * @internal
   */
  private _decrementCount():void {
    this._count = Math.max(this._count - 1, 0)
  }

  /**
   * GETTERS
   */

  /**
   * Get the head index
   * 
   * @category Getters
   */
  get head(): number { return this._head }

  /**
   * Get the tail index
   * 
   * @category Getters
   */
  get tail(): number { return this._tail }

  /**
   * Get the count of items in the queue
   * 
   * @category Getters
   */
  get count(): number { return this._count }

  /**
   * Get the items in the queue
   * 
   * @category Getters
   */
  get items(): Array<T|null> { return this._queue }

  /**
   * Get the size of the queue
   * 
   * @category Getters
   */
  get size(): number { return this._size }
}

export = CircularArrayQueue