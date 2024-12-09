import { API_URL } from "@env";

class HttpService {
  baseUrl = API_URL;

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
    const response = await fetch(`${this.baseUrl}/${resource}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("Status Code:", response.status);
    return this.handleResponse(response);
  }

  async get(resource) {
    console.log(`${this.baseUrl}/${resource}`);
    const response = await fetch(`${this.baseUrl}/${resource}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return this.handleResponse(response);
  }

  async getById(resource, id = "") {
    console.log(`${this.baseUrl}/${resource}`);
    const response = await fetch(`${this.baseUrl}/${resource}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return this.handleResponse(response);
  }

  async update(resource, id, data) {
    const response = await fetch(`${this.baseUrl}/${resource}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async delete(resource, id) {
    const response = await fetch(`${this.baseUrl}/${resource}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return this.handleResponse(response);
  }
}

export default new HttpService();
