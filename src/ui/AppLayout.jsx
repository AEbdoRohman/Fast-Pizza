import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import Loading from "./Loading";

const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loading />}

      <Header />
      <main className="overflow-scroll">
        <div className="mx-auto max-w-3xl">
          <Outlet />
        </div>
      </main>
      <CartOverview />
    </div>
  );
};

export default AppLayout;
