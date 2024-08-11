"use client";
import GG from "@/components/GG";
import { Button, Grid, Typography } from "@mui/material";
import { getCookie, setCookie } from "cookies-next";
import React from "react";

const currentYear = new Date().getFullYear();
const ElegirJugador = ({ jugadores, tipoJugada, setElegirJugador }) => {
  const sortedJugadores = [...jugadores]?.sort((a, b) => a.numero - b.numero);
  const jugadaArqueros =
    tipoJugada.titulo === "golContra" || tipoJugada.titulo === "ataja";
  const filteredJugadores = jugadaArqueros
    ? sortedJugadores?.filter((jugador) => jugador.posicion === "arquero")
    : sortedJugadores?.filter((jugador) => jugador.posicion !== "arquero");

  const addEstadistica = (nombreJugador) => {
    const partidoCookie = getCookie("partido");
    const parsedPartido = JSON.parse(partidoCookie);
    let jugadorEncontrado = parsedPartido.jugadores.find((jugador) => {
      return jugador.nombre === nombreJugador;
    });
    if (jugadorEncontrado) {
      // Ensure the statistics field exists
      if (!jugadorEncontrado[tipoJugada.titulo]) {
        jugadorEncontrado[tipoJugada.titulo] = [];
      }

      // Add new statistic
      jugadorEncontrado[tipoJugada.titulo] = {
        [tipoJugada.tipo]:
          (jugadorEncontrado[tipoJugada.titulo][tipoJugada.tipo] || 0) + 1,
      };
      setCookie("partido", JSON.stringify(parsedPartido));
      setElegirJugador(false);
    } else {
      console.error("Jugador no encontrado");
    }
  };

  return (
    <Grid container spacing={4} p={4}>
      <GG>
        <Typography variant="h4">Elegir jugador</Typography>
      </GG>
      {filteredJugadores?.map((jugador, index) => (
        <GG key={index} size={12} container>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => {
              addEstadistica(jugador.nombre);
            }}
          >
            {(jugador.numero || "") + " - " + jugador.nombre}
          </Button>
        </GG>
      ))}
      <GG size={12}>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            setElegirJugador(false);
          }}
        >
          Volver
        </Button>
      </GG>
    </Grid>
  );
};

export default ElegirJugador;
