import { useReducer, useEffect, useCallback } from 'react';

import keyValueReducer from '../reducers/keyValue';
import * as actions from '../actions';
import { getAllStorageSyncData } from '../utils';
import { initialSettings } from '../constants';

const initialState = {
  ...initialSettings,
  isLoading: true,
};

const useSettings = () => {
  const [state, dispatch] = useReducer(keyValueReducer, initialState);

  useEffect(async () => {
    const settings = await getAllStorageSyncData();

    const updateSettings = (changes) => {
      dispatch(
        actions.setState({
          ...Object.keys(changes).reduce((acc, settingKey) => {
            acc[settingKey] = changes[settingKey].newValue;
            return acc;
          }, {}),
        })
      );
    };
    chrome.storage.onChanged.addListener(updateSettings);

    dispatch(
      actions.setState({
        isLoading: false,
        ...settings,
      })
    );

    return () => {
      chrome.storage.onChanged.removeListener(updateSettings);
    };
  }, []);

  const setSettings = useCallback((key, value) => {
    dispatch(
      actions.setState({
        [key]: value,
      })
    );
    chrome.storage.sync.set({ [key]: value });
  }, []);

  return {
    state,
    setSettings,
  };
};

export default useSettings;
