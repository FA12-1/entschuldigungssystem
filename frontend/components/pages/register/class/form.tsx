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

const RegisterClassForm: FC = () => {
    const [selectedOption, setSelectedOption] = useState<string>("null");

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="h4">
                        Klasse anlegen
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth label="Name"/>
                </Grid>
                <Grid item xs={12}>
                    <InputLabel sx={{ py: 1}}>
                            Klassenlehrer zuweisen
                    </InputLabel>
                    <Select 
                        value={selectedOption} 
                        onChange={(e) => setSelectedOption(e.target.value)}
                    >
                        <MenuItem value={"null"}>Auswählen</MenuItem>
                        <MenuItem value={"Kreutzer"}>M. Kreutzer</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <Divider sx={{ my: 2 }}/>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ backgroundColor: blue[700] }}
                    >
                        Anlegen
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default RegisterClassForm;
