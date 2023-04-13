# EmittEvent

A Basic eventemitter writen in Ecmascript 6 modeled on Node.js EventEmitter. It sure wouldn't work in old browsers, but it's good enough to do the job.

# Documentation

## `eventsNames()`

Return an array of all event's names/types

- **Returns:** `(Array|null)` —

## `eventListeners(evnt)`

return all listeners of a given event if it exist, else null.

- **Parameters:** `evnt` — `String` — The event name.
- **Returns:** `(Array|null)` —

## `addListener(evnt, fn, once)`

Add new event if it doesn't exist, else add it to existing one

- **Parameters:**
  - `evnt` — `String` — The event name.
  - `fn` — `Function` — The Callback / Listener function
  - `once` — `boolean` — If Callback / Listener should run once

## `removeListener(evnt, fn)`

Remove listeners of a given event. All listenres that match the Callback fn will be removed

- **Parameters:**
  - `evnt` — `String` — The event name.
  - `fn` — `Function` — Function to identify the listener with.

## `clearEvent(evnt)`

Removes the event and all its listeners.

- **Parameters:** `evnt` — `string` — The event name.

## `on(evnt, fn)`

Add a listener

- **Parameters:**
  - `evnt` — `string` — The event name.
  - `fn` — `fn` — The Callbacl function

## `emit(evnt)`

Calls all listenres of a given event.

- **Parameters:** `evnt` — `String` — The event name.
- **Returns:** `Boolean` — `true` if the event had listeners, else `false`.
