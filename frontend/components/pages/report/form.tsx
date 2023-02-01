import { Grid, TextField } from "@mui/material";
import { FC, useState } from "react";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

const ReportAbsenceForm: FC = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Vorname" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Nachname" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Straße und Hausnummer" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth label="PLZ und Ort" />
                </Grid>
                <Grid item xs={6}>
                    <MobileDatePicker
                        label="For mobile"
                        value={startDate}
                        onChange={(newValue) => {
                            setStartDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
                <Grid item xs={6}>
                    <MobileDatePicker
                        label="For mobile"
                        value={endDate}
                        onChange={(newValue) => {
                            setEndDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default ReportAbsenceForm;
