import {
    Grid,
    TextField,
    Button,
    FormLabel,
    Typography,
    Select,
    MenuItem,
    Divider,
    FormControl,
    InputLabel,
} from "@mui/material";
import { FC, useState } from "react";
import { blue } from "@mui/material/colors";

const EditClassForm: FC = () => {
    const [selectedOption, setSelectedOption] = useState<string>("null");

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="h4">Klasse bearbeiten</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth label="Name" />
                </Grid>
                <Grid item xs={12}>
                    <InputLabel sx={{ py: 1 }}>
                        Klassenlehrer zuweisen
                    </InputLabel>

                    <Select
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                    >
                        <MenuItem value={"null"}>auswählen</MenuItem>
                        <MenuItem value={"Kreutzer"}>Kreutzer</MenuItem>
                        <MenuItem value={"Schäfer"}>Schäfer</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ backgroundColor: blue[700] }}
                    >
                        Änderungen speichern
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default EditClassForm;
