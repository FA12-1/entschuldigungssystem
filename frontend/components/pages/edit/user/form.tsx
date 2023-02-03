import { Grid, TextField, Button, Checkbox, FormGroup, FormControl, FormControlLabel, FormHelperText, FormLabel } from "@mui/material";
import { FC, useState } from "react";
import * as React from "react";
import { blue } from '@mui/material/colors';

const EditUserForm: FC = () => {
    const color = blue[700];

    return (
        <>
            <Grid container maxWidth="sm" spacing={2} sx={{marginX: "auto"}}>
                <Grid item xs={12} sx={{backgroundColor: color, color:"white"}}>
                    <h1>Benutzer bearbeiten</h1>
                </Grid>
                <Grid item xs={12} sx={{paddingRight: "16px"}}>
                    <TextField fullWidth label="Vorname"/>
                </Grid>
                <Grid item xs={12} sx={{paddingRight: "16px"}}>
                    <TextField fullWidth label="Nachname"/>
                </Grid>
                <Grid item xs={12} sx={{paddingRight: "16px"}}>
                    <TextField
                        fullWidth
                        type="email"
                        placeholder="max@mustermann.de"
                        label="E-Mail"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{backgroundColor: color}}>
                            Änderungen speichern
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default EditUserForm;
