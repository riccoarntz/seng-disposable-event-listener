export type Listener = EventListenerOrEventListenerObject;

export interface EventDispatcher {
  addEventListener(type: string, listener: Listener, useCapture?: boolean): void;
  removeEventListener(type: string, listener: Listener, useCapture?: boolean): void;
}

/**
 * The DisposableEventListener is a wrapper around the native addEventListener method,
 * which makes it easier to remove the handlers. By destructing this object, the listener is removed.
 *
 * @example
 * ```
 * // Add a resize listener on the window
 * const resizeListener:DisposableEventListener = new DisposableEventListener(window, "resize", this.handleResize);
 *
 * // remove the resize listener
 * resizeListener.destruct();
 * ```
 *
 * @class DisposableEventListener
 */

export default class DisposableEventListener {
  private disposed = false;

  /**
   * Add an event listener on a HTML element.
   *
   * @param {EventDispatcher} eventDispatcher the HTML element to listen to.
   * @param {string} type the type of event to listen to.
   * @param {Listener} listener the method which is called when the eventDispatcher dispatches an event to the
   * specified type
   * @param {boolean} useCapture If true, useCapture indicates that the user wishes to initiate capture. After
   * initiating capture, all events of the specified type will be dispatched to the registered listener before being
   * dispatched to any EventTarget beneath it in the DOM tree. Events which are bubbling upward through the tree will
   * not trigger a listener designated to use capture.
   */
  constructor(
    public readonly eventDispatcher: EventDispatcher,
    public readonly type: string,
    public readonly listener: Listener,
    public readonly useCapture?: boolean,
  ) {
    eventDispatcher.addEventListener(type, listener, useCapture);
  }

  /**
   * After {@link dispose} has been called, this method returns true.
   * Use this method to determine whether dispose() should be run again.
   */
  public isDisposed(): boolean {
    return this.disposed;
  }

  /**
   * Removes the event listener on the HTML element
   */
  public dispose(): void {
    this.eventDispatcher.removeEventListener(this.type, this.listener, this.useCapture);
    this.disposed = true;
  }
}
