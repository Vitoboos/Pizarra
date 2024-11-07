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

import styles from "./styles/ViewProjects.module.css";

import CircleIcon from "@mui/icons-material/Circle";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import TimerIcon from "@mui/icons-material/Timer";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

function ViewProjects() {
  // SOLICITUD DE DATOS A LA API

  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
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

  function constructPercentage(nombre) {
    let assigned = tasks.filter((task) => task.proyecto_nombre === nombre);
    let completed = assigned.filter((task) => task.estado === true);
    let percentage = (completed.length / assigned.length) * 100;

    return percentage;
  }

  // CONSTRUCCION DE TABLA

  const createData = (id, nombre, estado, progreso, limite) => {
    return {
      id,
      nombre,
      estado,
      progreso,
      limite,
    };
  };

  // FILAS Y COLUMNAS

  const rows = rowData;

  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: styles.header,
      headerAlign: "center",
      className: styles.column,
      flex: 1,
    },
    {
      field: "nombre",
      headerName: "Nombre",
      headerClassName: styles.header,
      headerAlign: "center",
      className: styles.column,
      flex: 1,
    },
    {
      field: "estado",
      headerName: "Estado",
      headerClassName: styles.header,
      headerAlign: "center",
      className: styles.column,
      flex: 1,
    },
    {
      field: "progreso",
      headerName: "Progreso",
      headerClassName: styles.header,
      headerAlign: "center",
      className: styles.column,
      flex: 1,
    },
    {
      field: "limite",
      headerName: "Limite",
      headerClassName: styles.header,
      headerAlign: "center",
      className: styles.column,
      flex: 1,
    },
  ];

  const onRowClick = (params) => {
    alert(params.id)
    setIsLoading(true);
    setIsUpdating(true);
  };

  // EFECTOS DE PRIMER RENDERIZADO
  useEffect(() => {
    getProjects();
    getTasks();
  }, []);

  // EFECTOS DE RENDERIZADO
  useEffect(() => {
    const rows = projects.map((project) =>
      createData(
        project.id,
        project.nombre,
        project.estado,
        constructPercentage(project.nombre),
        project.limite
      )
    );

    setRowData(rows);
    setIsLoading(false);
  }, [projects, tasks]);

  // Editor

  return (
    <Box className={styles.background}>
      <Grid2 container>
        <Grid2 size={{ xs: 12, md: 2 }}>
          <Sidebar />
        </Grid2>

        <Grid2 size={{ xs: 12, md: 10 }} className={styles.content}>
          <Box className={styles.section}>
            <Typography className={styles.title} variant="h5">
              Proyectos
            </Typography>

            {isLoading & !isUpdating ? (
              <CircularProgress />
            ) : (
              <DataGrid
                className={styles.table}
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                onRowClick={onRowClick}                
              />
            )}

            {!isLoading & isUpdating ? <LinearProgress /> : null}

          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default ViewProjects;
