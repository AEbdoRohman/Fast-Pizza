import PropTypes from "prop-types";
import { formatCurrency } from "../../utilts/helpers";
const OrderItem = ({ item }) => {
  const { quantity, name, totalPrice } = item;
  return (
    <li className=" py-3">
      <div className="flex items-center justify-between gap-4  ">
        <p>
          <span className="mr-2 inline-block font-bold">{quantity}&times;</span>
          {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
};

OrderItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default OrderItem;
