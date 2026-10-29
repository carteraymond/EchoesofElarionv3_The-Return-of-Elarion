// Use Leaflet's simple coordinate system to display
// a fictional world map instead of real-world geography.
const map = L.map("world-map", {
    crs: L.CRS.Simple,
    minZoom: -1,
    maxZoom: 1
});

const imageWidth = 1536;
const imageHeight = 1024;

const imageBounds = [
    [0, 0],
    [imageHeight, imageWidth]
];

L.imageOverlay(
    "/static/images/Elarion_WorldMap_Plain_Converted.webp",
    imageBounds
).addTo(map);

map.fitBounds(imageBounds);

//  Useful for debugging, will log the coordinates of any point clicked on the map to the console. This can be used to find the coordinates of other locations to add markers for them.
map.on("click", function(event) {
    console.log(
        "Map coordinates:",
        Math.round(event.latlng.lat),
        Math.round(event.latlng.lng)
    );
});

const locations = [
    {
        key: "luminara",
        name: "Luminara",
        description: "A great city in the Heartlands of Solis.",
        loreKey: "luminara",
        y: 560,
        x: 770
    },
    {
        key: "caledonia",
        name: "Port of Caledonia",
        description: "A coastal settlement of Elarion.",
        loreKey: "caledonia",
        y: 585,
        x: 1113
    },
    {
        key: "tidewell",
        name: "Tidewell",
        description: "A mysterious landmark associated with the tides.",
        loreKey: "wells",
        y: 440,
        x: 1233
    },
    {
        key: "verdant",
        name: "The Verdant Expanse",
        description: "A lush and vibrant region of Elarion.",
        loreKey: "verdant_expanse",
        y: 538,
        x: 321
    },
    {
        key: "ashen",
        name: "The Ashen Marshes",
        description: "A desolate and dangerous region of Elarion.",
        loreKey: "ashen_marshes",
        y: 207,
        x: 1269
    }
];

locations.forEach(location => {
    const marker = L.marker([location.y, location.x]).addTo(map);
    const loreLink = location.loreKey
    ? `<a href="/lore/?topic=${encodeURIComponent(location.loreKey)}">Learn More</a>`
    : "<p>More lore coming soon.</p>";

    marker.bindPopup(`
        <h3>${location.name}</h3>
        <p>${location.description}</p>
        ${loreLink}
</a>
    `);
});