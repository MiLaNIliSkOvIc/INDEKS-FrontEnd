import { useUser } from "../hooks/useUser";
import HttpService from "../services/HttpService";

const register = (pushToken) => {
  const user = useUser();
  HttpService.update(`userAccound/${user.accountId}/pushToken`, {
    token: pushToken,
  });
};
export default {
  register,
};
