import PropTypes from "prop-types";
import { formatCurrency } from "../../utilts/helpers";
import { useSelector } from "react-redux";
import { getCurrentQuantityById } from "./cartSlice";
import DeleteItem from "./DeleteItem";
import UpdateItem from "./UpdateItem";
const CartItem = ({ pizza }) => {
  const { pizzaId, name, quantity, totalPrice } = pizza;

  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return (
    <li className="  bg-stone-100 py-2 sm:flex sm:items-center sm:justify-between">
      <div>
        <p>
          {quantity} &times; {name}
        </p>
      </div>
      <div className="mt-2 flex items-center justify-between sm:mt-0 sm:gap-6">
        <p>{formatCurrency(totalPrice)}</p>
        <UpdateItem pizzaId={pizzaId} currentQuantity={currentQuantity} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
};

CartItem.propTypes = {
  pizza: PropTypes.object,
};
export default CartItem;
