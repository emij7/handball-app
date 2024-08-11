"use client";
import GG from "@/components/GG";
import {
  Button,
  Grid,
  Input,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";

const NuevoEquipo = () => {
  const [nombreEquipo, setNombreEquipo] = useState("");
  const [loading, setLoading] = useState(false);
  const [jugadores, setJugadores] = useState([
    {
      nombre: "",
      posicion: "jugador",
    },
  ]);

  const handleNombreEquipoChange = (e) => {
    setNombreEquipo(e.target.value);
  };

  const handleJugadorChange = (e, index) => {
    const newJugadores = [...jugadores];
    newJugadores[index].nombre = e.target.value;
    setJugadores(newJugadores);
  };

  const handleAgregarJugador = () => {
    setJugadores([...jugadores, { nombre: "", posicion: "jugador" }]);
  };

  const handleGuardarEquipo = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const docRef = doc(db, "teams", nombreEquipo); // Specify the document ID as "doc1"
      await setDoc(docRef, {
        nombreEquipo: nombreEquipo,
        jugadores: jugadores,
      });

      // Optionally, display a success message
      console.log("Team added successfully!");
    } catch (error) {
      console.error("Error adding team:", error);
    } finally {
      setLoading(false);
      window.location.href = "/";
    }
  };

  return (
    <Grid container spacing={4} p={4}>
      <GG>
        <label htmlFor="nombreEquipo">Nombre Equipo:</label>
      </GG>
      <GG>
        <TextField
          type="text"
          id="nombreEquipo"
          value={nombreEquipo}
          onChange={handleNombreEquipoChange}
          variant="filled"
        />
      </GG>
      <GG>
        <h3>Jugadores:</h3>
      </GG>
      {jugadores.map((jugador, index) => (
        <React.Fragment key={index}>
          <GG size={2}></GG>

          <GG size={4}>
            <TextField
              type="text"
              variant="filled"
              value={jugador.nombre}
              onChange={(e) => handleJugadorChange(e, index)}
            />
          </GG>
          <GG size={4}>
            <Select
              value={jugador.posicion}
              onChange={(e) => {
                const newJugadores = [...jugadores];
                newJugadores[index].posicion = e.target.value;
                setJugadores(newJugadores);
              }}
            >
              <MenuItem value="jugador">Jugador de cancha</MenuItem>
              <MenuItem value="arquero">Arquero</MenuItem>
            </Select>
          </GG>
          <GG size={2}></GG>
        </React.Fragment>
      ))}

      <GG>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAgregarJugador}
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
      <GG size={6}>
        <Button
          variant="contained"
          onClick={handleGuardarEquipo}
          disabled={loading}
        >
          Guardar Equipo
        </Button>
      </GG>
    </Grid>
  );
};

export default NuevoEquipo;
