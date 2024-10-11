import { Service } from "../models/service.models";

export const initialStat = async () => {
  try {
    const service = await Service.estimatedDocumentCount();
    if (service > 0) return;
    const value = await Promise.allSettled([
      new Service({
        name: "Servicios de Corte y Estilo",
        description:
          "Recorte y diseño del cabello para estilos personalizados, ya sean clásicos o modernos.",
        duration: 1,
        price: 100,
      }).save(),
      new Service({
        name: "Peinado y estilizado",
        description:
          "Estilismo para eventos o reuniones, con opciones como alisado, rizos, y trenzados.",
        duration: 1,
        price: 100,
      }).save(),
      new Service({
        name: " Tratamientos para el Cabello",
        description:
          " Cambio de color, incluyendo técnicas como balayage, mechas y reflejos",
        duration: 1,
        price: 100,
      }).save(),
      new Service({
        name: "Servicios para Eventos y Maquillaje",
        description:
          " Maquillaje profesional para eventos como bodas, graduaciones o fiestas.",
        duration: 1,
        price: 100,
      }).save(),
    ]);
    console.log(value);
  } catch (error) {
    console.log(error);
  }
};
