import { getOrdersByEvent } from "@/lib/actions/order.actions";
import { formatDateTime, formatPrice } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import { IOrderItem } from "@/lib/database/models/order.model";
import Search from "@/components/ui/shared/Search";

const Orders = async ({ searchParams }: SearchParamProps) => {
  const eventId = (searchParams?.eventId as string) || "";
  const searchText = (searchParams?.query as string) || "";

  const orders = await getOrdersByEvent({ eventId, searchString: searchText });

  return (
    <>
      <section className=" bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left ">
          Reservas vendidas
        </h3>
      </section>

      <section className="wrapper mt-8">
        <Search placeholder="Buscar reservas..." />
      </section>

      <section className="wrapper overflow-x-auto">
        <p className="pb-3 text-left border-b text-grey-500 p-medium-16">
          Total de reservas:{" "}
          <span className="text-grey-500 p-medium-16">{orders.length}</span>
        </p>
        <table className="w-full border-collapse border-t">
          <thead>
            <tr className="p-medium-14 border-b text-grey-500">
              <th className="min-w-[250px] py-3 text-left">ID reserva</th>
              <th className="min-w-[200px] flex-1 py-3 pr-4 text-left">
                Titulo del evento
              </th>
              <th className="min-w-[150px] py-3 text-left">Comprador</th>
              <th className="min-w-[100px] py-3 text-left">Dia de compra</th>
              <th className="min-w-[100px] py-3 text-right">Monto</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length === 0 ? (
              <tr className="border-b">
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No hay reservas.
                </td>
              </tr>
            ) : (
              <>
                {orders &&
                  orders.map((row: IOrderItem) => (
                    <tr
                      key={row._id}
                      className="p-regular-14 lg:p-regular-16 border-b "
                      style={{ boxSizing: "border-box" }}
                    >
                      <td className="min-w-[250px] py-4 text-primary-500">
                        {row._id}
                      </td>
                      <td className="min-w-[200px] flex-1 py-4 pr-4">
                        {row.eventTitle}
                      </td>
                      <td className="min-w-[150px] py-4">{row.buyer}</td>
                      <td className="min-w-[100px] py-4">
                        {formatDateTime(row.createdAt).dateTime}
                      </td>
                      <td className="min-w-[100px] py-4 text-right">
                        {formatPrice(row.totalAmount)}
                      </td>
                    </tr>
                  ))}
              </>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Orders;
