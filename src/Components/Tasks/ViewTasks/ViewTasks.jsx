import { useState, useEffect } from "react";

import {
  Box,
  Chip,
  CircularProgress,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
  Paper,
} from "@mui/material";

import Grid2 from "@mui/material/Grid2";
import Sidebar from "../../Sidebar/Sidebar";
import { DataGrid } from "@mui/x-data-grid";

import styles from "./styles/ViewTasks.module.css";

import CircleIcon from "@mui/icons-material/Circle";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import TimerIcon from "@mui/icons-material/Timer";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

function ViewProjects() {
  // SOLICITUD DE DATOS A LA API

  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [rowData, setRowData] = useState([]);

  const getProjects = async () => {
    const response = await fetch("http://localhost:8000/api/v1/proyectos/");
    const data = await response.json();
    setProjects(data);
  };

  const getTasks = async () => {
    const response = await fetch("http://localhost:8000/api/v1/tareas/");
    const data = await response.json();
    setTasks(data);
  };

  // CONSTRUCCION DE TABLA

  const createData = (id, nombre, prioridad, inicio, limite, estado) => {
    return {
      id,
      nombre,
      prioridad,
      inicio,
      limite,
      estado,
    };
  };

  // FILAS Y COLUMNAS

  const rows = rowData;

  const columns = [
    { field: "id", headerName: "ID", flex: 1,},
    { field: "nombre", headerName: "Nombre", flex: 1 },
    { field: "prioridad", headerName: "Prioridad", flex: 1 },
    { field: "inicio", headerName: "Inicio", flex: 1 },
    { field: "limite", headerName: "Limite", flex: 1 },
    { field: "estado", headerName: "Estado", flex: 1 },
  ];

  // EFECTOS DE PRIMER RENDERIZADO
  useEffect(() => {
    getProjects();
    getTasks();
  }, []);

  // EFECTOS DE RENDERIZADO
  useEffect(() => {
    const rows = tasks.map((task) =>

      createData(
        task.id,
        task.nombre,
        task.prioridad,
        task.inicio,
        task.limite,
        task.estado,
      ),
    );

    setRowData(rows);
    setIsLoading(false);    
  }, [projects, tasks]);

  return (
    <Box className={styles.background}>
      <Grid2 container>
        <Grid2 size={{ xs: 12, md: 2 }}>
          <Sidebar />
        </Grid2>

        <Grid2 size={{ xs: 12, md: 10 }} className={styles.content}>
          <Box className={styles.section}>
            <Typography className={styles.title} variant="h5">
              Tareas
            </Typography>

            {isLoading ? (
              <CircularProgress />
            ) : (
              <DataGrid
                className={styles.table}
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            )}
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default ViewProjects;
