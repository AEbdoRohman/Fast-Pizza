import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-yellow-400 px-4 py-3 uppercase">
      <Link
        to="/"
        className="text-xl tracking-wider text-stone-500 sm:text-2xl"
      >
        Fast React Pizza
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
};

export default Header;
