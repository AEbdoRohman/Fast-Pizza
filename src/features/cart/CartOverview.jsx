import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCartTotalPrice, getCartTotalquntity } from "./cartSlice";
import { formatCurrency } from "../../utilts/helpers";

const CartOverview = () => {
  const totalQuntity = useSelector(getCartTotalquntity);
  const totalPrice = useSelector(getCartTotalPrice);

  if (!totalQuntity) return null;
  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-3 text-stone-200 ">
      <p className="font-lg space-x-4 font-semibold capitalize text-stone-300 sm:space-x-6">
        <span>{totalQuntity} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart">open cart &rarr;</Link>
    </div>
  );
};

export default CartOverview;
