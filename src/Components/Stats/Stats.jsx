import {
  Box,
  CircularProgress,
  Container,
  Grid2,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import Sidebar from "../Sidebar/Sidebar";
import styles from "./styles/Stats.module.css";

// Iconos
import RocketIcon from "@mui/icons-material/Rocket";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import WarningIcon from "@mui/icons-material/Warning";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

import TimerOffIcon from "@mui/icons-material/TimerOff";
import TodayIcon from "@mui/icons-material/Today";
import NextPlanIcon from "@mui/icons-material/NextPlan";

import PendingIcon from '@mui/icons-material/Pending';

function Stats() {
  return (
    <Box className={styles.background}>
      <Grid2 container>
        <Grid2 size={{ xs: 12, md: 2 }}>
          <Sidebar />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 10 }} className={styles.content}>
          <Box className={styles.mainbox}>
            <Typography className={styles.title} variant="h5">
              Estadisticas
            </Typography>

            <Container>
              <Typography className={styles.header} variant="h6">
                Proyectos
              </Typography>

              <Grid2 container className={styles.section} spacing={2}>
                <Grid2 size={{ xs: 12, md: 6 }} className={styles.article}>
                  <Typography className={styles.header} variant="h6">
                    Pendientes
                  </Typography>
                  <Box>
                    <Grid2 container spacing={2} sx={{ padding: "5px" }}>
                      <Grid2
                        size={{ xs: 12, md: 6 }}
                        className={styles.label}
                        variant="h6"
                      >
                        <IconButton>
                          <RocketIcon className={styles.icon} />
                        </IconButton>
                        Por iniciar
                      </Grid2>
                      <Grid2
                        size={{ xs: 12, md: 6 }}
                        className={styles.label}
                        variant="h6"
                      >
                        <IconButton>
                          <RocketLaunchIcon className={styles.icon} />
                        </IconButton>
                        En curso
                      </Grid2>
                      <Grid2
                        size={{ xs: 12, md: 6 }}
                        className={styles.label}
                        variant="h6"
                      >
                        <IconButton>
                          <WarningIcon className={styles.icon} />
                        </IconButton>
                        Suspendidos
                      </Grid2>
                      <Grid2
                        size={{ xs: 12, md: 6 }}
                        className={styles.label}
                        variant="h6"
                      >
                        <IconButton>
                          <EmojiEventsIcon className={styles.icon} />
                        </IconButton>
                        Finalizados
                      </Grid2>
                    </Grid2>
                  </Box>
                </Grid2>

                <Grid2 size={{ xs: 12, md: 6 }} className={styles.article}>
                  <Typography className={styles.header} variant="h6">
                    Resueltas
                  </Typography>
                  <Box>
                    <Grid2 container spacing={2} sx={{ padding: "5px" }}>
                      <Grid2
                        size={{ xs: 12, md: 4 }}
                        className={styles.label}
                        variant="h6"
                      >
                        <IconButton>
                          <TimerOffIcon className={styles.icon} />
                        </IconButton>
                        Retrasado
                      </Grid2>
                      <Grid2
                        size={{ xs: 12, md: 4 }}
                        className={styles.label}
                        variant="h6"
                      >
                        <IconButton>
                          <TodayIcon className={styles.icon} />
                        </IconButton>
                        Este Mes
                      </Grid2>
                      <Grid2
                        size={{ xs: 12, md: 4 }}
                        className={styles.label}
                        variant="h6"
                      >
                        <IconButton>
                          <NextPlanIcon className={styles.icon} />
                        </IconButton>
                        Proximo Mes
                      </Grid2>
                    </Grid2>
                  </Box>
                </Grid2>
              </Grid2>
            </Container>

            <Container>
              <Typography className={styles.header} variant="h6">
                Tareas
              </Typography>

              <Grid2 container className={styles.section} spacing={2}>
                <Grid2 size={{ xs: 12, md: 6 }} className={styles.article}>
                  <Typography className={styles.header} variant="h6">
                    Pendientes
                  </Typography>
                  <Box>
                    <Grid2 container spacing={2} sx={{ padding: "5px" }}>
                      <Grid2
                        size={{ xs: 12, md: 6 }}
                        className={styles.label}
                        variant="h6"
                      >
                        <IconButton>
                          <CircularProgress  variant="determinate" value={50} className={styles.icon} />
                        </IconButton>
                        X% Completadas
                      </Grid2>
                      <Grid2
                        size={{ xs: 12, md: 6 }}
                        className={styles.label}
                        variant="h6"
                      >
                        <IconButton>
                          <PendingIcon className={styles.icon} />
                        </IconButton>
                        Tareas Pendientes
                      </Grid2>
                    </Grid2>
                  </Box>
                </Grid2>

                <Grid2 size={{ xs: 12, md: 6 }} className={styles.article}>
                  <Typography className={styles.header} variant="h6">
                    Resueltas
                  </Typography>
                  <Box>
                    <Grid2 container spacing={2} sx={{ padding: "5px" }}>
                      <Grid2
                        size={{ xs: 12, md: 4 }}
                        className={styles.label}
                        variant="h6"
                      >
                        <IconButton>
                          <TimerOffIcon className={styles.icon} />
                        </IconButton>
                        Retrasado
                      </Grid2>
                      <Grid2
                        size={{ xs: 12, md: 4 }}
                        className={styles.label}
                        variant="h6"
                      >
                        <IconButton>
                          <TodayIcon className={styles.icon} />
                        </IconButton>
                        Este Mes
                      </Grid2>
                      <Grid2
                        size={{ xs: 12, md: 4 }}
                        className={styles.label}
                        variant="h6"
                      >
                        <IconButton>
                          <NextPlanIcon className={styles.icon} />
                        </IconButton>
                        Proximo Mes
                      </Grid2>
                    </Grid2>
                  </Box>
                </Grid2>
              </Grid2>
            </Container>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default Stats;
