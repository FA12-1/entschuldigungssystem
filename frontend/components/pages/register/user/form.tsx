import {
    Grid,
    TextField,
    FormControl,
    FormControlLabel,
    FormLabel,
    RadioGroup,
    FormHelperText,
    Radio,
    Button,
    Typography,
    Divider,
} from "@mui/material";import
{ FC } from "react";
import React from "react";
import { blue } from "@mui/material/colors";

const RegisterUserForm: FC = () => {
    const [value, setValue] = React.useState('admin');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="h4">
                        Benutzer anlegen
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth label="Vorname"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth label="Nachname"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        type="email"
                        placeholder="max@mustermann.de"
                        label="E-Mail"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl>
                        <FormLabel component="legend">Rolle</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={value}
                            onChange={handleChange}
                        >
                            <FormControlLabel 
                                value="admin" 
                                control={<Radio />} 
                                label="Admin" 
                            />
                            <FormControlLabel 
                                value="lehrer" 
                                control={<Radio />} 
                                label="Lehrer" 
                            />
                            <FormHelperText>Bitte Rolle auswählen</FormHelperText>
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Divider sx={{ my: 2 }}/>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{backgroundColor: blue[700]}}>
                            Anlegen
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default RegisterUserForm;
