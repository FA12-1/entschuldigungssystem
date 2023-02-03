import { Grid, TextField, Button, FormLabel } from "@mui/material";
import { FC, useState } from "react";
import { blue } from '@mui/material/colors';

const RegisterStudentForm: FC = () => {
    const color = blue[700];
    const [selectedOption, setSelectedOption] = useState<String>();

  // This function is triggered when the select changes
  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
  };

    return (
        <>
            <Grid container maxWidth="sm" spacing={2} sx={{marginX: "auto"}}>
                <Grid item xs={12} sx={{backgroundColor: color, color:"white"}}>
                    <h1>Schüler anlegen</h1>
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
                <Grid item xs={12} sx={{paddingRight: "16px"}}>
                    <TextField
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        type="date"
                        label="Geburtsdatum"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormLabel
                        component="legend"
                        sx={{margin: "2% 0"}}>
                            Klasse zuweisen
                    </FormLabel>
                    <select onChange={selectChange} id="Klasse">
                    <option selected disabled>Klasse zuweisen</option>
                    <option>FA 12.1</option>
                    </select>
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

export default RegisterStudentForm;
