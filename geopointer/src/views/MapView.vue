<template>
  <div class="div-map">
    <h2>Mapa de equipamentos</h2>
    <v-btn color="success" class="mb-2" @click="goToMap">
      Ir para cadastro de produtos
    </v-btn>
    <div id="map"></div>
  </div>
</template>

<script setup>
import { MarkerClusterer } from "https://cdn.skypack.dev/@googlemaps/markerclusterer@2.3.1";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const goToMap = () => {
  router.push({ name: "products" });
};

((g) => {
  var h,
    a,
    k,
    p = "The Google Maps JavaScript API",
    c = "google",
    l = "importLibrary",
    q = "__ib__",
    m = document,
    b = window;
  b = b[c] || (b[c] = {});
  var d = b.maps || (b.maps = {}),
    r = new Set(),
    e = new URLSearchParams(),
    u = () =>
      h ||
      (h = new Promise(async (f, n) => {
        await (a = m.createElement("script"));
        e.set("libraries", [...r] + "");
        for (k in g)
          e.set(
            k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()),
            g[k]
          );
        e.set("callback", c + ".maps." + q);
        a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
        d[q] = f;
        a.onerror = () => (h = n(Error(p + " could not load.")));
        a.nonce = m.querySelector("script[nonce]")?.nonce || "";
        m.head.append(a);
      }));
  d[l]
    ? console.warn(p + " only loads once. Ignoring:", g)
    : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
})({ key: "AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg", v: "weekly" });

async function initMap() {
  // Request needed libraries.
  const { Map, InfoWindow } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
    "marker"
  );

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11,
    center: { lat: -12.883126464489013, lng: -38.30755560279216 },
    mapId: "DEMO_MAP_ID",
  });

  const infoWindow = new google.maps.InfoWindow({
    content: "",
    disableAutoPan: true,
  });
  // Create an array of alphabetical characters used to label the markers.
  // Add some markers to the map.
  const markers = locations.map((position, i) => {
    console.log(position)
    const pinGlyph = new google.maps.marker.PinElement({
      glyph: `${position.acronym}`,
      glyphColor: "white",
    });
    const marker = new google.maps.marker.AdvancedMarkerElement({
      position,
      content: pinGlyph.element,
    });

    // markers can only be keyboard focusable when they have click listeners
    // open info window when marker is clicked
    marker.addListener("click", () => {
      const infoWindowContent = `
        <div style="color: black;">
          ${position.description}
        </div>
      `;
      infoWindow.setContent(infoWindowContent);
      infoWindow.open(map, marker);
    });
    return marker;
  });

  // Add a marker clusterer to manage the markers.
  new MarkerClusterer({ markers, map });
}

// const mensagem = ref("geoPointer");
// const nomeProduto = ref("g");
const locations = [{ 
  lat: -12.883126464489013, 
  lng: -38.30755560279216, 
  acronym: 'g',
  description: 'geopointer'
}];


const getEquipaments = async () => {
  try {
    const response = await axios.get(`equipaments`, {
      headers: {'Content-Type': 'application/json'}
    });
    
    if(response) {
      response.data.map((item, index) => {
        locations.push({
          lat: parseFloat(item.latitude),
          lng: parseFloat(item.longitude),
          acronym: index,
          description: item.tag
        })
      })
    }
  } catch (error) {
    console.error(error);
  }
}

onMounted(async () => {   
  await getEquipaments();
  await initMap();
})
</script>

<style scoped>
.div-map {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Faz a div ocupar toda a altura da tela */
}
div#map {
  height: 630px;
  width: 830px;
}
</style>