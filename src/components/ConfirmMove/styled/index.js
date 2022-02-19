import styled from '@emotion/styled';

export const ConfirmMove = styled.div`
  display: flex;
`;

export const ConfirmButton = styled.button`
  background: ${(props) => (props.isHighlighted ? 'grey !important' : '')};
  &:hover {
    background-color: #e58f2a;
  }
`;
ConfirmButton.defaultProps = {
  type: 'button',
  className: ['ui_v5-button-component', 'ui_v5-button-basic'].join(' '),
};

export const CancelButton = styled.button`
  background: ${(props) => (props.isHighlighted ? 'grey !important' : '')};
  margin-left: 5px;
  &:hover {
    background-color: #bebdb9;
  }
`;
CancelButton.defaultProps = {
  type: 'button',
  className: ['ui_v5-button-component', 'ui_v5-button-basic'].join(' '),
};

export const ConfirmIcon = styled.span``;
ConfirmIcon.defaultProps = {
  className: ['icon-font-chess', 'checkmark', 'ui_v5-button-icon'].join(' '),
};

export const CancelIcon = styled.span``;
CancelIcon.defaultProps = {
  className: ['icon-font-chess', 'x', 'ui_v5-button-icon'].join(' '),
};
