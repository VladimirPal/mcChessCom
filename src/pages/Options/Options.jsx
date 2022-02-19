import React from 'react';

import useSettings from '../../hooks/useSettings';
import Settings from '../../components/Settings';

const Options = () => {
  const { state, setSettings } = useSettings();
  const { isLoading, ...settings } = state;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Settings settings={settings} onChange={setSettings} />;
};

export default Options;
