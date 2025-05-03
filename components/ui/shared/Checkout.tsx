import { IEvent } from "@/lib/database/models/event.model";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "../button";
import { checkoutOrder } from "@/lib/actions/order.actions";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Checkout = ({ event, userId }: { event: IEvent; userId: string }) => {
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      alert("Reserva completa! Mandamos un e-mail de confirmación.");
    }

    if (query.get("canceled")) {
      alert("Reserva cancelada, intenta nuevamente!.");
    }
  }, []);
  const onCheckout = async () => {
    const order = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId,
    };

    await checkoutOrder(order);
  };

  return (
    <form action={onCheckout}>
      <Button type="submit" role="link" size="lg" className="button sm:w-fit">
        {" "}
        {event.isFree ? "Obtener ingreso" : "Comprar ingreso"}
      </Button>
    </form>
  );
};
export default Checkout;
