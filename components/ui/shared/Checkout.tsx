import { IEvent } from "@/lib/database/models/event.model";
import React from "react";

const Checkout = ({ event }: { event: IEvent }) => {
  const eventoFinalizado = new Date(event.endDateTime) < new Date();

  return <div>Checkout</div>;
};

export default Checkout;
