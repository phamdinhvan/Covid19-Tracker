import {
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  NativeSelect,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: `${theme.spacing(3)}px 0`,
  },
}));

export default function CountrySelector({ countries, handleOnChange, value }) {
  const styles = useStyles();

  return (
    <FormControl className={styles.formControl}>
      <InputLabel shrink htmlFor="country-selector">
        Countries
      </InputLabel>
      <NativeSelect
        value={value}
        onChange={handleOnChange}
        inputProps={{
          name: "country",
          id: "country-selector",
        }}
      >
        {countries.map(({ Country, ISO2 }) => (
          <option key={ISO2} value={ISO2.toLowerCase()}>
            {Country}
          </option>
        ))}
      </NativeSelect>
      <FormHelperText>Choose a country</FormHelperText>
    </FormControl>
  );
}
