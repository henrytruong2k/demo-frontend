import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import React, { useState } from "react";
import { Controller } from "react-hook-form";

const PasswordField = ({ form, name, label, ...others }) => {
  const { formState } = form;
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((x) => !x);
  };

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <TextField
          {...field}
          {...others}
          label={label}
          variant="outlined"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleShowPassword}
                  onMouseDown={toggleShowPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={!!formState.errors[name]}
          helperText={formState.errors[name]?.message}
        />
      )}
    />
  );
};

export default PasswordField;
