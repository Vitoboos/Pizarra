import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  TextField,
  Typography,
  Rating,
  Select,
  Paper,
  FormLabel,
  FormHelperText,
  Checkbox,
  Switch,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import styles from "./styles/Task.module.css";

// Iconos
import ClearIcon from "@mui/icons-material/Clear";
import InfoIcon from "@mui/icons-material/Info";
import BallotIcon from "@mui/icons-material/Ballot";
import DescriptionIcon from "@mui/icons-material/Description";
import SearchIcon from "@mui/icons-material/Search";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

import { useLocation } from "react-router-dom";
import dayjs from "dayjs";

import { useNavigate } from "react-router-dom";

// Componentes
import Sidebar from "../../Sidebar/Sidebar";

// Componentes Internos
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

const Estado = ({ estado, setEstado }) => (
  <Grid2 className={styles.fullWidth} size={{ xs: 12, md: 12 }}>
    <FormControl className={styles.switchContainer}>
      <InputLabel> Completada </InputLabel>
      <Checkbox
        checked={estado}
        onChange={(e) => setEstado(e.target.checked)}
        className={styles.switch}
      />
    </FormControl>
  </Grid2>
);

const Proyecto = ({ proyecto, setProyecto, proyectoList }) => (
  // console.log(proyecto),
  <Grid2 className={styles.fullWidth} size={{ xs: 12, md: 12 }}>
    <FormControl>
    <Typography variant="body2"> Proyecto: {proyecto.nombre} </Typography>

      <FormHelperText> Proyectos </FormHelperText>

      <Select
        value={proyecto}
        className={styles.select}
        onChange={(e) => setProyecto(e.target.value)}
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
        onChange={(date) => setInicio(date, setSelectedInicio(date))}
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
        onChange={(date) => setLimite(date, setSelectedLimite(date))}
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

function Task() {
  const navigate = useNavigate();

  // Datos de la tarea
  const [tarea, setTarea] = useState("");
  const [nombre, setNombre] = useState("");
  const [estado, setEstado] = useState("");
  const [inicio, setInicio] = useState(dayjs());
  const [limite, setLimite] = useState(dayjs());
  const [prioridad, setPrioridad] = useState(0);
  const [proyecto, setProyecto] = useState("");
  const [proyectoList, setProyectoList] = useState([]);

  // FECHAS, PROVEEDORES Y DEPARTAMENTOS SELECCIONADOS
  const [selectedInicio, setSelectedInicio] = useState(null);
  const [selectedLimite, setSelectedLimite] = useState(null);


  // Estado heredados
  const location = useLocation();
  const ID = location.state;

  const getTarea = async () => {
    const response = await fetch(`http://localhost:8000/api/v1/tareas/${ID}`);
    const data = await response.json();
    // console.log(data);
    setTarea(data);
    setNombre(data.nombre);
    setEstado(data.estado);
    setInicio(dayjs(data.inicio));
    setSelectedInicio(dayjs(data.inicio));
    setLimite(dayjs(data.limite));
    setSelectedLimite(dayjs(data.limite));
    setPrioridad(data.prioridad);
    fetchProyecto(data.proyecto);
  };

  const getProyectos = async () => {
    const response = await fetch("http://localhost:8000/api/v1/proyectos/");
    const data = await response.json();
    setProyectoList(data);
  };

  const fetchProyecto = async (id) => {
    const response = await fetch(
      `http://localhost:8000/api/v1/proyectos/${id}`
    );
    const data = await response.json();
    setProyecto(data);
  };

  useEffect(() => {
    getTarea();
    getProyectos();
  }, []);

  // FUNCIONES DE GUARDADO

  const editProject = async (ID) => {
    try {
      const requestBody = {
        nombre,
        estado,
        inicio: inicio.format("YYYY-MM-DD"),
        limite: limite.format("YYYY-MM-DD"),
        prioridad,
        proyecto: proyecto.id,
      };

      console.log("Request Body:", requestBody);

      const response = await fetch(
        `http://localhost:8000/api/v1/tareas/${ID}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error Data:", errorData);
        throw new Error(`Error: ${errorData.message || response.statusText}`);
      }

      const data = await response.json();
      alert("Tarea actualizada correctamente");
      console.log("Task updated successfully:", data);
      navigate("/tareas");
    } catch (error) { 
      alert("Error al actualizar el proyecto");
      console.error("Failed to update task:", error);
    }
  };

  const deleteTask = async (ID) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/tareas/${ID}/`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error Data:", errorData);
        throw new Error(`Error: ${errorData.message || response.statusText}`);
      }

      if (response.status === 204) {
        console.log("Project deleted successfully, no content returned.");
      } else {
        const data = await response.json();
        console.log("Project deleted successfully:", data);
      }
    } catch (error) {
      console.error("Failed to delete project:", error);
    }

    navigate("/tareas");
  };

  return (
    <Box className={styles.background}>
      <Grid2 container>
        <Grid2 size={{ xs: 12, md: 3}}>
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
                  proyecto={proyecto}
                  setProyecto={setProyecto}
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

                <Estado estado={estado} setEstado={setEstado} />
              </Grid2>

              <Grid2 container className={styles.buttonContainer}>
                <Grid2 size={{ xs: 6, md: 6 }}>
                  <Button
                    startIcon={<SaveIcon />}
                    variant="contained"
                    color="success"
                    className={styles.save}
                    onClick={() => editProject(ID)}
                  >
                    Guardar
                  </Button>
                </Grid2>

                <Grid2 size={{ xs: 6, md: 6 }}>
                  <Button
                    startIcon={<DeleteIcon />}
                    variant="contained"
                    color="error"
                    className={styles.save}
                    onClick={() => deleteTask(ID)}
                  >
                    Eliminar
                  </Button>
                </Grid2>
              </Grid2>
            </Box>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default Task;
