import { useNavigate, useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

const Error = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  return (
    <div className="px-4 py-6">
      <h1 className="text-3xl text-red-500">Something went wrong</h1>
      <p className="mb-4 text-lg text-red-400">{error.data || error.message}</p>
      <LinkButton onClick={() => navigate(-1)}>&larr; Go back</LinkButton>
    </div>
  );
};

export default Error;
