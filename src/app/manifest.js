const manifest = () => ({
  name: "Charge Finder",
  short_name: "Charge Finder",
  description: "Find the electric charger for your vehicle",
  start_url: "/",
  display: "standalone",
  background_color: "#ffffff",
  theme_color: "#16a34a",
  icons: [
    {
      src: "/icon.svg",
      sizes: "any",
      type: "image/svg+xml",
      purpose: "any",
    },
    {
      src: "/icon.svg",
      sizes: "any",
      type: "image/svg+xml",
      purpose: "maskable",
    },
  ],
});

export default manifest;
