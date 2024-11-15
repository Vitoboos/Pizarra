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
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import Sidebar from "../../Sidebar/Sidebar";
import styles from "./styles/Task.module.css";

// Iconos
import ClearIcon from "@mui/icons-material/Clear";
import InfoIcon from "@mui/icons-material/Info";
import BallotIcon from "@mui/icons-material/Ballot";
import DescriptionIcon from "@mui/icons-material/Description";
import SearchIcon from "@mui/icons-material/Search";
import SaveIcon from "@mui/icons-material/Save";

import { useLocation } from "react-router-dom";
import dayjs from "dayjs";

import { useNavigate } from "react-router-dom";

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

  // Estado heredados
  const location = useLocation();
  const ID = location.state;

  const getTarea = async () => {
    const response = await fetch(`http://localhost:8000/api/v1/tareas/${ID}`);
    const data = await response.json();
    console.log(data);
    setTarea(data);
    setNombre(data.nombre);
    setEstado(data.estado);
    setInicio(dayjs(data.inicio));
    setLimite(dayjs(data.limite));
    setPrioridad(data.prioridad);
    fetchProyecto(data.proyecto)
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
        departamentos: selectedDepartamentos.map(
          (departamento) => departamento.id
        ),
        proveedores: selectedProveedores.map((proveedor) => proveedor.id),
        observaciones,
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
      console.log("Task updated successfully:", data);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const deleteTask = async (ID) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/proyectos/${ID}/`,
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
                    value={nombre}
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
                    <Button onClick={() => console.log(proyecto)}> Test </Button>
                  </FormControl>
                </Grid2>

                <Grid2 size={{ xs: 12, md: 6 }} className={styles.dates}>
                  <InputLabel> Fecha de Inicio </InputLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={inicio}
                      onChange={(date) => setInicio(date.format("YYYY-MM-DD"))}
                    />
                  </LocalizationProvider>
                </Grid2>

                <Grid2 size={{ xs: 12, md: 6 }} className={styles.dates}>
                  <InputLabel> Fecha Limite </InputLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={limite}
                      onChange={(date) => setLimite(date.format("YYYY-MM-DD"))}
                    />
                  </LocalizationProvider>
                </Grid2>

                <Grid2 size={{ xs: 12, md: 12 }} className={styles.rating}>
                  <InputLabel> Prioridad </InputLabel>
                  <Rating
                    name="simple-controlled"
                    max={3}
                    size="large"
                    value={prioridad}
                  />
                </Grid2>
              </Grid2>
              <div className={styles.buttonContainer}>
                <Button
                  startIcon={<SaveIcon />}
                  variant="contained"
                  color="success"
                  className={styles.save}
                  onClick={editProject}
                >
                  Guardar
                </Button>

                <Button
                  startIcon={<SaveIcon />}
                  variant="contained"
                  color="error"
                  className={styles.save}
                  onClick={deleteTask}
                >
                  Eliminar
                </Button>
              </div>
            </Box>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default Task;