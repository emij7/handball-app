"use client";
import GG from "@/components/GG";
import {
  Button,
  Divider,
  Grid,
  Input,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { BorderBottom } from "@mui/icons-material";
import ElegirJugador from "./components/elegirJugador";

const currentYear = new Date().getFullYear();
const Partido = () => {
  const [loading, setLoading] = useState(false);
  const [jugadores, setJugadores] = useState([]);
  const [elegirJugador, setElegirJugador] = useState(false);
  const [tipoJugada, setTipoJugada] = useState({
    titulo: "",
    tipo: "",
  });
  const [resultado, setResultado] = useState({
    equipo: 0,
    rival: 0,
  });

  const getDocsByNombre = async (teamId) => {
    const clausuraRef = collection(db, "teams", teamId, "clausura");
    const q = query(clausuraRef, where("nombre", "==", "emi"));
    const querySnapshot = await getDocs(q);
    const results = querySnapshot.docs.map((doc) => doc.data());
  };

  useEffect(() => {
    const partido = getCookie("partido");
    if (!partido) {
      window.location.href = "/";
    } else {
      const parsedPartidos = JSON.parse(partido);
      getDocsByNombre(parsedPartidos.nombreEquipo);
      const jugadores = parsedPartidos.jugadores;
      setJugadores(jugadores);
    }
  }, [elegirJugador]);

  const limpiarCookiesPartido = () => {
    deleteCookie("partido");
  };

  const elegirTipo = (titulo, tipo) => {
    setTipoJugada({
      titulo: titulo,
      tipo: tipo,
    });
    setElegirJugador(true);
  };

  const handleSavePartido = async () => {
    const partido = getCookie("partido");
    const parsedPartido = JSON.parse(partido);
    try {
      setLoading(true);
      const torneoRef = collection(
        db,
        "teams",
        parsedPartido.nombreEquipo,
        parsedPartido.torneo
      );

      const refNuevoPartido = await addDoc(torneoRef, {
        tipo: "partido",
        goles: parsedPartido.resultado?.equipo || 0,
        golesRival: parsedPartido.resultado?.rival || 0,
        fecha: Timestamp.now(),
      });
      let jugadores = parsedPartido.jugadores;
      for (const jugador of jugadores) {
        await addDoc(torneoRef, {
          ...jugador,
          partidoId: refNuevoPartido.id,
        });
      }

      setLoading(false);
      setElegirJugador(false);
      setCookie("partido", JSON.stringify({}));
      window.location.href = "/equipo";
      console.log("Partido guardado con éxito");
    } catch (error) {}
  };

  return (
    <Grid container spacing={4} p={4}>
      {elegirJugador ? (
        <ElegirJugador
          setElegirJugador={setElegirJugador}
          tipoJugada={tipoJugada}
          jugadores={jugadores}
          setResultado={setResultado}
          resultado={resultado}
        />
      ) : (
        <>
          {/* GOLES A FAVOR */}
          <GG size={4}>GOLES +</GG>
          <GG size={4}>
            <Button
              variant="contained"
              onClick={() => elegirTipo("gol", "6c")}
              color="success"
            >
              6m centro
            </Button>
          </GG>
          <GG size={4}>
            <Button
              variant="contained"
              onClick={() => elegirTipo("gol", "6e")}
              color="success"
            >
              6m ext
            </Button>
          </GG>
          <GG size={4}>
            <Button
              variant="contained"
              onClick={() => elegirTipo("gol", "9")}
              color="success"
            >
              8m/9m+
            </Button>
          </GG>
          <GG size={4}>
            <Button
              variant="contained"
              onClick={() => elegirTipo("gol", "penal")}
              color="success"
            >
              Penal
            </Button>
          </GG>
          <GG size={4}>
            <Button
              variant="contained"
              onClick={() => elegirTipo("gol", "contra")}
              color="success"
            >
              Contra
            </Button>
          </GG>
          <GG
            size={12}
            sx={{
              borderBottom: "1px solid #ddd",
            }}
          ></GG>
          {/* ERRADOS */}
          <GG size={3}>Errados</GG>
          <GG size={3}>
            <Button
              variant="contained"
              onClick={() => elegirTipo("errado", "ataja")}
              color="error"
            >
              Atajó
            </Button>
          </GG>
          <GG size={3}>
            <Button
              variant="contained"
              onClick={() => elegirTipo("errado", "afuera")}
              color="error"
            >
              Afuera
            </Button>
          </GG>
          <GG size={3}>
            <Button
              variant="contained"
              onClick={() => elegirTipo("errado", "penal")}
              color="error"
            >
              Penal
            </Button>
          </GG>

          <GG
            size={12}
            sx={{
              borderBottom: "1px solid #ddd",
            }}
          ></GG>
          {/* Atajadas */}
          <GG size={4}>Atajadas</GG>
          <GG size={4}>
            <Button
              variant="contained"
              onClick={() => elegirTipo("ataja", "6c")}
              color="success"
            >
              6m centro
            </Button>
          </GG>
          <GG size={4}>
            <Button
              variant="contained"
              onClick={() => elegirTipo("ataja", "6e")}
              color="success"
            >
              6m ext
            </Button>
          </GG>
          <GG size={4}>
            <Button
              variant="contained"
              onClick={() => elegirTipo("ataja", "9")}
              color="success"
            >
              8m/9m+
            </Button>
          </GG>
          <GG size={4}>
            <Button
              variant="contained"
              onClick={() => elegirTipo("ataja", "penal")}
              color="success"
            >
              Penal
            </Button>
          </GG>
          <GG size={4}>
            <Button
              variant="contained"
              onClick={() => elegirTipo("ataja", "contra")}
              color="success"
            >
              Contra
            </Button>
          </GG>
          <GG
            size={12}
            sx={{
              borderBottom: "1px solid #ddd",
            }}
          ></GG>
          {/* GOLES CONTRA */}
          <GG size={4}>GOLES -</GG>
          <GG size={4}>
            <Button
              variant="contained"
              onClick={() => elegirTipo("golContra", "6c")}
              color="error"
            >
              6m centro
            </Button>
          </GG>
          <GG size={4}>
            <Button
              variant="contained"
              onClick={() => elegirTipo("golContra", "6e")}
              color="error"
            >
              6m ext
            </Button>
          </GG>
          <GG size={4}>
            <Button
              variant="contained"
              onClick={() => elegirTipo("golContra", "9")}
              color="error"
            >
              8m/9m+
            </Button>
          </GG>
          <GG size={4}>
            <Button
              variant="contained"
              onClick={() => elegirTipo("golContra", "penal")}
              color="error"
            >
              Penal
            </Button>
          </GG>
          <GG size={4}>
            <Button
              variant="contained"
              onClick={() => elegirTipo("golContra", "contra")}
              color="error"
            >
              Contra
            </Button>
          </GG>
          <GG
            size={12}
            sx={{
              borderBottom: "1px solid #ddd",
            }}
          ></GG>
          {/* Perdida */}
          <GG size={4}>Perdida/Recu</GG>
          <GG size={4}>
            <Button
              variant="contained"
              onClick={() => elegirTipo("perdida", "pase")}
              color="error"
            >
              Pase
            </Button>
          </GG>
          <GG size={4}>
            <Button
              variant="contained"
              onClick={() => elegirTipo("perdida", "doble")}
              color="error"
            >
              Doble
            </Button>
          </GG>
          <GG size={4}>
            <Button
              variant="contained"
              onClick={() => elegirTipo("recuperacion", "recuperacion")}
              color="success"
            >
              Recuperó
            </Button>
          </GG>
          <GG size={4}>
            <Button
              variant="contained"
              onClick={() => elegirTipo("perdida", "otro")}
              color="error"
            >
              Otro
            </Button>
          </GG>
          <GG
            size={12}
            sx={{
              borderBottom: "1px solid #ddd",
            }}
          ></GG>
          {/* Sanciones */}

          <GG size={4}>Sanciones</GG>
          <GG size={4}>
            <Button
              variant="contained"
              onClick={() => elegirTipo("sancion", "2m")}
              color="secondary"
            >
              2min
            </Button>
          </GG>
          <GG size={4}>
            <Button
              variant="contained"
              onClick={() => elegirTipo("sancion", "roja")}
              color="secondary"
            >
              Roja
            </Button>
          </GG>
          <GG
            size={12}
            sx={{
              borderBottom: "1px solid #ddd",
            }}
          ></GG>

          <GG size={6}>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                window.location.href = "/";
                limpiarCookiesPartido();
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
              disabled={loading}
              onClick={handleSavePartido}
            >
              Finalizar
            </Button>
          </GG>
        </>
      )}
    </Grid>
  );
};

export default Partido;
