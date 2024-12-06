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
import dayjs from "dayjs";

import styles from "./styles/NewTask.module.css";
// Iconos

import InfoIcon from "@mui/icons-material/Info";
import BallotIcon from "@mui/icons-material/Ballot";
import DescriptionIcon from "@mui/icons-material/Description";
import SearchIcon from "@mui/icons-material/Search";
import SaveIcon from "@mui/icons-material/Save";

import Sidebar from "../../Sidebar/Sidebar";


const Nombre = ({ nombre, setNombre }) => (
  <Grid2 className={styles.fullWidth} size={{ xs: 12, md: 12 }}>
    <TextField
      required
      label="Nombre"
      placeholder="Nombre del Proyecto"
      fullWidth
      value={nombre}
      onChange={(e) => setNombre(e.target.value)}
    />
  </Grid2>
);

const Proyecto = ({ proyectos, setProyectos, proyectoList }) => (
  <Grid2 className={styles.fullWidth} size={{ xs: 12, md: 12 }}>
    <FormControl>
      <InputLabel> Proyecto </InputLabel>
      <Select
        value={proyectos}
        className={styles.select}
        onChange={(e) => setProyectos(e.target.value)}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 200,
              overflowY: "auto",
            },
          },
        }}
      >
        {proyectoList.map((proyecto) => (
          <MenuItem key={proyecto.id} value={proyecto}>
            {proyecto.nombre}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Grid2>
);

const FechaInicio = ({ setInicio, selectedInicio, setSelectedInicio }) => (
  <Grid2 className={styles.halfWidth} size={{ xs: 12, md: 6 }}>
    <InputLabel> Fecha de Inicio </InputLabel>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={selectedInicio}
        onChange={(date) =>
          setInicio(date.format("YYYY-MM-DD"), setSelectedInicio(date))
        }
      />
    </LocalizationProvider>
  </Grid2>
);

const FechaLimite = ({ setLimite, selectedLimite, setSelectedLimite }) => (
  <Grid2 className={styles.halfWidth} size={{ xs: 12, md: 6 }}>
    <InputLabel> Fecha de Cierre </InputLabel>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={selectedLimite}
        onChange={(date) =>
          setLimite(date.format("YYYY-MM-DD"), setSelectedLimite(date))
        }
      />
    </LocalizationProvider>
  </Grid2>
);

const Prioridad = ({ prioridad, setPrioridad }) => (
  <Grid2 className={styles.fullWidth} size={{ xs: 12, md: 12 }}>
    <InputLabel> Prioridad </InputLabel>
    <Rating
      name="simple-controlled"
      max={3}
      size="large"
      value={prioridad}
      onChange={(e) => setPrioridad(parseInt(e.target.value))}
    />
  </Grid2>
);

function NewTask() {
  const [nombre, setNombre] = useState("");
  const [inicio, setInicio] = useState(dayjs().format("YYYY-MM-DD"));
  const [limite, setLimite] = useState(dayjs().format("YYYY-MM-DD"));
  const [prioridad, setPrioridad] = useState(0);
  const [proyectos, setProyectos] = useState([]);

  // FECHAS Y PROYECTOS SELECCIONADOS
  const [selectedInicio, setSelectedInicio] = useState(null);
  const [selectedLimite, setSelectedLimite] = useState(null);
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

  const clearForm = () => {
    setNombre("");
    setInicio("");
    setLimite("");
    setPrioridad(0);
    setSelectedInicio(null);
    setSelectedLimite(null);
    setProyectos(null);
  };

  const saveProject = async () => {
    try {
      const requestBody = {
        nombre,
        inicio,
        limite,
        prioridad,
        proyecto: proyectos.id,
      };

      console.log("Request Body:", requestBody);

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
      alert("Tarea guardada exitosamente");
      clearForm();
    } catch (error) {
      console.error("Failed to save task:", error);
      alert("Ha ocurrido un error");
    }
  };

  return (
    <Box className={styles.background}>
      <Grid2 container>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Sidebar />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 9 }} className={styles.content}>
          <Box className={styles.section}>
            <Typography className={styles.title} variant="h5">
              Nueva Tarea
            </Typography>

            <Box value={0} index={0} className={styles.frame}>
              <Grid2 container className={styles.container}>
                <Nombre nombre={nombre} setNombre={setNombre} />
                
                <Proyecto
                  proyectos={proyectos}
                  setProyectos={setProyectos}
                  proyectoList={proyectoList}
                />

                <FechaInicio
                  setInicio={setInicio}
                  selectedInicio={selectedInicio}
                  setSelectedInicio={setSelectedInicio}
                />
                <FechaLimite
                  setLimite={setLimite}
                  selectedLimite={selectedLimite}
                  setSelectedLimite={setSelectedLimite}
                />
                <Prioridad prioridad={prioridad} setPrioridad={setPrioridad} />
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
