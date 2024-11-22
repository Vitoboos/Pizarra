// React
import { useState, useEffect } from "react";

// Material UI
import { Box, Card, CardContent, CardMedia, CircularProgress, LinearProgress , Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";

// Hoja de Estilos 

import styles from "./styles/Home.module.css";

// Dependencias
import dayjs from "dayjs";

// Iconos
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PendingIcon from "@mui/icons-material/Pending";
import RocketIcon from "@mui/icons-material/Rocket";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import TaskIcon from '@mui/icons-material/Task';
import TimerOffIcon from "@mui/icons-material/TimerOff";
import WarningIcon from "@mui/icons-material/Warning";

// Componentes 
import Sidebar from "../Sidebar/Sidebar";

// Componentes Internos

const StatCard = ({ icon: Icon, color, title, count,  }) => (
  <Card className={styles.card}>
    <CardMedia>
      <Icon className={styles.icon} style={{ color: color }} />
    </CardMedia>
    <CardContent>
      <Typography>
        {count} {title}
      </Typography>
    </CardContent>
  </Card>
);

const OverviewCard = ({ icon: Icon, color, title, count }) => (
  <Card className={styles.card}>
    <CardMedia>
      <Icon className={styles.icon} style={{ color: color }}/>
    </CardMedia>
    <CardContent>
      <LinearProgress  className={styles.progress} variant="determinate" value={count} style={{ color: color }} />
      <Typography> {count}% {title}</Typography>
    </CardContent>
  </Card>
);


function Home() {
  const [data, setData] = useState({ proyectos: [], tareas: [] });
  const [stats, setStats] = useState({
    iniciar: 0,
    curso: 0,
    suspendido: 0,
    finalizado: 0,
    pendiente: 0,
    demorado: 0,
  });

  const fetchData = async () => {
    const [proyectosResponse, tareasResponse] = await Promise.all([
      fetch("http://localhost:8000/api/v1/proyectos/"),
      fetch("http://localhost:8000/api/v1/tareas/"),
    ]);

    const [proyectos, tareas] = await Promise.all([
      proyectosResponse.json(),
      tareasResponse.json(),
    ]);

    setData({ proyectos, tareas });
  };

  const createStats = () => {
    const counts = {
      proyectos: data.proyectos.length,
      tareas: data.tareas.length,
      iniciar: 0,
      curso: 0,
      suspendido: 0,
      finalizado: 0,
      pendiente: 0,
      demorado: 0,
    };

    data.proyectos.forEach((proyecto) => {
      switch (proyecto.estado) {
        case "Por Iniciar":
          counts.iniciar++;
          break;
        case "En Curso":
          counts.curso++;
          break;
        case "Suspendido":
          counts.suspendido++;
          break;
        case "Finalizado":
          counts.finalizado++;
          break;
        default:
          break;
      }
    });

    data.tareas.forEach((tarea) => {
      if (!tarea.estado) counts.pendiente++;
      if (tarea.limite < dayjs().format("YYYY-MM-DD")) counts.demorado++;
    });

    setStats(counts);
    console.log(counts);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    createStats();
  }, [data]);

  return (
    <Box className={styles.background}>
      <Grid2 container className={styles.container}>
        {/* Sidebar */}
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Sidebar />
        </Grid2>
        {/* Content */}
        <Grid2 size={{ xs: 12, md: 6 }} className={styles.content}>
          <Box className={styles.section}>
            <Grid2 container className={styles.container} spacing={2}>
              <Grid2 className={styles.grid}  size={{ xs: 12, md: 3 }}>
                <StatCard
                  icon={RocketIcon}
                  color="#2b94c4"
                  title="Proyectos Por Iniciar"
                  count={stats.iniciar}
                />
              </Grid2>

              <Grid2 className={styles.grid} size={{ xs: 12, md: 3 }}>
                <StatCard
                  icon={RocketLaunchIcon}
                  color="#009936"
                  title="Proyectos En Curso"
                  count={stats.curso}
                />
              </Grid2>

              <Grid2 className={styles.grid} size={{ xs: 12, md: 3 }}>
                <StatCard
                  icon={WarningIcon}
                  color="#de5e3e"
                  title="Proyectos Suspendidos"
                  count={stats.suspendido}
                />
              </Grid2>

              <Grid2 className={styles.grid}  size={{ xs: 12, md: 3 }}>
                <StatCard
                  icon={EmojiEventsIcon}
                  color="#fcce26"
                  title="Proyectos Finalizados"
                  count={stats.finalizado}
                />
              </Grid2>

              <Grid2 className={styles.grid} size={{ xs: 12, md: 6 }}>
                <StatCard
                  icon={PendingIcon}
                  color="#2b94c4"
                  title="Tareas Pendientes"
                  count={stats.pendiente}
                />
              </Grid2>

              <Grid2 className={styles.grid}  size={{ xs: 12, md: 6 }}>
                <StatCard
                  icon={TimerOffIcon}
                  color="#de5e3e"
                  title="Tareas Demoradas"
                  count={stats.demorado}
                />
              </Grid2>
            </Grid2>
          </Box>
        </Grid2>

        <Grid2 size={{ xs: 12, md: 3 }} className={styles.content}>
          <Box className={styles.section}>
            <Grid2 container className={styles.container}  spacing={2}>
              <Grid2 className={styles.grid}  size={{ xs: 12, md: 12 }}>
                <OverviewCard
                  icon={AccountTreeIcon}
                  color="#4669b9"
                  title="Completado"
                  count={parseInt(stats.finalizado * 100 / stats.proyectos)}
                />
              </Grid2>

              <Grid2 className={styles.grid}  size={{ xs: 12, md: 12 }}>
                <OverviewCard
                  icon={TaskIcon}
                  color="#4669b9"
                  title="Completado"
                  count={parseInt(stats.pendiente * 100 / stats.tareas)}
                />
              </Grid2>
            </Grid2>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default Home;
