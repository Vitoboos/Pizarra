import { useState, useEffect } from "react";

import {
  Box,
  Checkbox,
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
  Rating,
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

import { useNavigate } from "react-router-dom";

function ViewProjects() {
  // Navegacion
  const navigate = useNavigate();

  const onRowClick = (params) => {
    console.log(params.id);
    navigate(`/tareas/${params.row.id}`, { state: params.id });
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

  // CONSTRUCCION DE TABLA

  const createData = (id, nombre, prioridad, inicio, limite, estado, proyecto) => {
    return {
      id,
      nombre,
      proyecto,
      prioridad,
      inicio,
      limite,
      estado,
    };
  };

  // FILAS Y COLUMNAS

  const rows = rowData;

  const columns = [
    { field: "id", headerName: "ID", headerClassName: styles.header },
    {
      field: "nombre",
      headerName: "Nombre",
      headerClassName: styles.header,
      flex: 1,

      renderCell: (params) => {
        return (
          <div className={styles.nameContainer}>
            <Typography variant="h12">{params.value}</Typography>
          </div>
        );
      },
    },
    {
      field: "proyecto",
      headerName: "Proyecto",
      headerClassName: styles.header,
      flex: 1,
    },
    {
      field: "prioridad",
      headerName: "Prioridad",
      headerClassName: styles.header,

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
    {
      field: "inicio",
      headerName: "Inicio",
      headerClassName: styles.header,
    },
    {
      field: "limite",
      headerName: "Limite",
      headerClassName: styles.header,
    },
    {
      field: "estado",
      headerName: "Estado",
      headerClassName: styles.header,
      renderCell: (params) => {
        return (
          <div className={styles.statusContainer}>
            <Checkbox
              className={styles.checkbox}
              checked={params.value}
              disabled
            />
          </div>
        )
      }
    },
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
        task.proyecto_nombre
      )
    );

    setRowData(rows);
    setIsLoading(false);
  }, [projects, tasks]);

  return (
    <Box className={styles.background}>
      <Grid2 container>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Sidebar />
        </Grid2>

        <Grid2 size={{ xs: 12, md: 9 }} className={styles.content}>
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
