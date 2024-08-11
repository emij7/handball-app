"use client";
import GG from "@/components/GG";
import { db } from "@/firebase";
import { Button, Grid, Typography } from "@mui/material";
import { getCookie, setCookie } from "cookies-next";
import React from "react";

const currentYear = new Date().getFullYear();
const ElegirJugador = ({
  jugadores,
  tipoJugada,
  setElegirJugador,
  setResultado,
  resultado,
}) => {
  const sortedJugadores = [...jugadores]?.sort((a, b) => a.numero - b.numero);
  const jugadaArqueros =
    tipoJugada.titulo === "golContra" || tipoJugada.titulo === "ataja";
  const filteredJugadores =
    tipoJugada.titulo !== "perdida"
      ? jugadaArqueros
        ? sortedJugadores?.filter((jugador) => jugador.posicion === "arquero")
        : sortedJugadores?.filter((jugador) => jugador.posicion !== "arquero")
      : sortedJugadores;
  const addEstadistica = (nombreJugador) => {
    const partidoCookie = getCookie("partido");
    const parsedPartido = JSON.parse(partidoCookie);
    let jugadorEncontrado = parsedPartido.jugadores.find((jugador) => {
      return jugador.nombre === nombreJugador;
    });
    if (!parsedPartido.resultado) {
      parsedPartido.resultado = {
        equipo: 0,
        rival: 0,
      };
    }
    if (tipoJugada.titulo === "golContra") {
      parsedPartido.resultado.rival = (parsedPartido.resultado?.rival || 0) + 1;
      setResultado({ ...resultado, rival: resultado.rival + 1 });
    } else if (tipoJugada.titulo === "gol") {
      if (!parsedPartido.resultado.equipo) {
        parsedPartido.resultado.equipo = 0;
      }
      parsedPartido.resultado.equipo =
        (parsedPartido.resultado?.equipo || 0) + 1;
      setResultado({ ...resultado, equipo: resultado.equipo + 1 });
    }
    if (jugadorEncontrado) {
      if (!jugadorEncontrado[tipoJugada.titulo]) {
        jugadorEncontrado[tipoJugada.titulo] = [];
      }

      jugadorEncontrado[tipoJugada.titulo] = {
        ...jugadorEncontrado[tipoJugada.titulo],
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
