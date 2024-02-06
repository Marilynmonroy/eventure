import { Button } from "@/components/ui/button";
import Collection from "@/components/ui/shared/Collection";
import { getEventsByUser } from "@/lib/actions/event.actions";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const ProfilePage = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const organizadEvents = await getEventsByUser({ userId, page: 1 });

  return (
    <>
      {/* Ingresos */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Mis ingresos</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/#eventos"> Ver más eventos</Link>
          </Button>
        </div>
      </section>

      {/*       <section className="wrapper my-8">
        <Collection
          data={events?.data}
          emptyTitle="No tienes ingresos"
          emptyStateSubtext="Pero no te preocupes, puedes ir a añadir eventos!"
          collectionType="Mis ingresos"
          limit={3}
          page={1}
          urlParamName="paginaReservas"
          totalPages={2}
        />
      </section> */}

      {/* Eventos */}

      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Mis eventos</h3>
          <Button asChild className="button hidden sm:flex">
            <Link href="/eventos/crear/"> Crea un nuevo evento </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={organizadEvents?.data}
          emptyTitle="No tienes eventos creados"
          emptyStateSubtext="Vamos a crear alguno!"
          collectionType="Eventos organizados"
          limit={3}
          page={1}
          urlParamName="paginaEventos"
          totalPages={2}
        />
      </section>
    </>
  );
};

export default ProfilePage;
