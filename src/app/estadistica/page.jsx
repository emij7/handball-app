"use client";
import GG from "@/components/GG";
import { db } from "@/firebase";
import { Button, Grid, Typography } from "@mui/material";
import { getCookie } from "cookies-next";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Equipo = () => {
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(false);
  const [nombreEquipo, setNombreEquipo] = useState("");
  const [estadisticas, setEstadisticas] = useState([]);
  const [data, setData] = useState([]);
  const torneos = ["amistoso", "Clausura - 2024", "Apertura - 2024"];

  useEffect(() => {
    const nombreJugador = getCookie("nombre");
    const equipo = getCookie("equipo");
    if (!equipo) {
      window.location.href = "/";
    }
    const parsedEquipo = JSON.parse(equipo);
    setNombreEquipo(parsedEquipo.nombreEquipo);

    if (nombreJugador) {
      setNombre(nombreJugador);
    } else {
      window.location.href = "/equipo";
    }
  }, []);
  const getDocsByNombre = async () => {
    setLoading(true);
    let allResults = [];

    for (const torneo of torneos) {
      const torneoRef = collection(db, "teams", nombreEquipo, torneo);

      // Query to get documents where the "nombre" field matches the search value
      const q = query(torneoRef, where("nombre", "==", nombre));

      try {
        const querySnapshot = await getDocs(q);

        const results = querySnapshot.docs.map((doc) => doc.data());
        allResults = [...allResults, ...results];
      } catch (error) {
        console.error(`Error querying subcollection ${torneo}:`, error);
      }
    }
    setLoading(false);
    setData(allResults);
  };

  useEffect(() => {
    if (nombre) {
      getDocsByNombre();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nombre]);
  useEffect(() => {
    if (data) {
      const goles9 = data.reduce((acc, curr) => {
        return acc + (curr.gol?.[9] || 0);
      }, 0);
      const goles6c = data.reduce((acc, curr) => {
        return acc + (curr.gol?.["6c"] || 0);
      }, 0);
      const goles6e = data.reduce((acc, curr) => {
        return acc + (curr.gol?.["6e"] || 0);
      }, 0);
      const golesPenal = data.reduce((acc, curr) => {
        return acc + (curr.gol?.["penal"] || 0);
      }, 0);
      const golesContra = data.reduce((acc, curr) => {
        return acc + (curr.gol?.["contra"] || 0);
      }, 0);
      const erradosAtajo = data.reduce((acc, curr) => {
        return acc + (curr.errado?.ataja || 0);
      }, 0);
      const erradoAfuera = data.reduce((acc, curr) => {
        return acc + (curr.errado?.afuera || 0);
      }, 0);
      const erradoPenal = data.reduce((acc, curr) => {
        return acc + (curr.errado?.penal || 0);
      }, 0);
      const ataja6c = data.reduce((acc, curr) => {
        return acc + (curr.ataja?.["6c"] || 0);
      }, 0);
      const ataja6e = data.reduce((acc, curr) => {
        return acc + (curr.ataja?.["6e"] || 0);
      }, 0);
      const ataja9 = data.reduce((acc, curr) => {
        return acc + (curr.ataja?.["9"] || 0);
      }, 0);
      const atajaPenal = data.reduce((acc, curr) => {
        return acc + (curr.ataja?.["penal"] || 0);
      }, 0);
      const atajaContra = data.reduce((acc, curr) => {
        return acc + (curr.ataja?.["contra"] || 0);
      }, 0);
      const golContra6c = data.reduce((acc, curr) => {
        return acc + (curr.golContra?.["6c"] || 0);
      }, 0);
      const golContra6e = data.reduce((acc, curr) => {
        return acc + (curr.golContra?.["6e"] || 0);
      }, 0);
      const golContra9 = data.reduce((acc, curr) => {
        return acc + (curr.golContra?.["9"] || 0);
      }, 0);
      const golContraPenal = data.reduce((acc, curr) => {
        return acc + (curr.golContra?.["penal"] || 0);
      }, 0);
      const golContraContra = data.reduce((acc, curr) => {
        return acc + (curr.golContra?.["contra"] || 0);
      }, 0);
      const perdidaPase = data.reduce((acc, curr) => {
        return acc + (curr.perdida?.pase || 0);
      }, 0);
      const perdidaDoble = data.reduce((acc, curr) => {
        return acc + (curr.perdida?.doble || 0);
      }, 0);
      const perdidaOtro = data.reduce((acc, curr) => {
        return acc + (curr.perdida?.otro || 0);
      }, 0);
      const sancion2m = data.reduce((acc, curr) => {
        return acc + (curr.sancion?.["2m"] || 0);
      }, 0);
      const sancionRoja = data.reduce((acc, curr) => {
        return acc + (curr.sancion?.roja || 0);
      }, 0);
      setEstadisticas({
        goles9: goles9,
        goles6c: goles6c,
        goles6e: goles6e,
        golesPenal: golesPenal,
        golesContra: golesContra,
        erradosAtajo: erradosAtajo,
        erradoAfuera: erradoAfuera,
        erradoPenal: erradoPenal,
        ataja6c: ataja6c,
        ataja6e: ataja6e,
        ataja9: ataja9,
        atajaPenal: atajaPenal,
        atajaContra: atajaContra,
        golContra6c: golContra6c,
        golContra6e: golContra6e,
        golContra9: golContra9,
        golContraPenal: golContraPenal,
        golContraContra: golContraContra,
        perdidaPase: perdidaPase,
        perdidaDoble: perdidaDoble,
        perdidaOtro: perdidaOtro,
        sancion2m: sancion2m,
        sancionRoja: sancionRoja,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Grid container spacing={4} p={4}>
      <GG>
        <Typography variant="h5">{nombre}</Typography>
      </GG>
      <GG>
        <Typography variant="h6">{nombreEquipo}</Typography>
      </GG>
      {loading ? (
        <GG>Cargando...</GG>
      ) : (
        <Grid container spacing={1} p={4}>
          <GG size={12}>
            <Typography>Goles</Typography>
          </GG>
          <GG size={6}>
            <Typography>Total:</Typography>
          </GG>
          <GG size={6}>
            <Typography>
              {(estadisticas.goles9 || 0) +
                (estadisticas.goles6c || 0) +
                (estadisticas.goles6e || 0) +
                (estadisticas.golesPenal || 0) +
                (estadisticas.golesContra || 0)}
            </Typography>
          </GG>
          <GG size={6}>
            <Typography>Centro:</Typography>
          </GG>
          <GG size={6}>
            <Typography>{estadisticas.goles6c || 0}</Typography>
          </GG>
          <GG size={6}>
            <Typography>Extremo:</Typography>
          </GG>
          <GG size={6}>
            <Typography>{estadisticas.goles6e || 0}</Typography>
          </GG>
          <GG size={6}>
            <Typography>8/9 metros:</Typography>
          </GG>
          <GG size={6}>
            <Typography>{estadisticas.goles9 || 0}</Typography>
          </GG>
          <GG size={6}>
            <Typography>Penal:</Typography>
          </GG>
          <GG size={6}>
            <Typography>{estadisticas.golesPenal || 0}</Typography>
          </GG>
          <GG size={6}>
            <Typography>Contra:</Typography>
          </GG>
          <GG size={6}>
            <Typography>{estadisticas.golesContra || 0}</Typography>
          </GG>
          {/* ERRADOS */}
          <GG size={12}>
            <Typography>Errados</Typography>
          </GG>
          <GG size={6}>
            <Typography>Total:</Typography>
          </GG>
          <GG size={6}>
            <Typography>
              {(estadisticas.erradosAtajo || 0) +
                (estadisticas.erradoAfuera || 0) +
                (estadisticas.erradoPenal || 0)}
            </Typography>
          </GG>
          <GG size={6}>
            <Typography>Atajó arq.:</Typography>
          </GG>
          <GG size={6}>
            <Typography>{estadisticas.erradosAtajo || 0}</Typography>
          </GG>
          <GG size={6}>
            <Typography>Afuera:</Typography>
          </GG>
          <GG size={6}>
            <Typography>{estadisticas.erradoAfuera || 0}</Typography>
          </GG>
          <GG size={6}>
            <Typography>Penal:</Typography>
          </GG>
          <GG size={6}>
            <Typography>{estadisticas.erradoPenal || 0}</Typography>
          </GG>
          {/* ATAJADAS */}
          <GG size={12}>
            <Typography>ATAJADAS</Typography>
          </GG>
          <GG size={6}>
            <Typography>Total:</Typography>
          </GG>
          <GG size={6}>
            <Typography>
              {(estadisticas.ataja6c || 0) +
                (estadisticas.ataja6e || 0) +
                (estadisticas.ataja9 || 0) +
                (estadisticas.atajaPenal || 0) +
                (estadisticas.atajaContra || 0)}
            </Typography>
          </GG>
          <GG size={6}>
            <Typography>Centro:</Typography>
          </GG>
          <GG size={6}>
            <Typography>{estadisticas.ataja6c || 0}</Typography>
          </GG>
          <GG size={6}>
            <Typography>Extremo:</Typography>
          </GG>
          <GG size={6}>
            <Typography>{estadisticas.ataja6e || 0}</Typography>
          </GG>
          <GG size={6}>
            <Typography>8/9 metros:</Typography>
          </GG>
          <GG size={6}>
            <Typography>{estadisticas.ataja9 || 0}</Typography>
          </GG>
          <GG size={6}>
            <Typography>Penal:</Typography>
          </GG>
          <GG size={6}>
            <Typography>{estadisticas.atajaPenal || 0}</Typography>
          </GG>
          {/* GOLES RECIBIDOS */}
          <GG size={12}>
            <Typography>GOLES RECIBIDOS</Typography>
          </GG>
          <GG size={6}>
            <Typography>Total:</Typography>
          </GG>
          <GG size={6}>
            <Typography>
              {(estadisticas.golContra6c || 0) +
                (estadisticas.golContra6e || 0) +
                (estadisticas.golContra9 || 0) +
                (estadisticas.golContraPenal || 0) +
                (estadisticas.golContraContra || 0)}
            </Typography>
          </GG>
          <GG size={6}>
            <Typography>Centro:</Typography>
          </GG>
          <GG size={6}>
            <Typography>{estadisticas.golContra6c || 0}</Typography>
          </GG>
          <GG size={6}>
            <Typography>Extremo:</Typography>
          </GG>
          <GG size={6}>
            <Typography>{estadisticas.golContra6e || 0}</Typography>
          </GG>
          <GG size={6}>
            <Typography>8/9 metros:</Typography>
          </GG>
          <GG size={6}>
            <Typography>{estadisticas.golContra9 || 0}</Typography>
          </GG>
          <GG size={6}>
            <Typography>Penal:</Typography>
          </GG>
          <GG size={6}>
            <Typography>{estadisticas.golContraPenal || 0}</Typography>
          </GG>
          <GG size={6}>
            <Typography>Contra:</Typography>
          </GG>
          <GG size={6}>
            <Typography>{estadisticas.golContraContra || 0}</Typography>
          </GG>
          {/* PERDIDAS */}
          <GG size={12}>
            <Typography>PERDIDAS</Typography>
          </GG>
          <GG size={6}>
            <Typography>Mal pase:</Typography>
          </GG>
          <GG size={6}>
            <Typography>{estadisticas.perdidaPase || 0}</Typography>
          </GG>
          <GG size={6}>
            <Typography>Doble/Camina:</Typography>
          </GG>
          <GG size={6}>
            <Typography>{estadisticas.perdidaDoble || 0}</Typography>
          </GG>
          <GG size={6}>
            <Typography>Otros:</Typography>
          </GG>
          <GG size={6}>
            <Typography>{estadisticas.perdidaOtro || 0}</Typography>
          </GG>
          {/* SANCIONES */}
          <GG size={12}>
            <Typography>SANCIONES</Typography>
          </GG>
          <GG size={6}>
            <Typography>2{"'"}:</Typography>
          </GG>
          <GG size={6}>
            <Typography>{estadisticas.sancion2m || 0}</Typography>
          </GG>
          <GG size={6}>
            <Typography>Roja:</Typography>
          </GG>
          <GG size={6}>
            <Typography>{estadisticas.sancionRoja || 0}</Typography>
          </GG>
        </Grid>
      )}
      <GG>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            window.location.href = "/equipo";
          }}
        >
          Volver
        </Button>
      </GG>
    </Grid>
  );
};

export default Equipo;
