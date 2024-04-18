import LinkButton from "../../ui/LinkButton";

const EmptyCart = () => {
  return (
    <div className="px-4 py-6">
      <LinkButton to="/menu">&larr; Start adding pizzas</LinkButton>

      <p className="mt-6 text-lg ">
        Your cart is still empty. Start adding some pizzas
      </p>
    </div>
  );
};

export default EmptyCart;
