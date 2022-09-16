// A function is used to add event listener
/**
 * add event listener to a element
 * @param el means element
 * @param eventName means eventName
 * @param callback means the callback function we need to use in this function
 */
export function addEventListener(el, eventName, callback) {
  if (el.addEventListener) {
    el.addEventListener(eventName, callback, false);
  } else if (el.attachEvent) {
    el.attachEvent(`on${eventName}`, e => {
      callback.call(el, e || window.event);
    });
  }
}

// A function is used to remove event listener
/**
 * remove event listener from a element
 * @param el means element
 * @param eventName means eventName
 * @param callback means the callback function we need to use in this function
 */
export function removeEventListener(el, eventName, callback) {
  if (el.removeEventListener) {
    el.removeEventListener(eventName, callback);
  } else if (el.detachEvent) {
    el.detachEvent(`on${eventName}`, callback);
  }
}
