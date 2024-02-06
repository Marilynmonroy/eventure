import FormEvent from "@/components/ui/shared/FormEvent";
import { getEventById } from "@/lib/actions/event.actions";
import { UpdateEventParams } from "@/types";
import { auth } from "@clerk/nextjs";

type UpdateEventProps = {
  params: {
    id: string;
  };
};

const updateEvent = async ({ params: { id } }: UpdateEventProps) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  const event = await getEventById(id);
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Actualiza tu evento
        </h3>
      </section>
      <div className="wrapper">
        <FormEvent
          userId={userId}
          type="Actualizar"
          event={event}
          eventId={event._id}
        />
      </div>
    </>
  );
};

export default updateEvent;
