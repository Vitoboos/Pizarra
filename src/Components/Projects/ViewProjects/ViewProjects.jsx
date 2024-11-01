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

import styles from "./styles/ViewProjects.module.css";

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
  const [rows, setRows] = useState([]);

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

  const [sortOrder, setSortOrder] = useState({
    nombre: "asc",
    estado: "asc",
    progreso: "desc",
    limite: "asc",
  });

  function constructPercentage(nombre) {
    let assigned = tasks.filter((task) => task.proyecto_nombre === nombre);
    let completed = assigned.filter((task) => task.estado === true);
    let percentage = (completed.length / assigned.length) * 100;

    return percentage;
  }

  // CONSTRUCCION DE TABLA

  const createData = (nombre, estado, progreso, limite) => {
    return {
      nombre,
      estado,
      progreso,
      limite,
      id: Math.random().toString(36).substr(2, 9),
      sortKey: "nombre", // Default sort key
      sortOrder: sortOrder.nombre, // Default sort order
    };
  };
  // EFECTOS DE PRIMER RENDERIZADO

  useEffect(() => {
    getProjects();
    getTasks();

    const rows = projects.map((project) =>
      createData(
        project.nombre,
        project.estado,
        constructPercentage(project.nombre),
        project.limite
      )
    );

    setRows(rows);
    setIsLoading(false);
  }, []);

  // Filtros y paginación

  const handleSortChange = (key) => {
    setSortOrder((prevState) => ({
      ...prevState,
      [key]: prevState[key] === "asc" ? "desc" : "asc",
    }));
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
              Proyectos
            </Typography>

            <Box className={styles.frame}>
              <TableContainer component={Paper} className={styles.table}>
                <Table size="small">
                  <TableHead className={styles.header}>
                    <TableRow className={styles.row}>
                      {/* Nombre */}
                      <TableCell className={styles.cell}>
                        <TableSortLabel
                          onClick={() => handleSortChange("nombre")}
                        >
                          Nombre
                          {sortOrder.nombre === "desc" ? (
                            <ArrowDropUpIcon />
                          ) : (
                            <ArrowDropDownIcon />
                          )}
                        </TableSortLabel>
                      </TableCell>

                      {/* Estado */}
                      <TableCell className={styles.cell}>
                        <TableSortLabel
                          onClick={() => handleSortChange("estado")}
                        >
                          Estado
                          {sortOrder.estado === "desc" ? (
                            <ArrowDropUpIcon />
                          ) : (
                            <ArrowDropDownIcon />
                          )}
                        </TableSortLabel>
                      </TableCell>

                      {/* Progreso */}
                      <TableCell className={styles.cell}>
                        <TableSortLabel
                          onClick={() => handleSortChange("progreso")}
                        >
                          Progreso
                          {sortOrder.progreso === "desc" ? (
                            <ArrowDropUpIcon />
                          ) : (
                            <ArrowDropDownIcon />
                          )}
                        </TableSortLabel>
                      </TableCell>

                      {/* Fecha Limite */}
                      <TableCell className={styles.cell}>
                        <TableSortLabel
                          onClick={() => handleSortChange("limite")}
                        >
                          Fecha Limite
                          {sortOrder.limite === "desc" ? (
                            <ArrowDropUpIcon />
                          ) : (
                            <ArrowDropDownIcon />
                          )}
                        </TableSortLabel>
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  {!isLoading && (
                    <TableBody className={styles.body}>
                      {rows.map((row) => {
                        const sortKey = row.sortKey;
                        return (
                          <TableRow key={row.id} className={styles.row}>
                            <TableCell className={styles.cell}>
                              {row[sortKey]}
                            </TableCell>
                            <TableCell className={styles.cell}>
                              {row[sortKey] === "true" ? "Activo" : "Inactivo"}
                            </TableCell>
                            <TableCell className={styles.cell}>
                              {row[sortKey]}%
                            </TableCell>
                            <TableCell className={styles.cell}>
                              {row[sortKey]}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default ViewProjects;
