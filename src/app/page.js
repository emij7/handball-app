"use client";
import Image from "next/image";
import { Grid, Typography, Button } from "@mui/material";
import GG from "@/components/GG";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [equipos, setEquipos] = useState([]);

  const getEquipos = async () => {
    setLoading(true);

    // Check if "equipo" is saved in cookies
    const equipoCookie = getCookie("equipo");
    if (equipoCookie) {
      deleteCookie("equipo");
    }
    try {
      const equipos = collection(db, "teams");
      const querySnapshot = await getDocs(equipos);
      setEquipos(querySnapshot.docs.map((doc) => doc.data()));
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEquipos();
  }, []);

  const handleTeamSelection = (equipoElegido) => {
    //set cookies with the selected team and then move to page "/equipo"
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);
    setCookie("equipo", equipoElegido, { expires: expirationDate });
    window.location.assign("/equipo");
  };

  return (
    <Grid container py={10} px={4}>
      <GG size={12} pb={5}>
        <Typography variant="h4" textAlign="center">
          Elegir equipo
        </Typography>
      </GG>
      {/* <GG size={4}>
        <Button variant="contained">Button 1</Button>
      </GG>
      <GG size={4}>
        <Button variant="contained">Button 1</Button>
      </GG>
      <GG size={4}>
        <Button variant="contained">Button 1</Button>
      </GG> */}
      {loading ? (
        <GG size={12} mt={10}>
          <Typography variant="h6" textAlign="center">
            Cargando equipos...
          </Typography>
        </GG>
      ) : equipos.length > 0 ? (
        equipos.map((equipo, index) => (
          <GG size={4} key={index}>
            <Button
              variant="contained"
              onClick={() => handleTeamSelection(equipo)}
            >
              {equipo.nombreEquipo}
            </Button>
          </GG>
        ))
      ) : (
        <GG size={12} mt={10}>
          <Typography variant="h6" textAlign="center">
            No hay equipos
          </Typography>
        </GG>
      )}
      <GG size={12} mt={12} pb={5}>
        <Typography variant="h4" textAlign="center">
          Crear nuevo
        </Typography>
      </GG>
      <GG size={12}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            window.location.href = "/nuevo-equipo";
          }}
        >
          Nuevo Equipo
        </Button>
      </GG>
    </Grid>
  );
}
