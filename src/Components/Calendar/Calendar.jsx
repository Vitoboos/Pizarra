import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Checkbox,
  Chip,
  Typography,
  Stack,
} from "@mui/material";
import { useState, useEffect } from "react";
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
  // SOLICITUD DE DATOS A LA API

  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState(dayjs());
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  // Segun la fecha, se obtienen las tareas y proyectos correspondientes
  const [projectData, setProjectData] = useState([]);
  const [taskData, setTaskData] = useState([]);

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

  // EFECTOS DE PRIMER RENDERIZADO
  useEffect(() => {
    getProjects();
    getTasks();
  }, []);
  // EFECTOS DE RENDERIZADO
  useEffect(() => {
    const project = projects.filter(
      (project) => project.limite === date.format("YYYY-MM-DD")
    );
    setProjectData(project);

    const task = tasks.filter(
      (task) => task.limite === date.format("YYYY-MM-DD")
    );
    setTaskData(task);
  }, [projects, tasks, date]);

  // Componentes Internos

  function ProjectItem({ project }) {
    const [isActive, setActivity] = useState(false);
    return (
      <CardContent className={styles.data}>
        <Container
          className={styles.container}
          onClick={() => {
            setActivity(!isActive);
          }}
        >
          <Chip size="small" className={styles.chip} label={project.estado} />
          <Typography className={styles.name}>
            {project.nombre}
            {isActive ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
          </Typography>
        </Container>

        {isActive && (
          <Stack className={styles.stack}>
            {tasks
              .filter((task) => task.proyecto_nombre === project.nombre)
              .map((task) => (
                <Container key={task.id} className={styles.assignment}>
                  <Typography className={styles.task}>{task.nombre}</Typography>

                  <Checkbox
                    className={styles.checkbox}
                    defaultChecked={task.estado}
                  />
                </Container>
              ))}
          </Stack>
        )}
      </CardContent>
    );
  }

  function TaskItem({ task }) {
    return (
      <CardContent className={styles.data}>
        <Stack className={styles.stack}>
          <Container className={styles.assignment}>
            <Typography className={styles.name}>{task.nombre}</Typography>
            <Checkbox
              className={styles.checkbox}
              defaultChecked={task.estado}
            />
          </Container>
        </Stack>
      </CardContent>
    );
  }

  return (
    <Box className={styles.background}>
      <Grid2 container>
        <Grid2 size={{ xs: 12, md: 2 }}>
          <Sidebar />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 10 }} className={styles.content}>
          <Box className={styles.section}>
            <Container className={styles.calendar}>
              <Typography className={styles.title} variant="h5">
                Planificación
              </Typography>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  className={styles.calendar}
                  value={date}
                  onChange={(date) => setDate(date)}
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
            </Container>

            <Container className={styles.details}>
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
                    {projectData.map((project) => (
                      <ProjectItem key={project.id} project={project} />
                    ))}
                  </Card>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }} className={styles.grid}>
                  <Card className={styles.card}>
                    <CardHeader
                      title="Tareas"
                      className={styles.header}
                    ></CardHeader>
                    <CardContent className={styles.data}>
                      {taskData.map((task) => (
                        <TaskItem key={task.id} task={task} />
                      ))}
                    </CardContent>
                  </Card>
                </Grid2>
              </Grid2>
            </Container>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default Calendar;
