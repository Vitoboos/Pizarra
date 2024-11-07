import { useState, useEffect, useRef } from "react";
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

import ClearIcon from "@mui/icons-material/Clear";
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

  const [nombre, setNombre] = useState("");
  const [inicio, setInicio] = useState("");
  const [limite, setLimite] = useState("");
  const [prioridad, setPrioridad] = useState(0);
  const [departamentos, setDepartamento] = useState([]);
  const [proveedores, setProveedor] = useState([]);
  const [observaciones, setObservaciones] = useState("");

  // PROVEEDORES Y DEPARTAMENTOS SELECCIONADOS
  const [selectedProveedores, setSelectedProveedores] = useState([]);
  const [selectedDepartamentos, setSelectedDepartamentos] = useState([]);

  // ACTUALIZAR ESTADOS

  const updateProveedor = (proveedor) => {
    if (selectedProveedores.includes(proveedor)) {
      setSelectedProveedor(selectedProveedores.filter((p) => p !== proveedor));
      return;
    }

    setSelectedProveedores([...selectedProveedores, proveedor]);
  };

  const removeProveedor = (proveedor) => {
    setSelectedProveedores(selectedProveedores.filter((p) => p !== proveedor));
  };

  const updateDepartamento = (departamento) => {
    if (selectedDepartamentos.includes(departamento)) {
      setSelectedDepartamentos(
        selectedDepartamentos.filter((p) => p !== departamento) // Corrected line
      );
      return;
    }
  
    setSelectedDepartamentos([...selectedDepartamentos, departamento]);
  };

  const removeDepartamento = (departamento) => {
    setSelectedDepartamentos(
      selectedDepartamentos.filter((p) => p !== departamento)
    );
  };

  const getProveedores = async () => {
    const response = await fetch("http://localhost:8000/api/v1/proveedores/");
    const data = await response.json();
    setProveedor(data);
  };

  const getDepartamentos = async () => {
    const response = await fetch("http://localhost:8000/api/v1/departamentos/");
    const data = await response.json();
    setDepartamento(data);
  };

  // EFECTOS DE PRIMER RENDERIZADO
  useEffect(() => {
    getProveedores();
    getDepartamentos();
  }, []);

  // MAS RENDERIZADOS

  // FUNCIONES DE GUARDADO

  const saveProject = async () => {
    try {
      const requestBody = {
        nombre,
        estado: "Por Iniciar",
        inicio,
        limite,
        prioridad,
        departamentos: selectedDepartamentos.map((departamento) => departamento.id),
        proveedores: selectedProveedores.map((proveedor) => proveedor.id),
        observaciones,
      };
  
      console.log("Request Body:", requestBody); // Log the request body
  
      const response = await fetch("http://localhost:8000/api/v1/proyectos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error Data:", errorData); // Log the error data
        throw new Error(`Error: ${errorData.message || response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Project saved successfully:", data);
    } catch (error) {
      console.error("Failed to save project:", error);
    }
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
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </Grid2>

                  <Grid2 size={{ xs: 12, md: 6 }} className={styles.dates}>
                    <InputLabel> Fecha de Inicio </InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        onChange={(date) =>
                          setInicio(date.format("YYYY-MM-DD"))
                        }
                      />
                    </LocalizationProvider>
                  </Grid2>

                  <Grid2 size={{ xs: 12, md: 6 }} className={styles.dates}>
                    <InputLabel> Fecha de Cierre </InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        onChange={(date) =>
                          setLimite(date.format("YYYY-MM-DD"))
                        }
                      />
                    </LocalizationProvider>
                  </Grid2>

                  <Grid2 size={{ xs: 12, md: 12 }} className={styles.rating}>
                    <InputLabel> Prioridad </InputLabel>
                    <Rating
                      name="simple-controlled"
                      max={3}
                      size="large"
                      onChange={(e) => setPrioridad(parseInt(e.target.value))}
                    />
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
                        value=""
                        className={styles.select}
                        onChange={(e) => updateProveedor(e.target.value)}
                      >
                        {proveedores.map((proveedor) => (
                          <MenuItem key={proveedor.url} value={proveedor}>
                            {proveedor.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Card
                      className={styles.basket}
                      onClick={() => {
                        console.log(selectedProveedores);
                      }}
                    >
                      {selectedProveedores.length < 0 ? (
                        <CardContent>Sin Asignar</CardContent>
                      ) : (
                        <CardContent>
                          {selectedProveedores.map((proveedor) => (
                            <Container
                              className={styles.item}
                              key={proveedor.id}
                            >
                              <Typography>{proveedor.nombre}</Typography>
                              <IconButton
                                onClick={() => {
                                  removeProveedor(proveedor);
                                }}
                              >
                                <ClearIcon />
                              </IconButton>
                            </Container>
                          ))}
                        </CardContent>
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
                        value=""
                        className={styles.select}
                        onChange={(e) => updateDepartamento(e.target.value)}
                      >
                        {departamentos.map((departamento) => (
                          <MenuItem key={departamento.url} value={departamento}>
                            {departamento.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Card
                      className={styles.basket}
                      onClick={() => console.log(selectedDepartamentos)}
                    >
                      {selectedDepartamentos.length < 0 ? (
                        <CardContent>Sin Asignar</CardContent>
                      ) : (
                        <CardContent>
                          {selectedDepartamentos.map((departamento) => (
                            <Container
                              className={styles.item}
                              key={departamento.id}
                            >
                              <Typography>{departamento.nombre}</Typography>
                              <IconButton
                                onClick={() => {
                                  removeDepartamento(departamento);
                                }}
                              >
                                <ClearIcon />
                              </IconButton>
                            </Container>
                          ))}
                        </CardContent>
                      )}{" "}
                    </Card>
                  </Grid2>
                </Grid2>
              </Box>
            )}

            {currentTab === 2 && (
              <Box value={2} index={2} className={styles.frame}>
                <Grid2 container className={styles.container}>
                  <Grid2
                    size={{ xs: 12, md: 12 }}
                    className={`${styles.input} ${styles.observations}`}
                  >
                    <TextField
                      label="Observaciones"
                      placeholder="Observaciones del Proyecto"
                      multiline
                      className={styles.textarea}
                      onChange={(e) => setObservaciones(e.target.value)}
                    />
                  </Grid2>
                </Grid2>

                <div className={styles.buttonContainer}>
                  <Button
                    startIcon={<SaveIcon />}
                    variant="contained"
                    color="success"
                    className={styles.save}
                    onClick={() => saveProject()}
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
