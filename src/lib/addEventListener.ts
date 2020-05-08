/**
 * Wrapper function around the native addEventListener method, which makes it easier to remove.
 * By calling the return function, the listener is removed.
 *
 * @param {EventTarget} eventDispatcher the HTML element to listen to.
 * @param {string} type the type of event to listen to.
 * @param {Function} listener the method which is called when the eventDispatcher dispatches an event to the
 * specified type
 * @param {boolean | EventListenerOptions} options If true, useCapture indicates that the user wishes to initiate capture. After
 * initiating capture, all events of the specified type will be dispatched to the registered listener before being
 * dispatched to any EventTarget beneath it in the DOM tree. Events which are bubbling upward through the tree will
 * not trigger a listener designated to use capture.
 *
 * @example
 * ```
 * // Add a resize listener on the window
 * const resizeListener = addEventListener(window, "resize", this.handleResize);
 *
 * // remove the resize listener
 * resizeListener();
 * ```
 */

function addEventListener<K extends keyof WindowEventMap, T extends EventTarget>(
  eventDispatcher: T,
  type: K | string,
  listener: (this: T, ev: WindowEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions,
) {
  eventDispatcher.addEventListener(type, listener as EventListenerOrEventListenerObject, options);

  return () => {
    eventDispatcher.removeEventListener(
      type,
      listener as EventListenerOrEventListenerObject,
      options,
    );
  };
}

export default addEventListener;
