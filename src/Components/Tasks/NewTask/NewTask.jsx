import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Rating,
  Tabs,
  Tab,
  TextField,
  Typography,
  Select,
  CardContent,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import Sidebar from "../../Sidebar/Sidebar";
import styles from "./styles/NewTask.module.css";

import InfoIcon from "@mui/icons-material/Info";
import BallotIcon from "@mui/icons-material/Ballot";
import DescriptionIcon from "@mui/icons-material/Description";
import SearchIcon from "@mui/icons-material/Search";
import SaveIcon from "@mui/icons-material/Save";
// Iconos

function NewTask() {
  return (
    <Box className={styles.background}>
      <Grid2 container>
        <Grid2 size={{ xs: 12, md: 2 }}>
          <Sidebar />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 10 }} className={styles.content}>
          <Box className={styles.section}>
            <Typography className={styles.title} variant="h5">
              Nueva Tarea
            </Typography>

            <Box value={0} index={0} className={styles.frame}>
              <Grid2 container className={styles.container}>
                <Grid2 size={{ xs: 12, md: 12 }} className={styles.input}>
                  <TextField
                    required
                    label="Nombre"
                    placeholder="Nombre del Proyecto"
                    fullWidth
                  />
                </Grid2>

                <Grid2 size={{ xs: 12, md: 6 }} className={styles.dates}>
                  <InputLabel> Fecha de Inicio </InputLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker />
                  </LocalizationProvider>
                </Grid2>

                <Grid2 size={{ xs: 12, md: 6 }} className={styles.dates}>
                  <InputLabel> Fecha Limite </InputLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker />
                  </LocalizationProvider>
                </Grid2>

                <Grid2 size={{ xs: 12, md: 12 }} className={styles.rating}>
                  <InputLabel> Prioridad </InputLabel>
                  <Rating name="simple-controlled" max={3} size="large" />
                </Grid2>
              </Grid2>
              <div className={styles.buttonContainer}>
                  <Button
                    startIcon={<SaveIcon />}
                    variant="contained"
                    color="success"
                    className={styles.save}
                  >
                    Guardar
                  </Button>
                </div>

            </Box>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default NewTask;
