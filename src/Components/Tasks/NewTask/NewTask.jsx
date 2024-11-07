import { useState, useEffect } from "react";
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
  const [nombre, setNombre] = useState("");
  const [inicio, setInicio] = useState("");
  const [limite, setLimite] = useState("");
  const [prioridad, setPrioridad] = useState(0);
  const [proyectos, setProyectos] = useState([]);

  const [proyectoList, setProyectoList] = useState([]);

  const getProyectos = async () => {
    const response = await fetch("http://localhost:8000/api/v1/proyectos/");
    const data = await response.json();
    setProyectoList(data);
  };
  // EFECTOS DE PRIMER RENDERIZADO
  useEffect(() => {
    getProyectos();
  }, []);

  const saveProject = async () => {
    try {
      const requestBody = {
        nombre,
        inicio,
        limite,
        prioridad,
        proyecto: proyectos.id,
      };

      console.log("Request Body:", requestBody); // Log the request body

      const response = await fetch("http://localhost:8000/api/v1/tareas/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error Data:", errorData); // Log the error data
        throw new Error(`Error: ${errorData.message || response.statusText}`);
      }

      const data = await response.json();
      console.log("Task saved successfully:", data);
    } catch (error) {
      console.error("Failed to save task:", error);
    }
  };

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
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </Grid2>

                <Grid2 size={{ xs: 12, md: 12 }} className={styles.input}>
                  <FormControl>
                    <InputLabel> Proyecto </InputLabel>
                    <Select
                      value={proyectos}
                      className={styles.select}
                      onChange={(e) => setProyectos(e.target.value)}
                    >
                      {proyectoList.map((proyecto) => (
                        <MenuItem key={proyecto.id} value={proyecto}>
                          {proyecto.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid2>

                <Grid2 size={{ xs: 12, md: 6 }} className={styles.dates}>
                  <InputLabel> Fecha de Inicio </InputLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      onChange={(date) => setInicio(date.format("YYYY-MM-DD"))}
                    />
                  </LocalizationProvider>
                </Grid2>

                <Grid2 size={{ xs: 12, md: 6 }} className={styles.dates}>
                  <InputLabel> Fecha Limite </InputLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      onChange={(date) => setLimite(date.format("YYYY-MM-DD"))}
                    />
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
                  onClick={saveProject}
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
