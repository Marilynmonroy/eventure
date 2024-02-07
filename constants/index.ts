export const headerLinks = [
  {
    label: "Inicio",
    route: "/",
  },
  {
    label: "Crear evento",
    route: "/eventos/crear",
  },
  {
    label: "Mi perfil",
    route: "/perfil",
  },
];

export const eventDefaultValues = {
  title: "",
  description: "",
  location: "",
  imageUrl: "",
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: "",
  price: "",
  isFree: false,
};
