"use client";
import GG from "@/components/GG";
import {
  Button,
  Grid,
  Input,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { getCookie, setCookie } from "cookies-next";

const Equipo = () => {
  const [nombreEquipo, setNombreEquipo] = useState("");
  const [loading, setLoading] = useState(false);
  const [jugadores, setJugadores] = useState([]);
  const [nuevoJugador, setNuevoJugador] = useState({
    nombre: "",
    posicion: "jugador",
  });

  useEffect(() => {
    const equipo = getCookie("equipo");
    if (!equipo) {
      window.location.href = "/";
    }
    const parsedEquipo = JSON.parse(equipo);
    setJugadores(parsedEquipo.jugadores);
    setNombreEquipo(parsedEquipo.nombreEquipo);
  }, []);

  const handleSaveJugador = async () => {
    try {
      setLoading(true);
      const equipoRef = doc(db, "teams", nombreEquipo);
      await updateDoc(equipoRef, {
        jugadores: arrayUnion(nuevoJugador),
      });
      setJugadores([...jugadores, nuevoJugador]);
      const previousEquipo = getCookie("equipo");
      const parsedPreviousEquipo = JSON.parse(previousEquipo);
      parsedPreviousEquipo.jugadores.push(nuevoJugador);
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7);
      setCookie("equipo", JSON.stringify(parsedPreviousEquipo), {
        expires: expirationDate,
      });
      setNuevoJugador({ nombre: "", posicion: "jugador" });
    } catch (error) {
      console.error("Error agregando jugador: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container spacing={4} p={4}>
      <GG>
        <Typography variant="h4">Equipo: {nombreEquipo}</Typography>
      </GG>
      <GG>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            window.location.href = "/nuevo-partido";
          }}
        >
          Nuevo Partido
        </Button>
      </GG>
      <GG>
        <h3>Jugadores:</h3>
      </GG>
      {jugadores.map((jugador, index) => (
        <GG key={index} size={12}>
          <Typography type="text">{jugador.nombre}</Typography>
          <Button variant="contained" color="success">
            Estadísticas
          </Button>
        </GG>
      ))}

      <GG size={3}>
        <TextField
          type="text"
          value={nuevoJugador.nombre}
          onChange={(e) =>
            setNuevoJugador({ ...nuevoJugador, nombre: e.target.value })
          }
          label="Nombre Jugador"
          fullWidth
        />
      </GG>
      <GG size={3}>
        <Select
          value={nuevoJugador.posicion}
          onChange={(e) =>
            setNuevoJugador({ ...nuevoJugador, posicion: e.target.value })
          }
        >
          <MenuItem value="jugador">Jugador de cancha</MenuItem>
          <MenuItem value="arquero">Arquero</MenuItem>
        </Select>
      </GG>

      <GG size={6}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSaveJugador}
          disabled={loading}
        >
          Agregar Jugador
        </Button>
      </GG>

      <GG size={6}>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            window.location.href = "/";
          }}
          disabled={loading}
        >
          Volver
        </Button>
      </GG>
    </Grid>
  );
};

export default Equipo;
