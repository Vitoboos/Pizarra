import { useState, useEffect } from "react";
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
import styles from "./styles/Project.module.css";

// Iconos
import ClearIcon from "@mui/icons-material/Clear";
import InfoIcon from "@mui/icons-material/Info";
import BallotIcon from "@mui/icons-material/Ballot";
import DescriptionIcon from "@mui/icons-material/Description";
import SearchIcon from "@mui/icons-material/Search";
import SaveIcon from "@mui/icons-material/Save";

import { useLocation } from "react-router-dom";
import dayjs from "dayjs";

import { useNavigate } from "react-router-dom";

function Project() {
  const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(true);
  // Datos del proyecto
  const [proyecto, setProyecto] = useState({});
  const [nombre, setNombre] = useState("");
  const [estado, setEstado] = useState("");
  const [inicio, setInicio] = useState(dayjs());
  const [limite, setLimite] = useState(dayjs());
  const [prioridad, setPrioridad] = useState(0);
  const [departamentos, setDepartamento] = useState([]);
  const [proveedores, setProveedor] = useState([]);
  const [observaciones, setObservaciones] = useState("");

  // Estado heredados
  const location = useLocation();
  const ID = location.state;

  // Obtener proyecto actual
  const fetchProveedores = async (IDS) => {
    const promises = IDS.map((id) =>
      fetch(`http://localhost:8000/api/v1/proveedores/${id}`).then((res) =>
        res.json()
      )
    );
    const results = await Promise.all(promises);
    results.forEach(updateProveedor);
  };

  const fetchDepartamentos = async (IDS) => {
    const promises = IDS.map((id) =>
      fetch(`http://localhost:8000/api/v1/departamentos/${id}`).then((res) =>
        res.json()
      )
    );
    const results = await Promise.all(promises);
    results.forEach(updateDepartamento);
  };

  const getProyecto = async () => {
    const response = await fetch(
      `http://localhost:8000/api/v1/proyectos/${ID}`
    );
    const data = await response.json();
    setProyecto(data);
    setNombre(data.nombre);
    setEstado(data.estado);
    setInicio(dayjs(data.inicio));
    setLimite(dayjs(data.limite));
    setPrioridad(data.prioridad);
    setObservaciones(data.observaciones);
  };

  // PROVEEDORES Y DEPARTAMENTOS
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

  // PROVEEDORES Y DEPARTAMENTOS SELECCIONADOS
  const [selectedProveedores, setSelectedProveedores] = useState([]);
  const [selectedDepartamentos, setSelectedDepartamentos] = useState([]);

  // Manejo de las pestañas
  const [currentTab, setCurrentTab] = useState(0);
  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  // ACTUALIZAR ESTADOS
  const updateProveedor = (proveedor) => {
    const proveedorId = proveedor.id;

    if (selectedProveedores.some((p) => p.id === proveedorId)) {
      return;
    } else {
      setSelectedProveedores((prevSelected) => [...prevSelected, proveedor]);
    }
  };

  const removeProveedor = (proveedor) => {
    setSelectedProveedores(selectedProveedores.filter((p) => p !== proveedor));
  };

  const updateDepartamento = (departamento) => {
    const departamentoId = departamento.id;
    if (selectedDepartamentos.some((p) => p.id === departamentoId)) {
      return;
    } else {
      setSelectedDepartamentos((prevSelected) => [
        ...prevSelected,
        departamento,
      ]);
    }
  };

  const removeDepartamento = (departamento) => {
    setSelectedDepartamentos(
      selectedDepartamentos.filter((p) => p !== departamento)
    );
  };

  // EFECTOS DE PRIMER RENDERIZADO
  useEffect(() => {
    getProveedores();
    getDepartamentos();
    getProyecto();
  }, []);

  useEffect(() => {
    if (Object.keys(proyecto).length > 0) {
      fetchProveedores(proyecto.proveedores);
      fetchDepartamentos(proyecto.departamentos);
    }
  }, [proyecto]);

  // FUNCIONES DE GUARDADO

  const editProject = async (ID) => {
    try {
      const requestBody = {
        nombre,
        estado,
        inicio: inicio.format("YYYY-MM-DD"),
        limite: limite.format("YYYY-MM-DD"),
        prioridad,
        departamentos: selectedDepartamentos.map(
          (departamento) => departamento.id
        ),
        proveedores: selectedProveedores.map((proveedor) => proveedor.id),
        observaciones,
      };

      console.log("Request Body:", requestBody);

      const response = await fetch(
        `http://localhost:8000/api/v1/proyectos/${ID}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error Data:", errorData);
        throw new Error(`Error: ${errorData.message || response.statusText}`);
      }

      const data = await response.json();
      console.log("Project updated successfully:", data);
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  };

  const deleteProject = async (ID) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/proyectos/${ID}/`,
        {
          method: "DELETE",
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error Data:", errorData);
        throw new Error(`Error: ${errorData.message || response.statusText}`);
      }
  
      if (response.status === 204) {
        console.log("Project deleted successfully, no content returned.");
      } else {
        const data = await response.json(); 
        console.log("Project deleted successfully:", data);
      }
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  
    navigate("/proyectos");
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
              {nombre}
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
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </Grid2>

                  <Grid2 size={{ xs: 12, md: 6 }} className={styles.dates}>
                    <InputLabel> Fecha de Inicio </InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={inicio}
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
                    <FormControl>
                      <InputLabel> Estado </InputLabel>
                      <Select
                        value={estado}
                        className={styles.select}
                        onChange={(e) => setEstado(e.target.value)}
                      >
                        <MenuItem value="Por Iniciar">Por Iniciar</MenuItem>
                        <MenuItem value="En Curso">En Curso</MenuItem>
                        <MenuItem value="Finalizado">Finalizado</MenuItem>
                        <MenuItem value="Suspendido">Suspendido</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid2>

                  <Grid2 size={{ xs: 12, md: 12 }} className={styles.rating}>
                    <InputLabel> Prioridad </InputLabel>
                    <Rating
                      name="simple-controlled"
                      value={prioridad}
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
                          <MenuItem key={proveedor.id} value={proveedor}>
                            {proveedor.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Card
                      className={styles.basket}
                      onClick={() => console.log(selectedProveedores)}
                    >
                      {selectedProveedores.length === 0 ? (
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
                                onClick={() => removeProveedor(proveedor)}
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
                          <MenuItem key={departamento.id} value={departamento}>
                            {departamento.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Card
                      className={styles.basket}
                      onClick={() => console.log(selectedDepartamentos)}
                    >
                      {selectedDepartamentos.length === 0 ? (
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
                      value={observaciones}
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
                    onClick={() => editProject(ID)}
                  >
                    Editar
                  </Button>

                  <Button
                    startIcon={<SaveIcon />}
                    variant="contained"
                    color="error"
                    className={styles.save}
                    onClick={() => deleteProject(ID)}
                  >
                    Eliminar
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

export default Project;
