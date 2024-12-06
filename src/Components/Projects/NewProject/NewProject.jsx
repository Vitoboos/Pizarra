// React
import { useState, useEffect } from "react";

// Material UI
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";

// Hoja de Estilos
import styles from "./styles/NewProject.module.css";

// Dependencias
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";

// Iconos
import BallotIcon from "@mui/icons-material/Ballot";
import ClearIcon from "@mui/icons-material/Clear";
import DescriptionIcon from "@mui/icons-material/Description";
import InfoIcon from "@mui/icons-material/Info";
import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from "@mui/icons-material/Search";

// Componentes
import Sidebar from "../../Sidebar/Sidebar";

// Componentes Internos

const Nombre = ({
  nombre,
  setNombre,
}) => (
  <Grid2 className={styles.fullWidth} size={{ xs: 12, md: 12 }}>
    <TextField
      required
      label="Nombre"
      placeholder="Nombre del Proyecto"
      fullWidth
      value={nombre}
      onChange={(e) => setNombre(e.target.value)}
    />
  </Grid2>
);

const FechaInicio = ({
  setInicio,
  selectedInicio,
  setSelectedInicio
}) => (

  
  <Grid2 className={styles.halfWidth} size={{ xs: 12, md: 6 }}>
    <InputLabel> Fecha de Inicio </InputLabel>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker value={selectedInicio} onChange={(date) => setInicio(date.format("YYYY-MM-DD"), setSelectedInicio(date))} />
    </LocalizationProvider>
  </Grid2>
);

const FechaLimite = ({
  setLimite,
  selectedLimite,
  setSelectedLimite
}) => (
  <Grid2 className={styles.halfWidth} size={{ xs: 12, md: 6 }}>
    <InputLabel> Fecha de Cierre </InputLabel>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker value={selectedLimite} onChange={(date) => setLimite(date.format("YYYY-MM-DD"), setSelectedLimite(date))} />
    </LocalizationProvider>
  </Grid2>
);

const Prioridad = ({
  prioridad,
  setPrioridad
}) => (
  <Grid2 className={styles.fullWidth} size={{ xs: 12, md: 12 }}>
    <InputLabel> Prioridad </InputLabel>
    <Rating
      name="simple-controlled"
      max={3}
      size="large"
      value={prioridad}
      onChange={(e) => setPrioridad(parseInt(e.target.value))}
    />
  </Grid2>
);

const Proveedores = ({
  proveedores,
  selectedProveedores,
  updateProveedor,
  removeProveedor,
}) => (
  <Grid2 className={styles.halfWidth} size={{ xs: 12, md: 6 }}>
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
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 200,
              overflowY: "auto",
            },
          },
        }}
      >
        {proveedores.map((proveedor) => (
          <MenuItem key={proveedor.id} value={proveedor}>
            {proveedor.nombre}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <Card
      className={styles.list}
      onClick={() => {
        console.log(selectedProveedores);
      }}
    >
      {selectedProveedores.length < 0 ? (
        <CardContent>Sin Asignar</CardContent>
      ) : (
        <CardContent>
          {selectedProveedores.map((proveedor) => (
            <Container className={styles.item} key={proveedor.id}>
              <Typography className={styles.name}>
                {proveedor.nombre}
              </Typography>
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
);

const Departamentos = ({
  departamentos,
  selectedDepartamentos,
  updateDepartamento,
  removeDepartamento,
}) => (
  <Grid2 className={styles.halfWidth} size={{ xs: 12, md: 6 }}>
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
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 200,
              overflowY: "auto",
            },
          },
        }}
      >
        {departamentos.map((departamento) => (
          <MenuItem key={departamento.id} value={departamento}>
            {departamento.nombre}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <Card
      className={styles.list}
      onClick={() => console.log(selectedDepartamentos)}
    >
      {selectedDepartamentos.length < 0 ? (
        <CardContent>Sin Asignar</CardContent>
      ) : (
        <CardContent>
          {selectedDepartamentos.map((departamento) => (
            <Container className={styles.item} key={departamento.id}>
              <Typography className={styles.name}>
                {departamento.nombre}
              </Typography>
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
);

const Observaciones = ({
  observaciones,
  setObservaciones
}) => (
  <Grid2 className={styles.fullWidth} size={{ xs: 12, md: 12 }}>
    <TextField
      label="Observaciones"
      placeholder="Observaciones del Proyecto"
      multiline
      className={styles.textarea}
      value={observaciones}
      onChange={(e) => setObservaciones(e.target.value)}
    />
  </Grid2>
);

function NewProject() {
  const [currentTab, setCurrentTab] = useState(0);
  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  // const [proyecto, setProyecto] = useState(null);
  const [nombre, setNombre] = useState("");
  const [inicio, setInicio] = useState(dayjs().format("YYYY-MM-DD"));
  const [limite, setLimite] = useState(dayjs().format("YYYY-MM-DD"));
  const [prioridad, setPrioridad] = useState(0);
  const [departamentos, setDepartamento] = useState([]);
  const [proveedores, setProveedor] = useState([]);
  const [observaciones, setObservaciones] = useState("");

  // FECHAS, PROVEEDORES Y DEPARTAMENTOS SELECCIONADOS
  const [selectedInicio, setSelectedInicio] = useState(dayjs());
  const [selectedLimite, setSelectedLimite] = useState(dayjs());
  const [selectedProveedores, setSelectedProveedores] = useState([]);
  const [selectedDepartamentos, setSelectedDepartamentos] = useState([]);

  // ACTUALIZAR ESTADOS

  const updateProveedor = (proveedor) => {
    if (selectedProveedores.includes(proveedor)) {
      setSelectedProveedores(selectedProveedores.filter((p) => p !== proveedor));
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

  // FUNCIONES DE GUARDADO

  const clearForm = () => {
    setNombre("");
    setInicio("");
    setLimite("");
    setPrioridad(0);
    setSelectedInicio(null);
    setSelectedLimite(null);
    setSelectedProveedores([]);
    setSelectedDepartamentos([]);
    setObservaciones("");
  };

  const saveProject = async () => {
    try {
      const requestBody = {
        nombre,
        estado: "Por Iniciar",
        inicio,
        limite,
        prioridad,
        departamentos: selectedDepartamentos.map(
          (departamento) => departamento.id
        ),
        proveedores: selectedProveedores.map((proveedor) => proveedor.id),
        observaciones,
      };

      console.log("Request Body:", requestBody);

      const response = await fetch("http://localhost:8000/api/v1/proyectos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }); 

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error Data:", errorData);
        throw new Error(`Error: ${errorData.message || response.statusText}`);
      }

      const data = await response.json();
      console.log("Project saved successfully:", data);
      alert("Proyecto guardado exitosamente");

      clearForm();

    } catch (error) {
      console.error("Failed to save project:", error)
      alert("Ha ocurrido un error");
      ;
    }
  };

  return (
    <Box className={styles.background}>
      <Grid2 container>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Sidebar />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 9 }} className={styles.content}>
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
                  <Nombre nombre={nombre} setNombre={setNombre} />
                  <FechaInicio setInicio={setInicio} selectedInicio={selectedInicio} setSelectedInicio={setSelectedInicio}/>
                  <FechaLimite setLimite={setLimite} selectedLimite={selectedLimite} setSelectedLimite={setSelectedLimite}/>
                  <Prioridad prioridad={prioridad} setPrioridad={setPrioridad} />
                </Grid2>
              </Box>
            )}

            {currentTab === 1 && (
              <Box value={1} index={1} className={styles.frame}>
                <Grid2 container className={styles.container}>
                  <Proveedores
                    proveedores={proveedores}
                    selectedProveedores={selectedProveedores}
                    updateProveedor={updateProveedor}
                    removeProveedor={removeProveedor}
                  />
                  <Departamentos
                    departamentos={departamentos}
                    selectedDepartamentos={selectedDepartamentos}
                    updateDepartamento={updateDepartamento}
                    removeDepartamento={removeDepartamento}
                  />
                </Grid2>
              </Box>
            )}

            {currentTab === 2 && (
              <Box value={2} index={2} className={styles.frame}>
                <Grid2 container className={styles.container}>
                  <Observaciones observaciones={observaciones} setObservaciones={setObservaciones}/>
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

export default NewProject;
