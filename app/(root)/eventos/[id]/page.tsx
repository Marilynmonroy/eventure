import {
  getEventById,
  getRelatedEventsByCategory,
} from "@/lib/actions/event.actions";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import Image from "next/image";

import { FaLocationDot } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";
import Collection from "@/components/ui/shared/Collection";
import CheckoutButton from "@/components/ui/shared/CheckoutButton";

const EventDetail = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const event = await getEventById(id);

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  });
  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <Image
            src={event.imageUrl}
            alt=""
            width={1000}
            height={1000}
            className="h-full min-h-[300px] object-cover object-center"
          />

          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-5">
              <h2 className="h2-bold">{event.title}</h2>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  <p className="p-bold-20  px-4 py-2 rounded-full bg-green-300">
                    {event.isFree ? "GRATIS" : `$${event.price}`}
                  </p>
                  <p className="p-medium-6 rounded-full bg-gray-500/10 px-4 py-2.5 text-gray-500">
                    {event.category.name}{" "}
                  </p>
                </div>
                <p className="p-medium-8 ml-2 mt-2 md:mt-0">
                  realizado por {""}
                  <span className="text-primary-500">
                    {event.organizer.firstName} {event.organizer.lastName}
                  </span>
                </p>
              </div>
            </div>

            <CheckoutButton event={event} />

            <div className=" flex flex-col gap-5">
              <div className="flex gap-2 md:gap-3 items-center">
                <FaCalendar className="text-primary-500/80 text-lg" />
                <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
                  <p>
                    {formatDateTime(event.startDateTime).dateOnly} / {""}
                    {formatDateTime(event.startDateTime).timeOnly} {""}
                  </p>
                  <p>
                    {""} - {formatDateTime(event.endDateTime).dateOnly} / {""}
                    {formatDateTime(event.endDateTime).timeOnly}
                  </p>
                </div>
              </div>

              <div className="p-regular-20 flex items-center gap-2">
                <FaLocationDot className="text-primary-500/80 text-lg" />
                <p className="p-medium-16 lg:p-regular-20">{event.location}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-gray-600">Descripción</p>
              <p className="p-medium-18 text-gray-600">{event.description}</p>
              <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline italic">
                {event.url}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Eventos relacionados</h2>
        <Collection
          data={relatedEvents?.data}
          emptyTitle="No hay eventos"
          emptyStateSubtext="Vuelve más tarde"
          collectionType="Todos los eventos"
          limit={6}
          page={searchParams.page as string}
          totalPages={relatedEvents?.totalPages}
        />
      </section>
    </>
  );
};

export default EventDetail;
