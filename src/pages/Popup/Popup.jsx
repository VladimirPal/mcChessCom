import React from 'react';

import useSettings from '../../hooks/useSettings';
import Settings from '../../components/Settings';
import * as S from './styled';

const Popup = () => {
  const { state, setSettings } = useSettings();
  const { isLoading, ...settings } = state;

  if (isLoading) {
    return <S.Popup>Loading...</S.Popup>;
  }

  return (
    <S.Popup>
      <S.Settings>
        <Settings settings={settings} onChange={setSettings} />
      </S.Settings>
    </S.Popup>
  );
};

export default Popup;
