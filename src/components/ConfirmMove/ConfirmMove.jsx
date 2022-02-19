import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as S from './styled';

const ConfirmMove = ({ alarmSeconds, onConfirm, onCancel }) => {
  const [isHighlighted, setHighlighted] = useState(false);
  const promisesToCancel = useRef([]);

  useEffect(() => {
    const timer = setInterval(() => {
      const sleep = (ms) => {
        return new Promise((res) => {
          const timeoutId = setTimeout(res, ms);
          promisesToCancel.current.push(timeoutId);
        });
      };

      const highLightPromise = (num) => {
        return sleep(500).then(() => {
          setHighlighted(num % 2);
        });
      };

      [...Array(9).keys()].reduce(
        (p, x) => p.then(() => highLightPromise(x)),
        Promise.resolve()
      );
    }, 1000 * alarmSeconds);

    return () => {
      promisesToCancel.current.map(clearTimeout);
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const onKeyPress = (ev) => {
      if (['Space', 'Enter', 'KeyY'].includes(ev.code)) {
        onConfirm();
      }
      if (['Esc', 'Escape', 'Backspace', 'Delete', 'KeyN'].includes(ev.code)) {
        onCancel();
      }
    };

    window.document.addEventListener('keypress', onKeyPress);
    return () => {
      window.document.removeEventListener('keypress', onKeyPress);
    };
  }, []);

  return (
    <S.ConfirmMove>
      <S.ConfirmButton isHighlighted={isHighlighted} onClick={onConfirm}>
        <S.ConfirmIcon />
      </S.ConfirmButton>
      <S.CancelButton isHighlighted={isHighlighted} onClick={onCancel}>
        <S.CancelIcon />
      </S.CancelButton>
    </S.ConfirmMove>
  );
};

ConfirmMove.propTypes = {
  alarmSeconds: PropTypes.number.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmMove;
