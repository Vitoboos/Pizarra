import { useState } from "react";

import {
  Box,
  Chip,
  CircularProgress,
  Tabs,
  Tab,
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

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

import Sidebar from "../../Sidebar/Sidebar";

import styles from "./styles/ViewProjects.module.css";

import CircleIcon from "@mui/icons-material/Circle";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import TimerIcon from "@mui/icons-material/Timer";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

function ViewProjects() {
  // DATOS TEMPORALES

  const createData = (nombre, estado, progreso, limite) => {
    return {
      nombre,

      estado,

      progreso,

      limite,

      id: Math.random().toString(36).substr(2, 9),
    };
  };

  const rows = [
    createData("Proyecto 1", "En Curso", 50, "12/10/2024"),
    createData("Proyecto 2", "Por Iniciar", 70, "17/11/2024"),
    createData("Proyecto 3", "Suspendido", 70, "22/10/2024"),
    createData("Proyecto 4", "Finalizado", 70, "30/08/2024"),
    createData("Proyecto 5", "En Curso", 40, "15/12/2024"),
    createData("Proyecto 6", "Por Iniciar", 30, "20/01/2025"),
    createData("Proyecto 7", "Suspendido", 60, "10/11/2024"),
    createData("Proyecto 8", "Finalizado", 90, "25/09/2024"),
    createData("Proyecto 9", "En Curso", 20, "05/02/2025"),
    createData("Proyecto 10", "Por Iniciar", 80, "12/03/2025"),
  ];

  // Filtros y paginación

  const [order, setOrder] = useState("asc");

  const [orderBy, setOrderBy] = useState("");

  const [sortedRows, setSortedRows] = useState(rows);

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && order === "asc";

    setOrder(isAsc ? "desc" : "asc");

    setOrderBy(property);

    const sortedData = [...rows].sort((a, b) => {
      const valueA = a[property].toString().toLowerCase();

      const valueB = b[property].toString().toLowerCase();

      let comparison = 0;

      if (valueA > valueB) {
        comparison = 1;
      } else if (valueA < valueB) {
        comparison = -1;
      }

      return isAsc ? comparison : -comparison;
    });

    setSortedRows(sortedData);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));

    setPage(0);
  };

  // Calculate the number of pages

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sortedRows.length) : 0;

  // Calculate start and end indices for current page

  const startIndex = page * rowsPerPage;

  const endIndex = startIndex + rowsPerPage;

  // Slice sortedRows for current page

  const currentPageRows = sortedRows.slice(startIndex, endIndex);

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
                    {" "}
                    <TableRow className={styles.row}>
                      {/* Nombre */}
                      <TableCell className={styles.cell}>
                        {" "}
                        <TableSortLabel
                          active={orderBy === "nombre"}
                          direction={orderBy === "nombre" ? order : "asc"}
                          onClick={() => handleSortRequest("nombre")}
                        >
                          {" "}
                          Nombre{" "}
                        </TableSortLabel>{" "}
                      </TableCell>{" "}
                      {/* Estado */}
                      <TableCell className={styles.cell}>
                        {" "}
                        <TableSortLabel
                          active={orderBy === "estado"}
                          direction={orderBy === "estado" ? order : "asc"}
                          onClick={() => handleSortRequest("estado")}
                        >
                          {" "}
                          <CircleIcon className={styles.icon} /> Estado{" "}
                        </TableSortLabel>{" "}
                      </TableCell>{" "}
                      {/* Progreso */}
                      <TableCell className={styles.cell}>
                        {" "}
                        <TableSortLabel
                          active={orderBy === "progreso"}
                          direction={orderBy === "progreso" ? order : "asc"}
                          onClick={() => handleSortRequest("progreso")}
                        >
                          {" "}
                          <DonutLargeIcon
                            className={styles.icon}
                          /> Progreso{" "}
                        </TableSortLabel>{" "}
                      </TableCell>{" "}
                      {/* Fecha Limite */}
                      <TableCell className={styles.cell}>
                        {" "}
                        <TableSortLabel
                          active={orderBy === "limite"}
                          direction={orderBy === "limite" ? order : "asc"}
                          onClick={() => handleSortRequest("limite")}
                        >
                          {" "}
                          <TimerIcon className={styles.icon} /> Fecha Limite{" "}
                        </TableSortLabel>{" "}
                      </TableCell>{" "}
                    </TableRow>
                  </TableHead>

                  <TableBody className={styles.body}>
                    {currentPageRows.map((row) => (
                      <TableRow key={row.id} className={styles.row}>
                        <TableCell
                          component="th"
                          scope="row"
                          className={styles.cell}
                        >
                          {row.nombre}

                          <ArrowDropDownIcon className={styles.showmore} />
                        </TableCell>

                        <TableCell className={styles.cell}>
                          <Chip
                            color={
                              row.estado === "En Curso"
                                ? "primary"
                                : row.estado === "Suspendido"
                                ? "error"
                                : row.estado === "Por Iniciar"
                                ? "warning"
                                : "success"
                            }
                            label={row.estado}
                          >
                            {" "}
                            {row.estado}{" "}
                          </Chip>
                        </TableCell>

                        <TableCell className={styles.cell}>
                          <Box
                            className={styles.box}
                          >
                            <CircularProgress
                              variant="determinate"
                              value={row.progreso}
                              color="secondary"
                            />
                            <Typography variant="h6" style={{ marginLeft: 8 }} className={styles.progreso}>
                              {row.progreso} %
                            </Typography>
                          </Box>
                        </TableCell>

                        <TableCell className={styles.cell}>
                          <Typography variant="h6"> {row.limite} </Typography>
                        </TableCell>
                      </TableRow>
                    ))}

                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>

                  <TableFooter className={styles.footer}>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        colSpan={4}
                        count={sortedRows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </TableRow>
                  </TableFooter>
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