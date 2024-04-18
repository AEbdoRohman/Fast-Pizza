import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import LinkButton from "../../ui/LinkButton";
import CartItem from "./CartItem";
import { clearCart, getCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";

const Cart = () => {
  const username = useSelector((state) => state.user.username);

  const cartItem = useSelector(getCart);
  const dispatch = useDispatch();

  if (!cartItem.length) return <EmptyCart />;
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <h1 className=" mt-7 text-lg font-semibold">your Cart, {username}</h1>
      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cartItem.map((pizza) => (
          <CartItem key={pizza.pizzaId} pizza={pizza} />
        ))}
      </ul>

      <div className="mt-3 space-x-4">
        <Button type={"primary"} to={"/order/new"}>
          Order Pizza
        </Button>
        <Button type={"secondary"} onClick={() => dispatch(clearCart())}>
          Clear Cart
        </Button>
      </div>
    </div>
  );
};

export default Cart;
