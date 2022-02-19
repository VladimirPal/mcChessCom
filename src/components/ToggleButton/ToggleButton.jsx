import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as S from './styled';

const ToggleButton = ({ isSpan, icon, isInitialEnabled, onClick }) => {
  const [isEnabled, setIsEnabled] = useState(isInitialEnabled);
  const StyledComponent = isSpan
    ? S.ConfirmMoveManageSpan
    : S.ConfirmMoveManageButton;
  return (
    <StyledComponent
      isEnabled={isEnabled}
      className={`${StyledComponent.defaultProps.className} ${icon}`}
      onClick={() => {
        onClick(!isEnabled);
        setIsEnabled(!isEnabled);
      }}
    />
  );
};

ToggleButton.propTypes = {
  isSpan: PropTypes.bool.isRequired,
  icon: PropTypes.string.isRequired,
  isInitialEnabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ToggleButton;
