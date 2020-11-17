import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InputAdornment, TextField } from '@material-ui/core';

const ValidatedTextField = ({
  value, id, label, className, handleOnChange, message, onInput, inputAdornment
}) => {
  const [isInvalid, setIsInvalid] = useState(false);
  const helperMessage = isInvalid ? message : '';

  return (
    <TextField
      helperText={helperMessage}
      className={className}
      id={id}
      label={label}
      value={value}
      onChange={e => onInput(e, setIsInvalid, handleOnChange)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">{inputAdornment}</InputAdornment>
        ),
      }}
    />
  );
};

ValidatedTextField.propTypes = {
  value: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  inputAdornment: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  onInput: PropTypes.func.isRequired,
};

export default ValidatedTextField;
