import { useContext } from "react";
import AuthContext from "../auth/context";

export default useUser = () => {
  const { user } = useContext(AuthContext);
  return user;
};
