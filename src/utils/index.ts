import { Categories } from "../models/Category.models";
import { Service } from "../models/service.models";

export const initialStatCategory = async () => {
  try {
    const categories = await Categories.estimatedDocumentCount();
    if (categories > 0) return;
    const value = await Promise.allSettled([
      new Categories({
        name: "Servicios de Corte y Estilo",
      }).save(),
      new Categories({
        name: "Peinado y estilizado",
      }).save(),
      new Categories({
        name: " Tratamientos para el Cabello",
      }).save(),
      new Categories({
        name: "Servicios para Eventos y Maquillaje",
      }).save(),
    ]);
    console.log(value);
  } catch (error) {
    console.log(error);
  }
};

export const initialStatService = async () => {
  try {
    const service = await Service.estimatedDocumentCount();
    if (service > 0) return;
    const value = await Promise.allSettled([
      new Service({
        name: "Corte de cabello",
        description:
          "Recorte y diseño del cabello para estilos personalizados, ya sean clásicos o modernos.",
        duration: 30,
        price: 100,
      }).save(),
      new Service({
        name: "Corte de barba",
        description:
          "Recorte, diseño y perfilado de barba y bigote con afeitado de precisión.",
        duration: 10,
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
