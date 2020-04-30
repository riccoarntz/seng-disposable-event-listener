export type EventDispatcher = Pick<Element, 'addEventListener' | 'removeEventListener'>;

type AddEventListenerParameters = Parameters<EventDispatcher['addEventListener']>;

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
  public readonly eventDispatcher: EventDispatcher;
  public readonly type: AddEventListenerParameters[0];
  public readonly listener: AddEventListenerParameters[1];
  public readonly options?: AddEventListenerParameters[2];

  private disposed = false;

  /**
   * Add an event listener on a HTML element.
   *
   * @param {EventDispatcher} eventDispatcher the HTML element to listen to.
   * @param {string} type the type of event to listen to.
   * @param {Function} listener the method which is called when the eventDispatcher dispatches an event to the
   * specified type
   * @param {boolean | EventListenerOptions} options If true, useCapture indicates that the user wishes to initiate capture. After
   * initiating capture, all events of the specified type will be dispatched to the registered listener before being
   * dispatched to any EventTarget beneath it in the DOM tree. Events which are bubbling upward through the tree will
   * not trigger a listener designated to use capture.
   */
  constructor(
    eventDispatcher: EventDispatcher,
    type: AddEventListenerParameters[0],
    listener: AddEventListenerParameters[1],
    options?: AddEventListenerParameters[2],
  ) {
    this.eventDispatcher = eventDispatcher;
    this.type = type;
    this.listener = listener;
    this.options = options;

    this.eventDispatcher.addEventListener(type, listener, options);
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
    this.eventDispatcher.removeEventListener(this.type, this.listener, this.options);
    this.disposed = true;
  }
}
