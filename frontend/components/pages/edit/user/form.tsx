import {
    Grid,
    TextField,
    Button,
    Typography,
    Divider,
} from "@mui/material";import
{ FC } from "react";
import { blue } from "@mui/material/colors";

const EditUserForm: FC = () => {
    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="h4">
                        Benutzer bearbeiten
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
                    <Divider sx={{ my: 2 }}/>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{backgroundColor: blue[700]}}
                    >
                        Änderungen speichern
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default EditUserForm;
