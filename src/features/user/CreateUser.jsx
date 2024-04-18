import { useState } from "react";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { updateName } from "./userSlice";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const dispatch = useDispatch();
  const navegate = useNavigate();
  const [username, setUsername] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;

    dispatch(updateName(username));
    navegate("/menu");
  }
  return (
    <form onSubmit={handleSubmit}>
      <p className="text-stone-500">Welcome! Please start typing your name.</p>

      <input
        className="bg-white-400 mx-auto my-6 block w-64 rounded-full px-3 py-2 transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50  focus:sm:w-72"
        type="text"
        placeholder="Your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {username !== "" && <Button type="primary">Start ordering</Button>}
    </form>
  );
};

export default CreateUser;
