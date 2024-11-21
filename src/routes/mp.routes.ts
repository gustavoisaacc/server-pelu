import { MercadoPagoConfig, Payment } from "mercadopago";
import express from "express";

export const routeP = express.Router();

routeP.get("/", async (req, res) => {
  try {
    // Inicializar el cliente de Mercado Pago
    const client = new MercadoPagoConfig({
      accessToken: "APP_USR-7929158685588627-111922-3fa2881b0fa91884e33cd4bf6864c76d-2106358657",
    });

    // Configurar los detalles del pago
    const body = {
      transaction_amount: 12.34,
      description: "Test Payment",
      payment_method_id: "visa", // Reemplazar con un ID válido
      payer: {
        email: "test_user@test.com", // Reemplazar con un correo válido
      },
    };

    // Opcional: Agregar una clave de idempotencia
    const requestOptions = {
      idempotencyKey: `test-${Date.now()}`,
    };

    // Inicializar el objeto Payment
    const payment = new Payment(client);

    // Crear el pago
    const result = await payment.create({ body, requestOptions });

    // Responder con el resultado
    res.json({
      message: "Pago creado exitosamente",
      data: result,
    });
  } catch (error: any) {
    console.error("Error al crear el pago:", error);

    // Responder con un mensaje de error
    res.status(500).json({
      message: "Ocurrió un error al procesar el pago",
      error: error.message || error,
    });
  }
});
