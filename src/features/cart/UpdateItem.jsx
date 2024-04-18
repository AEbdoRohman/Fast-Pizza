import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItem, increaseItem } from "./cartSlice";
import PropTypes from "prop-types";
const UpdateItem = ({ pizzaId, currentQuantity }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <Button type={"round"} onClick={() => dispatch(decreaseItem(pizzaId))}>
        -
      </Button>
      <p className="text-center font-semibold">{currentQuantity}</p>
      <Button type={"round"} onClick={() => dispatch(increaseItem(pizzaId))}>
        +
      </Button>
    </div>
  );
};

UpdateItem.propTypes = {
  pizzaId: PropTypes.number,
  currentQuantity: PropTypes.number,
};
export default UpdateItem;
