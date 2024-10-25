import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Grid2 from "@mui/material/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import Sidebar from "../Sidebar/Sidebar";
import styles from "./styles/Calendar.module.css";

function Calendar() {
  // Datos Temporales
  const createProject = (nombre, estado, progreso) => {
    return {
      nombre,

      estado,

      progreso,

      id: Math.random().toString(36).substr(2, 9),
    };
  };
  const proyectos = [
    createProject("Proyecto 1", "En Curso", 50),
    // createProject("Proyecto 2", "Por Iniciar", 70),
  ];

  const [active, setActive] = useState(false);

  const createTarea = (nombre, estado) => {
    return {
      nombre,
      estado,
      id: Math.random().toString(36).substr(2, 9),
    };
  };

  const pendientes = [
    createTarea("Tarea A", false),
    createTarea("Tarea B", false),
    createTarea("Tarea C", false),
    createTarea("Tarea D", false),
  ];

  const tareas = [createTarea("Tarea 1", false), createTarea("Tarea 2", false)];

  return (
    <Box className={styles.background}>
      <Grid2 container>
        <Grid2 size={{ xs: 12, md: 2 }}>
          <Sidebar />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 10 }} className={styles.content}>
          <Box className={styles.section}>
            <Typography className={styles.title} variant="h5">
              Planificación
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                className={styles.calendar}
                defaultValue={dayjs()}
                slotProps={{
                  day: {
                    sx: {
                      "&.Mui-selected": {
                        backgroundColor: "#4669b9",
                        color: "white",
                        fontWeight: "bold",
                      },
                    },
                  },
                  today: true,
                }}
              />
            </LocalizationProvider>

            <Box className={styles.dayinfo}>
              <Grid2 container className={styles.container}>
                <Grid2 size={{ xs: 12, md: 12 }}>
                  <Typography className={styles.title} variant="h5">
                    {" "}
                    Fecha{" "}
                  </Typography>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }} className={styles.grid}>
                  <Card className={styles.card}>
                    <CardHeader
                      title="Proyectos"
                      className={styles.header}
                    ></CardHeader>
                    {proyectos.map((proyecto) => (
                      <CardContent>
                        <Box className={styles.data}>
                          <Typography>{proyecto.nombre}</Typography>

                          <Chip
                            size="small"
                            sx={{ ml: 1 }}
                            color={
                              proyecto.estado === "En Curso"
                                ? "primary"
                                : proyecto.estado === "Suspendido"
                                ? "error"
                                : proyecto.estado === "Por Iniciar"
                                ? "warning"
                                : "success"
                            }
                            label={proyecto.estado}
                          >
                            {proyecto.estado}
                          </Chip>
                        </Box>
                        <Typography
                          className={styles.pending}
                          onClick={() => setActive(!active)}
                        >
                          Pendientes
                          {active ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                          {active
                            ? null
                            : pendientes.map((pendiente) => (
                                <Box sx={{ display: "flex" }}>
                                  <Typography key={pendiente.id}>
                                    {pendiente.nombre}
                                  </Typography>
                                  <Checkbox />
                                </Box>
                              ))}
                        </Typography>
                      </CardContent>
                    ))}
                  </Card>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }} className={styles.grid}>
                  <Card className={styles.card}>
                    <CardHeader
                      title="Tareas"
                      className={styles.header}
                    ></CardHeader>
                    <CardContent>
                      {tareas.map((tarea) => (
                        <Box className={styles.data}>
                          <Typography>{tarea.nombre}</Typography> <Checkbox />
                        </Box>
                      ))}
                    </CardContent>
                  </Card>
                </Grid2>
              </Grid2>
            </Box>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default Calendar;
