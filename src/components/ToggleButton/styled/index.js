import styled from '@emotion/styled';

export const ConfirmMoveManageButton = styled.button`
  color: ${(props) => (props.isEnabled ? 'white ' : 'black ')} !important;
`;
ConfirmMoveManageButton.defaultProps = {
  // role: 'contentinfo',
  className: 'board-layout-icon icon-font-chess',
};

export const ConfirmMoveManageSpan = styled.span`
  color: ${(props) => (props.isEnabled ? 'white ' : 'black ')} !important;
`;
ConfirmMoveManageSpan.defaultProps = {
  // role: 'contentinfo',
  className: 'board-layout-icon icon-font-chess',
};
