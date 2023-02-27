import {
    Grid,
    TextField,
    Button,
    Typography,
    Select,
    MenuItem,
    Divider,
    InputLabel,
} from "@mui/material";
import { FC, useState } from "react";
import { blue } from "@mui/material/colors";

const RegisterStudentForm: FC = () => {
    const [selectedOption, setSelectedOption] = useState<string>("null");

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="h4">
                        Schüler anlegen
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
                    <TextField
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        type="date"
                        label="Geburtsdatum"
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputLabel sx={{ py: 1}}>
                        Klasse zuweisen
                    </InputLabel>
                    <Select
                        value={selectedOption} 
                        onChange={(e) => setSelectedOption(e.target.value)}
                    >
                        <MenuItem value={"null"}>Auswählen</MenuItem>
                        <MenuItem value={"FA 12.1"}>FA 12.1</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <Divider sx={{ my: 2 }}/>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{backgroundColor: blue[700]}}
                    >
                        Anlegen
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default RegisterStudentForm;
