import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import HighMap from "../Charts/HighMap";
import LineChart from "../Charts/LineChart";

export default function Summary({ report, selectedCountryId }) {
  const [mapData, setMapData] = useState({});

  useEffect(() => {
    if (selectedCountryId) {
      import(
        `@highcharts/map-collection/countries/${selectedCountryId}/${selectedCountryId}-all.geo.json`
      ).then((res) => setMapData(res));
    }
  }, [selectedCountryId]);

  return (
    <div style={{ height: "500px", marginTop: 10 }}>
      <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
          <LineChart data={report} />
        </Grid>
        <Grid sm={4} xs={12}>
          <HighMap mapData={mapData} />
        </Grid>
      </Grid>
    </div>
  );
}
