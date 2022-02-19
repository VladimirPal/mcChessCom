export const SET_STATE = 'SET_STATE';

export const setState = (keyOrRootValues, maybeValues) => ({
  type: SET_STATE,
  payload: {
    keyOrRootValues,
    maybeValues,
  },
});
