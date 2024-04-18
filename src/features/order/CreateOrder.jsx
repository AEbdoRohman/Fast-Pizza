import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getCartTotalPrice } from "../cart/cartSlice";
import { useState } from "react";
import store from "../../store";
import { formatCurrency } from "../../utilts/helpers";
import { fetchAddress } from "../user/userSlice";
// // https://uibakery.io/regex-library/phone-number

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );
const CreateOrder = () => {
  const [withPriority, setWithPriority] = useState(false);
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: erroraddress,
  } = useSelector((state) => state.user);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();
  const isLoadingAddress = addressStatus === "loading";
  // Total price
  const totalPrice = useSelector(getCartTotalPrice);
  const priorityPrice = withPriority ? totalPrice * 0.2 : 0;
  const orderPrice = totalPrice + priorityPrice;

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();

  return (
    <div className="px-4 py-3">
      <h2 className="text-2xl">Ready to order? Let&apos;s go!</h2>

      <Form method="POST" className="mt-4">
        <div className=" mb-3 flex flex-col gap-4 sm:flex-row sm:items-center ">
          <label className="w-32 text-lg " htmlFor="customer">
            First Name
          </label>
          <input
            className="input grow"
            type="text"
            name="customer"
            id="customer"
            defaultValue={username}
            required
          />
        </div>
        <div className=" mb-3 flex flex-col gap-4 sm:flex-row sm:items-center ">
          <label className="w-32 text-lg" htmlFor="phone">
            Phone Number
          </label>
          <input
            className="input grow"
            type="text"
            name="phone"
            id="phone"
            autoComplete="on"
            required
          />
        </div>
        {formErrors?.phone && (
          <p className="mb-3 rounded-lg bg-red-200 text-center text-red-500">
            {formErrors.phone}
          </p>
        )}
        <div className="relative mb-3 flex flex-col gap-4 sm:flex-row sm:items-center">
          <label className="w-32 text-lg" htmlFor="address">
            Address
          </label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              id="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              autoComplete="on"
              required
            />
          </div>
          {!position.latitude && !position.langitude && (
            <span className="absolute right-[3px] z-50">
              <Button
                disabled={isLoadingAddress}
                type={"small"}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Position
              </Button>
            </span>
          )}
        </div>
        {addressStatus === "error" && (
          <p className="mb-3 rounded-lg bg-red-200 text-center text-red-500">
            {erroraddress}
          </p>
        )}
        <div className="mb-3 flex items-center gap-2">
          <input
            className="h-5 w-5 accent-yellow-400"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />

          <label
            className="cursor-pointer text-sm sm:text-lg"
            htmlFor="priority"
          >
            Want to yo give your order priority?
          </label>
        </div>
        <div>
          <input
            type="hidden"
            name="cart"
            id="cart"
            value={JSON.stringify(cart)}
          />

          <input
            type="hidden"
            name="position"
            id="position"
            value={
              position.langitude && position.latitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />

          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? "Submitting..."
              : `Order now for ${formatCurrency(orderPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(data.phone)) {
    errors.phone = "Please enter a valid phone number";
  }
  if (Object.keys(errors).length) return errors;

  const newOrder = await createOrder(order);
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
