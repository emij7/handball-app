"use client";
import GG from "@/components/GG";
import {
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";

const currentYear = new Date().getFullYear();
const NuevoPartido = () => {
  const [nombreEquipo, setNombreEquipo] = useState("");
  const [loading, setLoading] = useState(false);
  const [jugadores, setJugadores] = useState([]);
  const [rival, setRival] = useState("");
  const [torneo, setTorneo] = useState("");
  const [partido, setPartido] = useState({
    nombreEquipo: "",
    jugadores: [],
    nombrePartido: "",
  });

  useEffect(() => {
    const equipo = getCookie("equipo");
    if (!equipo) {
      window.location.href = "/";
    }
    const parsedEquipo = JSON.parse(equipo);
    setJugadores(parsedEquipo.jugadores);
    setNombreEquipo(parsedEquipo.nombreEquipo);
    setPartido({
      nombreEquipo: parsedEquipo.nombreEquipo,
      jugadores: parsedEquipo.jugadores,
      nombrePartido: "",
    });
  }, []);

  const onChangeNumero = (index) => (e) => {
    const newJugadores = [...jugadores];
    newJugadores[index].numero = parseInt(e.target.value) || "";
    setJugadores(newJugadores);
    setPartido((prevState) => ({
      ...prevState,
      jugadores: newJugadores,
    }));
  };

  const onStartPartido = () => {
    setLoading(true);
    const jugadoresElegidos = partido?.jugadores?.filter(
      (j) => j.elegido == true
    );
    if (!jugadoresElegidos?.length) {
      alert("Debe seleccionar al menos un jugador.");
      setLoading(false);
      return;
    }
    const partidoData = {
      nombreEquipo: nombreEquipo,
      jugadores: jugadoresElegidos,
      torneo: torneo,
      rival: rival,
    };
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);
    setCookie("partido", partidoData, { expires: expirationDate });
    window.location.href = "/partido";
  };

  return (
    <Grid container spacing={4} p={4}>
      <GG>
        <Typography variant="h4">Equipo: {nombreEquipo}</Typography>
      </GG>
      <GG size={12}>
        <Select
          value={torneo}
          onChange={(e) => setTorneo(e.target.value)}
          displayEmpty
        >
          <MenuItem disabled value="">
            <em>Nombre de torneo</em>
          </MenuItem>
          <MenuItem value="Amistoso">Amistoso</MenuItem>
          <MenuItem value={`Apertura - ${currentYear}`}>
            {`Apertura - ${currentYear}`}{" "}
          </MenuItem>
          <MenuItem
            value={`Clausura - ${currentYear}`}
          >{`Clausura - ${currentYear}`}</MenuItem>
        </Select>
      </GG>
      <GG size={12}>
        <TextField
          value={rival}
          onChange={(e) => setRival(e.target.value)}
          label="Rival"
        >
          {rival && <Typography>{rival}</Typography>}
        </TextField>
      </GG>
      <GG>
        <h3>Jugadores:</h3>
      </GG>
      {jugadores.map((jugador, index) => (
        <GG key={index} size={12} container>
          <Typography>{jugador.nombre}</Typography>
          <Grid xs={2}>
            <TextField
              type="text"
              value={jugador.numero}
              label="N°"
              onChange={onChangeNumero(index)}
            >
              {jugador.numero}
            </TextField>
          </Grid>
          <Grid xs={2}>
            <Button
              variant="contained"
              color={jugador.elegido ? "error" : "success"}
              onClick={() => {
                const newJugadores = [...jugadores];
                newJugadores[index].elegido = !jugador.elegido;
                setJugadores(newJugadores);
                setPartido((prevState) => ({
                  ...prevState,
                  jugadores: newJugadores,
                }));
              }}
            >
              {jugador.elegido ? "X" : "+"}
            </Button>
          </Grid>
        </GG>
      ))}

      <GG size={6}>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            window.location.href = "/";
          }}
          disabled={loading}
        >
          Volver al inicio
        </Button>
      </GG>
      <GG size={6}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            onStartPartido();
          }}
          disabled={!rival || !torneo}
        >
          Empezar
        </Button>
      </GG>
    </Grid>
  );
};

export default NuevoPartido;
