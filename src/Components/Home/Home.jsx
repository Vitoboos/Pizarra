import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./styles/Home.module.css";

// Iconos

import DoneIcon from "@mui/icons-material/Done";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import RocketIcon from "@mui/icons-material/Rocket";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import WarningIcon from "@mui/icons-material/Warning";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PendingIcon from '@mui/icons-material/Pending';
import TimerOffIcon from "@mui/icons-material/TimerOff";

function Home() {
  return (
    <Box className={styles.background}>
      <Grid2 container className={styles.container}>
        {/* Sidebar */}
        <Grid2 size={{ xs: 12, md: 2 }}>
          <Sidebar />
        </Grid2>
        {/* Contenido */}
        <Grid2 size={{ xs: 12, md: 10 }} className={styles.content}>
          <Box className={styles.section}>
            <Grid2 container spacing={3} className={styles.grid}>
              {/*  */}

              <Grid2
                size={{ xs: 12, md: 8 }}
                className={`${styles.frame} ${styles.chores}`}
              >
                {/* Contenedor de Proyectos */}
                <Box className={styles.deck}>
                  <Grid2 container spacing={4} className={styles.grid}>
                    {/* Proyectos en curso */}
                    <Grid2 size={{ xs: 3, md: 3 }} className={styles.box}>
                      <Card className={styles.card}>
                        <CardMedia>
                          <RocketIcon className={styles.icon} />
                        </CardMedia>

                        <CardContent>
                          <Typography> X Proyectos Por Iniciar </Typography>
                        </CardContent>
                      </Card>
                    </Grid2>

                    {/* Proyectos pendientes */}
                    <Grid2 size={{ xs: 3, md: 3 }} className={styles.box}>
                      <Card className={styles.card}>
                        <CardMedia>
                          <RocketLaunchIcon className={styles.icon} />
                        </CardMedia>
                        <CardContent>
                          <Typography> X Proyectos En Curso </Typography>
                        </CardContent>
                      </Card>
                    </Grid2>

                    {/* Proyectos completados */}
                    <Grid2 size={{ xs: 3, md: 3 }} className={styles.box}>
                      <Card className={styles.card}>
                        <CardMedia>
                          <WarningIcon className={styles.icon} />
                        </CardMedia>
                        <CardContent>
                          <Typography> X Proyectos Suspendidos </Typography>
                        </CardContent>
                      </Card>
                    </Grid2>

                    {/* Proyectos suspendidos */}
                    <Grid2 size={{ xs: 3, md: 3 }} className={styles.box}>
                      <Card className={styles.card}>
                        <CardMedia>
                          <EmojiEventsIcon className={styles.icon} />
                        </CardMedia>
                        <CardContent>
                          <Typography> X Proyectos Finalizados </Typography>
                        </CardContent>
                      </Card>
                    </Grid2>
                  </Grid2>
                </Box>

                {/* Contenedor de Tareas */}
                <Box className={styles.deck}>
                  <Grid2 container spacing={4} className={styles.grid}>
                    {/* Proyectos Por Iniciar */}
                    <Grid2 size={{ xs: 3, md: 6 }} className={styles.box}>
                      <Card className={styles.card}>
                        <CardMedia>
                          <PendingIcon className={styles.icon} />
                        </CardMedia>

                        <CardContent>
                          <Typography> X Tareas Pendientes </Typography>
                        </CardContent>
                      </Card>
                    </Grid2>


                    {/* Proyectos completados */}
                    <Grid2 size={{ xs: 6, md: 6 }} className={styles.box}>
                      <Card className={styles.card}>
                        <CardMedia>
                          <TimerOffIcon className={styles.icon} />
                        </CardMedia>
                        <CardContent>
                          <Typography> X Tareas Demoradas </Typography>
                        </CardContent>
                      </Card>
                    </Grid2>
                  </Grid2>
                </Box>
              </Grid2>
              {/*  */}

              {/*  */}
              <Grid2
                size={{ xs: 12, md: 4 }}
                className={`${styles.frame} ${styles.actions}`}
              >
                <Card className={`${styles.card} ${styles.large}`}>
                  {/* En Curso */}
                  <CardMedia>
                    <CalendarMonthIcon className={styles.icon} />
                  </CardMedia>

                  <CardContent>
                    <Typography> Planificación </Typography>
                  </CardContent>
                </Card>

                {/* Pendientes */}
                <Card className={`${styles.card} ${styles.blank}`}></Card>
                {/* Completados */}
                <Card className={`${styles.card} ${styles.large}`}>
                  <CardMedia>
                    <QueryStatsIcon
                      className={styles.icon}
                      sx={{ color: "black" }}
                    />
                  </CardMedia>
                  <CardContent>
                    <Typography> Estadisticas </Typography>
                  </CardContent>
                </Card>
              </Grid2>
            </Grid2>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default Home;
