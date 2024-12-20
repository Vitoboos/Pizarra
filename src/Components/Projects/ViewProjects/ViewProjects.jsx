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
  Rating,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import Sidebar from "../../Sidebar/Sidebar";
import { DataGrid } from "@mui/x-data-grid";

import { useNavigate } from "react-router-dom";

import styles from "./styles/ViewProjects.module.css";

// Iconos
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CircleIcon from "@mui/icons-material/Circle";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PendingIcon from "@mui/icons-material/Pending";
import RocketIcon from "@mui/icons-material/Rocket";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import TaskIcon from "@mui/icons-material/Task";
import TimerIcon from "@mui/icons-material/Timer";
import TimerOffIcon from "@mui/icons-material/TimerOff";
import WarningIcon from "@mui/icons-material/Warning";

function ViewProjects() {
  // Navegar a Proyectos

  const navigate = useNavigate();

  const onRowClick = (params) => {
    navigate(`/proyectos/${params.row.id}`, { state: params.id });
  };

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

  function constructPercentage(nombre) {
    let assigned = tasks.filter((task) => task.proyecto_nombre === nombre);
    let completed = assigned.filter((task) => task.estado === true);
    let percentage = (completed.length / assigned.length) * 100;

    return percentage;
  }

  // CONSTRUCCION DE TABLA

  const createData = (id, nombre, estado, progreso, limite, prioridad) => {
    return {
      id,
      nombre,
      estado,
      progreso,
      limite,
      prioridad,
    };
  };

  // FILAS Y COLUMNAS

  const getCellClassName = (params) => {
    switch (params.value) {
      case "Por Iniciar":
        return styles.notstarted;
      case "En Curso":
        return styles.ongoing;
      case "Suspendido":
        return styles.suspended;
      case "Finalizado":
        return styles.complete;
      default:
        return "";
    }
  };

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

      renderCell: (params) => {
        return (
          <div className={styles.nameContainer}>
            <Typography>{params.value}</Typography>
          </div>
        );
      },

    },
    {
      field: "estado",
      headerName: "Estado",
      headerClassName: styles.header,
      headerAlign: "center",
      className: styles.column,
      flex: 1,

      renderCell: (params) => {
        return (
          <div className={styles.state}>
          <Chip
            variant="outlined"
            label={params.value}
            icon={
              params.value === "Por Iniciar" ? (
                <RocketIcon className={getCellClassName(params)} />
              ) : params.value === "En Curso" ? (
                <RocketLaunchIcon className={getCellClassName(params)} />
              ) : params.value === "Suspendido" ? (
                <WarningIcon className={getCellClassName(params)} />
              ) : params.value === "Finalizado" ? (
                <EmojiEventsIcon className={getCellClassName(params)} />
              ) : (
                <ArrowDropDownIcon />
              )
            }
          />
          </div>

        );
      },
    },
    {
      field: "progreso",
      headerName: "Progreso",
      headerClassName: styles.header,
      headerAlign: "center",
      className: styles.column,
      flex: 1,
      sortable: true,

      renderCell: (params) => {
        if (isNaN(params.value)) {
          return (
            <div className={styles.progressContainer}>
              <Typography> Sin Tareas </Typography>
            </div>
          );
        } else {
          return (
            <div className={styles.progressContainer}>
              <LinearProgress
                variant="determinate"
                value={params.value}
                className={styles.progress}
              />
              <Typography>{parseInt(params.value)}% Completado </Typography>
            </div>
          );
        }
      },

      sortComparator: (v1, v2) => {
        if (isNaN(v1) && isNaN(v2)) return 0;
        if (isNaN(v1)) return -1;
        if (isNaN(v2)) return 1;
        return v1 - v2;
      },
    },
    {
      field: "limite",
      headerName: "Limite",
      headerClassName: styles.header,
      headerAlign: "center",
      className: styles.column,
      flex: 1,

      renderCell: (params) => {
        return (
          <div className={styles.dateContainer}>
            <Typography>{params.value}</Typography>
          </div>
        );
      },
    },
    {
      field: "prioridad",
      headerName: "Prioridad",
      headerClassName: styles.header,
      headerAlign: "center",
      className: styles.column,
      flex: 1,

      renderCell: (params) => {
        return (
          <div className={styles.ratingContainer}>
            <Rating
              className={styles.rating}
              max={3}
              size="large"
              value={params.value}
              readOnly
            />
          </div>
        );
      },
    },
  ];

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
        project.limite,
        project.prioridad
      )
    );

    setRowData(rows);
    setIsLoading(false);
  }, [projects, tasks]);

  // Editor

  return (
    <Box className={styles.background}>
      <Grid2 container>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Sidebar />
        </Grid2>

        <Grid2 size={{ xs: 12, md: 9 }} className={styles.content}>
          <Box className={styles.section}>
            <Typography className={styles.title} variant="h5">
              Proyectos
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
                onRowClick={onRowClick}
              />
            )}
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default ViewProjects;
