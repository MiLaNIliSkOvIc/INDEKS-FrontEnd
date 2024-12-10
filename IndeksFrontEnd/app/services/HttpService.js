import { API_URL } from "@env";
import authStorage from "../auth/storage";

class HttpService {
  baseUrl = API_URL;

  async getHeaders() {
    const token = await authStorage.getToken();
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  }

  async handleResponse(response) {
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "error");
    }

    const text = await response.text();
    if (text) {
      return JSON.parse(text);
    }

    return null;
  }

  async create(resource, data) {
    console.log(`${this.baseUrl}/${resource}`);
    const headers = await this.getHeaders();
    const response = await fetch(`${this.baseUrl}/${resource}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    console.log("Status Code:", response.status);
    return this.handleResponse(response);
  }

  async get(resource) {
    console.log(`${this.baseUrl}/${resource}`);
    const headers = await this.getHeaders();
    const response = await fetch(`${this.baseUrl}/${resource}`, {
      method: "GET",
      headers,
    });
    return this.handleResponse(response);
  }

  async getById(resource, id = "") {
    console.log(`${this.baseUrl}/${resource}`);
    const headers = await this.getHeaders();
    const response = await fetch(`${this.baseUrl}/${resource}/${id}`, {
      method: "GET",
      headers,
    });
    return this.handleResponse(response);
  }

  async update(resource, id, data) {
    const headers = await this.getHeaders();
    const response = await fetch(`${this.baseUrl}/${resource}/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async delete(resource, id) {
    const headers = await this.getHeaders();
    const response = await fetch(`${this.baseUrl}/${resource}/${id}`, {
      method: "DELETE",
      headers,
    });
    return this.handleResponse(response);
  }
}

export default new HttpService();
