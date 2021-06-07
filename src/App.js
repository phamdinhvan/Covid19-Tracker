import { Container, Typography } from "@material-ui/core";
import { sortBy } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { getCountries, getReportByCountry } from "./api";
import CountrySelector from "./Components/CountrySelector";
import Highlight from "./Components/Highlight";
import Summary from "./Components/Summary";

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [report, setReport] = useState([]);

  useEffect(() => {
    getCountries().then((res) => {
      const countries = sortBy(res.data, "Country");

      setCountries(countries);

      setSelectedCountryId("vn");
    });
  }, []);

  const handleOnChange = React.useCallback((e) => {
    setSelectedCountryId(e.target.value);
  }, []);

  useEffect(() => {
    if (selectedCountryId) {
      const { Slug } = countries.find(
        (country) => country.ISO2.toLowerCase() === selectedCountryId
      );

      getReportByCountry(Slug).then((res) => {
        //xoa item cuoi cung trong res.data
        res.data.pop();
        setReport(res.data);
      });
    }
  }, [countries, selectedCountryId]);

  return (
    <Container style={{ marginTop: 20 }}>
      <Typography variant="h2" component="h2">
        Covid-19 Data
      </Typography>
      <Typography>{moment().format("LLL")}</Typography>
      <CountrySelector
        countries={countries}
        handleOnChange={handleOnChange}
        value={selectedCountryId}
      />
      <Highlight report={report} />
      <Summary report={report} selectedCountryId={selectedCountryId} />
    </Container>
  );
}

export default App;
