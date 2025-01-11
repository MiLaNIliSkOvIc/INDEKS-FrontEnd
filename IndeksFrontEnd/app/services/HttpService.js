import { create } from 'apisauce';
import { API_URL } from "@env";
import authStorage from "../auth/storage";

const api = create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" }
});

// Oavj api bi se mogao koristiti direkt u kodu ali posto sam dosta toga spojio sa ovim servisom
// napravio sam da ovaj httpService koristi apisauce pa dodje na isto pobojsano je 

class HttpService {

  async getHeaders() {
    const token = await authStorage.getToken();
    if (token) {
      api.setHeader('Authorization', `Bearer ${token}`);
    }
  }


  handleResponse(response) {
    if (!response.ok) {
      throw new Error(response.data || "error");
    }
    return response.data;
  }


  async create(resource, data) {
    await this.getHeaders();
    const response = await api.post(`/${resource}`, data);
    return response;
  }

  async get(resource) {
    await this.getHeaders();
    const response = await api.get(`/${resource}`);
    return response;
  }

  async getById(resource, id) {
    await this.getHeaders();
    const response = await api.get(`/${resource}/${id}`);
    return response;
  }

  async update(resource, id, data) {
    await this.getHeaders();
    const response = await api.put(`/${resource}/${id}`, data);
    return response;
  }

  async delete(resource, id) {
    await this.getHeaders();
    const response = await api.delete(`/${resource}/${id}`);
    return response;
  }
}

export default new HttpService();
