export default class EventEmitter extends null {
  constructor() {
    this._events = new Events();
    this._eventsCounts = 0;
  }

  /**
   *
   * Return an array of all event's names/types
   *
   * @returns {(Array|null)}
   * @public
   */
  eventsNames() {
    if (!this._eventsCounts) return null;
    return Object.keys(this._events);
  }

  /**
   * return all listeners of a given event if it exist, else null.
   *
   * @param {String} evnt The event name.
   * @returns {(Array|null)}
   * @public
   */
  eventListeners(evnt) {
    if (!this._events[evnt]) return null;
    const listeners = this._events[evnt].map((listener) => listener.fn);
    return listeners;
  }

  /**
   * Add new event if it doesn't exist, else add it to existing one
   *
   * @param {String} evnt The event name.
   * @param {Function} fn The Callback / Listener function
   * @param {boolean} once If Callback / Listener should run once
   * @public
   */
  addListener(evnt, fn, once) {
    if (typeof fn !== "function") {
      throw new TypeError(`listener "${fn}" is not a function`);
    }
    const lo = new LO(fn, once);

    if (!this._events[evnt]) {
      this._events[evnt] = [lo];
      this._eventsCounts++;
    } else {
      this._events[evnt].push(lo);
    }
  }

  /**
   * Remove listeners of a given event. All listenres that match the Callback fn
   * will be removed
   *
   * @param {String} evnt The event name.
   * @param {Function} fn Function to identify the listener with.
   * @public
   */
  removeListener(evnt, fn) {
    if (!this._events[evnt]) return;
    const l = this.eventListeners(evnt).reduce((acc, f, i) => {
      if (f.toString() === fn.toString()) return [...acc, i];
      return acc;
    }, []);

    /*
     * The loop iterates over the indexes in descending order,
     * to avoid changing the index of the elements that have not been removed yet.
     */

    let order = l.length - 1;
    for (order; order >= 0; order--) {
      this._events[evnt].splice(l[order], 1);
    }
  }

  /**
   * Removes the event and all its listeners.
   *
   * @param {string} evnt The event name.
   * @public
   */
  clearEvent(evnt) {
    if (!this._events[evnt]) {
      throw new Error(`no event with the name "${evnt}"`);
    }
    if (--this._eventsCounts === 0) {
      this._events = new Events();
    } else {
      delete this._events[evnt];
    }
  }
  /**
   * Add a listener
   *
   * @param {string} evnt The event name.
   * @param {fn} fn The Callbacl function
   * @public
   */
  on(evnt, fn) {
    if (!fn) {
      throw new Error(`missing callback function`);
    }
    return this.addListener(evnt, fn, false);
  }

  once(evnt, fn) {
    return this.addListener(evnt, fn, true);
  }

  /**
   * Calls all listenres of a given event.
   *
   * @param {String} evnt The event name.
   * @returns {Boolean} `true` if the event had listeners, else `false`.
   * @public
   */
  emit(evnt) {
    if (!this._events[evnt]) return flase;

    const args = [...arguments].splice(1);
    try {
      this._events[evnt].forEach((listener) => {
        if (listener.once) {
          console.log("once event"); // Still missing
        } else {
          listener.fn(...args);
        }
      });
    } catch (error) {
      throw new Error(error);
    }
    return true;
  }
}
Object.setPrototypeOf(EventEmitter, class {}); // Removing prototype chain

class Events extends null {
  constructor() {
    super();
  }
  [Symbol.iterator] = () => {
    let i = 0;
    const evnts = Object.values(this);
    return {
      next() {
        if (i < evnts.length) {
          return { value: evnts[i++], done: false };
        } else {
          return { done: true };
        }
      },
    };
  };
}
Object.setPrototypeOf(Events, class {});

class LO extends null {
  // Listener Object
  constructor(fn, once) {
    super();
    this.fn = fn;
    this.once = once || false;
  }
}
Object.setPrototypeOf(LO, class {});

// Allows the EventEmitter function object to be used as a module namespace
// when it is imported into another module.

EventEmitter.EventEmitter = EventEmitter;

if (typeof module !== "undefined") module.exports = EventEmitter;
