import * as R from 'ramda';

import { SET_STATE } from '../actions';

const mergeValues = (values, state) =>
  Object.keys(values).reduce(
    (s, v) => ({
      ...s,
      [v]: values[v]?._merge
        ? mergeValues(R.dissoc('_merge', values[v]), state[v])
        : values[v],
    }),
    state
  );

const keyValueReducer = (state, action) => {
  switch (action.type) {
    case SET_STATE: {
      const { keyOrRootValues, maybeValues } = action.payload;
      if (typeof keyOrRootValues === 'function') {
        return keyOrRootValues(state);
      }
      const [values, key] =
        maybeValues === undefined
          ? [keyOrRootValues, null]
          : [maybeValues, keyOrRootValues];
      return {
        ...(key
          ? {
              ...state,
              [key]: {
                ...mergeValues(values, state[key]),
              },
            }
          : mergeValues(values, state)),
      };
    }
    default:
      return state;
  }
};

export default keyValueReducer;
