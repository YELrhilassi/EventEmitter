"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventEmitter = function (_ref) {
  _inherits(EventEmitter, _ref);

  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    var _this = _possibleConstructorReturn(this, (EventEmitter.__proto__ || Object.getPrototypeOf(EventEmitter)).call(this));

    _this._events = new Events();
    _this._eventsCounts = 0;
    return _this;
  }

  /**
   *
   * Return an array of all event's names/types
   *
   * @returns {(Array|null)}
   * @public
   */


  _createClass(EventEmitter, [{
    key: "eventsNames",
    value: function eventsNames() {
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

  }, {
    key: "eventListeners",
    value: function eventListeners(evnt) {
      if (!this._events[evnt]) return null;
      var listeners = this._events[evnt].map(function (listener) {
        return listener.fn;
      });
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

  }, {
    key: "addListener",
    value: function addListener(evnt, fn, once) {
      if (typeof fn !== "function") {
        throw new TypeError("listener \"" + fn + "\" is not a function");
      }
      var lo = new LO(fn, once);

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

  }, {
    key: "removeListener",
    value: function removeListener(evnt, fn) {
      if (!this._events[evnt]) return;
      var l = this.eventListeners(evnt).reduce(function (acc, f, i) {
        if (f.toString() === fn.toString()) return [].concat(_toConsumableArray(acc), [i]);
        return acc;
      }, []);

      /*
       * The loop iterates over the indexes in descending order,
       * to avoid changing the index of the elements that have not been removed yet.
       */

      var order = l.length - 1;
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

  }, {
    key: "clearEvent",
    value: function clearEvent(evnt) {
      if (!this._events[evnt]) {
        throw new Error("no event with the name \"" + evnt + "\"");
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

  }, {
    key: "on",
    value: function on(evnt, fn) {
      if (!fn) {
        throw new Error("missing callback function");
      }
      return this.addListener(evnt, fn, false);
    }
  }, {
    key: "once",
    value: function once(evnt, fn) {
      return this.addListener(evnt, fn, true);
    }

    /**
     * Calls all listenres of a given event.
     *
     * @param {String} evnt The event name.
     * @returns {Boolean} `true` if the event had listeners, else `false`.
     * @public
     */

  }, {
    key: "emit",
    value: function emit(evnt) {
      if (!this._events[evnt]) return flase;

      var args = [].concat(Array.prototype.slice.call(arguments)).splice(1);
      try {
        this._events[evnt].forEach(function (listener) {
          if (listener.once) {
            console.log("once event"); // Still missing
          } else {
            listener.fn.apply(listener, _toConsumableArray(args));
          }
        });
      } catch (error) {
        throw new Error(error);
      }
      return true;
    }
  }]);

  return EventEmitter;
}(null);

Object.setPrototypeOf(EventEmitter, function () {
  function _class() {
    _classCallCheck(this, _class);
  }

  return _class;
}()); // Removing prototype chain

var Events = function (_ref2) {
  _inherits(Events, _ref2);

  function Events() {
    _classCallCheck(this, Events);

    var _this2 = _possibleConstructorReturn(this, (Events.__proto__ || Object.getPrototypeOf(Events)).call(this));

    var _ref3 = function _ref3() {
      var i = 0;
      var evnts = Object.values(_this2);
      return {
        next: function next() {
          if (i < evnts.length) {
            return { value: evnts[i++], done: false };
          } else {
            return { done: true };
          }
        }
      };
    };

    var _ref4 = _slicedToArray(_ref3, 1);

    Symbol.iterator = _ref4[0];
    return _this2;
  }

  return Events;
}(null);

Object.setPrototypeOf(Events, function () {
  function _class2() {
    _classCallCheck(this, _class2);
  }

  return _class2;
}());

var LO = function (_ref5) {
  _inherits(LO, _ref5);

  // Listener Object
  function LO(fn, once) {
    _classCallCheck(this, LO);

    var _this3 = _possibleConstructorReturn(this, (LO.__proto__ || Object.getPrototypeOf(LO)).call(this));

    _this3.fn = fn;
    _this3.once = once || false;
    return _this3;
  }

  return LO;
}(null);

Object.setPrototypeOf(LO, function () {
  function _class3() {
    _classCallCheck(this, _class3);
  }

  return _class3;
}());

// Allows the EventEmitter function object to be used as a module namespace
// when it is imported into another module.

EventEmitter.EventEmitter = EventEmitter;