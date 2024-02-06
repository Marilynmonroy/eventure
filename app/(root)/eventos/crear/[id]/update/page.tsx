import FormEvent from "@/components/ui/shared/FormEvent";
import { auth } from "@clerk/nextjs";

const updateEvent = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Actualiza tu evento
        </h3>
      </section>
      <div className="wrapper">
        <FormEvent userId={userId} type="actualizar" />
      </div>
    </>
  );
};

export default updateEvent;
