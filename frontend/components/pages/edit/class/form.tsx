import { Grid, TextField, Button, FormLabel } from "@mui/material";
import { FC, useState } from "react";
import { blue } from '@mui/material/colors';

const EditClassForm: FC = () => {
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
                    <h1>Klasse bearbeiten</h1>
                </Grid>
                <Grid item xs={12} sx={{padding: "16px"}}>
                    <TextField fullWidth label="Name" />
                </Grid>
                <Grid item xs={12}>
                    <FormLabel
                        component="legend"
                        sx={{margin: "2% 0"}}>
                            Klassenlehrer zuweisen
                    </FormLabel>
                    <select onChange={selectChange} id="Klasse">
                        <option selected disabled>Lehrer zuweisen</option>
                        <option>Test</option>
                    </select>
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

export default EditClassForm;
