import HttpService from "../services/HttpService";

const login = (email, password) =>
  HttpService.create("auth/login", {
    email,
    password,
  });

export default {
  login,
};
