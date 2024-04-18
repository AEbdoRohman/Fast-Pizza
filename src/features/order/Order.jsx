import { useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import OrderItem from "./OrderItem";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utilts/helpers";
import LinkButton from "../../ui/LinkButton";

const Order = () => {
  const order = useLoaderData();
  const {
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 px-4 py-6  ">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">{status}</h2>
        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-2 text-red-100">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-2 text-green-100">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-semibold">
          {deliveryIn >= 0
            ? `Only ${deliveryIn} minutes left`
            : "Order should have arrived"}
        </p>
        <p className="text-sm text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-b border-t">
        {cart.map((item) => (
          <OrderItem key={item.pizzaId} item={item} />
        ))}
      </ul>
      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="font-medium text-stone-600">
          Price Pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="font-medium text-stone-600">
            price Priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="text-lg font-semibold">
          To pay on delivery:{formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      <div className="underline">
        <LinkButton to={"/"}>&larr; Back to Home</LinkButton>
      </div>
    </div>
  );
};
export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}
export default Order;
