import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

const Home = () => {
  const username = useSelector((state) => state.user.username);
  return (
    <div className="px-4 py-6 text-center">
      <h1 className=" px-4 py-10 text-xl font-semibold">
        The best pizza.
        <br />
        <span className="text-yellow-400">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {!username ? (
        <CreateUser />
      ) : (
        <Button type="primary" to={"/menu"}>
          Continu to order
        </Button>
      )}
    </div>
  );
};

export default Home;
