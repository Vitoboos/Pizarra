import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Rating,
  Tabs,
  Tab,
  TextField,
  Typography,
  Select,
  CardContent,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import Sidebar from "../../Sidebar/Sidebar";
import styles from "./styles/Projects.module.css";

import InfoIcon from "@mui/icons-material/Info";
import BallotIcon from "@mui/icons-material/Ballot";
import DescriptionIcon from "@mui/icons-material/Description";
import SearchIcon from "@mui/icons-material/Search";
import SaveIcon from "@mui/icons-material/Save";
// Iconos

function Projects() {
  const [currentTab, setCurrentTab] = useState(0);
  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const [departamentos, setDepartamento] = useState([]);
  const [proveedores, setProveedor] = useState([]);

  return (
    <Box className={styles.background}>
      <Grid2 container>
        <Grid2 size={{ xs: 12, md: 2 }}>
          <Sidebar />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 10 }} className={styles.content}>
          <Box className={styles.section}>
            <Typography className={styles.title} variant="h5">
              Nuevo Proyecto
            </Typography>

            <Tabs
              variant="fullWidth"
              value={currentTab}
              onChange={handleChange}
            >
              <Tab
                label="Informacion"
                icon={<InfoIcon />}
                iconPosition="start"
              />
              <Tab
                label="Requerimientos"
                icon={<BallotIcon />}
                iconPosition="start"
              />
              <Tab
                label="Observaciones"
                icon={<DescriptionIcon />}
                iconPosition="start"
              />
            </Tabs>

            {currentTab === 0 && (
              <Box value={0} index={0} className={styles.frame}>
                <Grid2 container className={styles.container}>
                  <Grid2 size={{ xs: 12, md: 12 }} className={styles.input}>
                    <TextField
                      required
                      label="Nombre"
                      placeholder="Nombre del Proyecto"
                      fullWidth
                    />
                  </Grid2>

                  <Grid2 size={{ xs: 12, md: 6 }} className={styles.dates}>
                    <InputLabel> Fecha de Inicio </InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker />
                    </LocalizationProvider>
                  </Grid2>

                  <Grid2 size={{ xs: 12, md: 6 }} className={styles.dates}>
                    <InputLabel> Fecha de Cierre </InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker />
                    </LocalizationProvider>
                  </Grid2>

                  <Grid2 size={{ xs: 12, md: 12 }} className={styles.rating}>
                    <InputLabel> Prioridad </InputLabel>
                    <Rating name="simple-controlled" max={3} size="large" />
                  </Grid2>
                </Grid2>
              </Box>
            )}

            {currentTab === 1 && (
              <Box value={1} index={1} className={styles.frame}>
                <Grid2 container className={styles.container}>
                  <Grid2 size={{ xs: 12, md: 6 }} className={styles.dropdown}>
                    <Typography variant="h6" className={styles.label}>
                      Proveedores
                    </Typography>
                    <TextField
                      className={styles.search}
                      label="Buscar"
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                    <FormControl>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value="Sin Asignar"
                        className={styles.select}
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                    <Card className={styles.basket}>
                      {proveedores.length > 0 ? (
                        "Algo Asignado"
                      ) : (
                        <CardContent> Sin Asignar </CardContent>
                      )}
                    </Card>
                  </Grid2>

                  <Grid2 size={{ xs: 12, md: 6 }} className={styles.dropdown}>
                    <Typography variant="h6" className={styles.label}>
                      Departamentos
                    </Typography>
                    <TextField
                      className={styles.search}
                      label="Buscar"
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                    <FormControl>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value="Sin Asignar"
                        className={styles.select}
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                    <Card className={styles.basket}>
                      {proveedores.length > 0 ? (
                        "Algo Asignado"
                      ) : (
                        <CardContent> Sin Asignar </CardContent>
                      )}
                    </Card>
                  </Grid2>
                </Grid2>
              </Box>
            )}

            {currentTab === 2 && (
              <Box value={2} index={2} className={styles.frame}>
                <Grid2 container className={styles.container}>
                  <Grid2 size={{ xs: 12, md: 12 }} className={`${styles.input} ${styles.observations}`}>
                    <TextField
                      label="Observaciones"
                      placeholder="Observaciones del Proyecto"
                      multiline
                      className={styles.textarea}
                    />
                  </Grid2>
                </Grid2>

                <div className={styles.buttonContainer}>
                  <Button
                    startIcon={<SaveIcon />}
                    variant="contained"
                    color="success"
                    className={styles.save}
                  >
                    Guardar
                  </Button>
                </div>
              </Box>
            )}
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default Projects;
