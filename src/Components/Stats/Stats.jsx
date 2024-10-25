import {
    Box,
    Typography,
  } from "@mui/material";
  import Grid2 from "@mui/material/Grid2";
  
  import Sidebar from "../Sidebar/Sidebar";
  import styles from "./styles/Stats.module.css";
  
  // Iconos
  
  function Stats() {
    return (
      <Box className={styles.background}>
        <Grid2 container>
          <Grid2 size={{ xs: 12, md: 2 }}>
            <Sidebar />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 10 }} className={styles.content}>
            <Box className={styles.section}>
              <Typography className={styles.title} variant="h5">
                Estadisticas
              </Typography>
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    );
  }
  
  export default Stats;
  