// @flow
/**
 * Helper functions
 * @module Helpers
 */
import produce from 'immer';
import { format } from 'date-fns';

/**
 * Convert data attributes to Object
 * @param {Element} elem
 * @returns {{}}
 */
export function datasetToObject(elem) {
  const data = {};
  [].forEach.call(elem.attributes, attr => {
    /* istanbul ignore else */
    if (/^data-/.test(attr.name)) {
      const camelCaseName = attr.name.substr(5).replace(/-(.)/g, ($0, $1) => $1.toUpperCase());
      data[camelCaseName] = attr.value;
    }
  });
  return data;
}

export function handleActions(actionsMap, defaultState) {
  return (state = defaultState, { type, ...rest } = {}) =>
    produce(state, (draft) => {
      const action = actionsMap[type];
      let newState;

      if (action) {
        newState = action(draft, rest);
      }

      if (newState) {
        return newState;
      }

      return draft;
    });
}

export function keyMirror(obj) {
  const output = {};

  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(output, key)) {
      output[key] = key;
    }
  }

  return output;
}

/**
 * Log grouped messages to the console
 * @param {string} type
 * @param {string} title
 * @param {*} data
 * @param {Object} [options]
 */
export function logger(type, title, data, options = {}) {
  /* istanbul ignore else */
  if (process.env.NODE_ENV === 'development') {
    /* eslint-disable no-console */
    const { collapsed = true, hideTimestamp = false, typeColor = 'gray' } = options;
    const groupMethod = collapsed ? console.groupCollapsed : console.group;
    const parts = [`%c ${type}`];
    const styles = [`color: ${typeColor}; font-weight: lighter;`, 'color: inherit;'];

    if (!hideTimestamp) {
      styles.push('color: gray; font-weight: lighter;');
    }

    const time = format(new Date(), 'HH:mm:ss');

    parts.push(`%c${title}`);

    if (!hideTimestamp) {
      parts.push(`%c@ ${time}`);
    }

    /* istanbul ignore else */
    if (!window.SKIP_LOGGER) {
      groupMethod(parts.join(' '), ...styles);
      console.log(data);
      console.groupEnd();
    }
    /* eslint-enable */
  }
}

// $FlowFixMe
export const spread = produce(Object.assign);
