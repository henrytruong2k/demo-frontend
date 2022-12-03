import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const InputField = ({ form, name, ...others }) => {
  const { formState } = form;
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <TextField
          {...field}
          {...others}
          error={!!formState.errors[name]}
          helperText={formState.errors[name]?.message}
        />
      )}
    />
  );
};

export default InputField;
