import { Grid, TextField, Button, Checkbox, FormGroup, FormControl, FormControlLabel, FormHelperText, FormLabel } from "@mui/material";
import { FC, useState } from "react";
import React from "react";
import { blue } from '@mui/material/colors';

const RegisterUserForm: FC = () => {
    const color = blue[700];
    const [state, setState] = React.useState({
        lehrer: true,
        admin: false,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
        ...state,
        [event.target.name]: event.target.checked,
    });
    };

    const { lehrer, admin } = state;
    const checkboxError = [lehrer, admin].filter((v) => v).length !== 1;

    return (
        <>
            <Grid container maxWidth="sm" spacing={2} sx={{marginX: "auto"}}>
                <Grid item xs={12} sx={{backgroundColor: color, color:"white"}}>
                    <h1>Benutzer anlegen</h1>
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
                    <FormControl
                        required
                        error={checkboxError}
                        component="fieldset"
                        sx={{ m: 3 }}
                        variant="standard"
                    >
                        <FormLabel component="legend">Rolle</FormLabel>
                        <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox checked={lehrer} onChange={handleChange} name="lehrer" />
                            }
                            label="Lehrer"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={admin} onChange={handleChange} name="admin" />
                            }
                            label="Admin"
                        />
                        </FormGroup>
                        <FormHelperText>Bitte Rolle auswählen</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{backgroundColor: color}}>
                            Anlegen
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default RegisterUserForm;
