import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const Checkbox = (props) => {
  const {
    isChecked,
    isIndeterminate,
    defaultChecked,
    defaultIndeterminate,
    onChange,
    ...inputProps
  } = props;
  const checkRef = useRef();
  const isControlled = isChecked !== undefined;

  useEffect(() => {
    if (!isControlled && defaultChecked !== undefined) {
      checkRef.current.checked = defaultChecked;
    }

    if (isIndeterminate !== undefined) {
      checkRef.current.indeterminate = isIndeterminate;
    } else if (defaultIndeterminate !== undefined) {
      checkRef.current.indeterminate = defaultIndeterminate;
    }
  }, [isChecked, isIndeterminate]);

  return (
    <input
      type="checkbox"
      ref={checkRef}
      checked={isChecked}
      style={{
        cursor: 'pointer',
      }}
      onChange={(ev) => {
        if (onChange) {
          onChange(ev);
        }
      }}
      {...inputProps}
    />
  );
};

Checkbox.propTypes = {
  /** Set if the checkbox is checked. */
  isChecked: PropTypes.bool,
  /** Set if the checkbox is indeterminate. */
  isIndeterminate: PropTypes.bool,
  /** Set if the checkbox is checked by default. */
  defaultChecked: PropTypes.bool,
  /** Set if the checkbox is indeterminate by default. */
  defaultIndeterminate: PropTypes.bool,
  /** Handler to be called on change. */
  onChange: PropTypes.func,
};

export default Checkbox;
