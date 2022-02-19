import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../Checkbox';

import * as S from './styled';

const Settings = ({ settings, onChange }) => {
  return (
    <S.Settings>
      <S.SettingItem>
        <Checkbox
          isChecked={settings.isEnabled}
          onChange={() => {
            onChange('isEnabled', !settings.isEnabled);
          }}
        />
        Enable
      </S.SettingItem>
      <S.SettingItem>
        <span>
          Confirm starting from
          <input
            style={{ width: '30px' }}
            type="number"
            value={settings.runFromMoveNumber}
            onChange={(ev) => {
              onChange('runFromMoveNumber', ev.target.value);
            }}
          />
          step
        </span>
      </S.SettingItem>
      <S.SettingItem>
        <span>
          Stop confirm before
          <input
            style={{ width: '30px' }}
            type="number"
            value={settings.stopOnSecond}
            onChange={(ev) => {
              onChange('stopOnSecond', ev.target.value);
            }}
          />
          seconds
        </span>
      </S.SettingItem>
      <S.SettingItem>
        <span>
          Alarm if not confirm after
          <input
            style={{ width: '30px' }}
            type="number"
            value={settings.alarmAfterSeconds}
            onChange={(ev) => {
              onChange('alarmAfterSeconds', ev.target.value);
            }}
          />
          seconds
        </span>
      </S.SettingItem>
    </S.Settings>
  );
};

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Settings;
