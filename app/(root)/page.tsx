import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Collection from "@/components/ui/shared/Collection";
import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
import Search from "@/components/ui/shared/Search";
import CategoryFilter from "@/components/ui/shared/CategoryFilter";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6,
  });

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-10 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Tu pasaporte a eventos inolvidables!</h1>
            <p className="p-regular-18 md:p-regular-20">
              Descubre un mundo de eventos fascinantes, desde celebraciones
              vibrantes hasta experiencias culturales únicas.
            </p>
            <Button size={"lg"} asChild className="button w-full sm:w-fit">
              <Link href="#eventos">Conoce más!</Link>
            </Button>
          </div>
          <Image
            src="/assets/images/noiseporn-JNuKyKXLh8U-unsplash.jpg"
            alt={"Eventure"}
            width={1000}
            height={1000}
            className="max-h-[60vh] object-contain object-center 2xl:max-h-[40vh]"
          />
        </div>
      </section>
      <section
        id="eventos"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold">Eventos destacados en Eventure</h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>

        <Collection
          data={events?.data}
          emptyTitle="No hay eventos"
          emptyStateSubtext="Vuelve más tarde"
          collectionType="Todos los eventos"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />
      </section>
    </>
  );
}
