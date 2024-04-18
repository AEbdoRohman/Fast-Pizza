import PropTypes from "prop-types";
import { formatCurrency } from "../../utilts/helpers";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItem from "../cart/UpdateItem";

const MenuItem = ({ pizza }) => {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQuantity = useSelector(getCurrentQuantityById(id));

  const isInCart = currentQuantity > 0;

  const dispatch = useDispatch();
  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }
  return (
    <li className="flex gap-4 py-4 ">
      <img
        className={`${soldOut ? "opacity-70 grayscale" : ""} h-24 rounded-lg`}
        src={imageUrl}
        alt={name}
      />
      <div className="flex grow flex-col sm:pt-1">
        <p className="text-xl font-semibold">{name}</p>
        <p className="text-sm capitalize text-stone-500 sm:text-lg ">
          {ingredients.join(", ")}
        </p>
        <div className="mt-3 flex items-center justify-between sm:mt-0">
          {!soldOut ? (
            <p className="font-semibold ">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-slate-400">Sold out</p>
          )}

          {isInCart && (
            <div className="flex items-center gap-2">
              <UpdateItem pizzaId={id} currentQuantity={currentQuantity} />
              <DeleteItem pizzaId={id} />
            </div>
          )}
          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
};
MenuItem.propTypes = {
  pizza: PropTypes.object,
};

export default MenuItem;
