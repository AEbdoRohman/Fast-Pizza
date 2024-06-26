import { useSelector } from "react-redux";

const Username = () => {
  const username = useSelector((state) => state.user.username);
  if (!username) return null;
  return (
    <div className="hidden text-lg font-semibold sm:block">{username}</div>
  );
};

export default Username;
