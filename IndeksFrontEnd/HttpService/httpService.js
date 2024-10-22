class HttpService {
  

    baseUrl = 'http://192.168.100.31:8080/api/v1';
  

    async handleResponse(response) {
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'error');
      }
      const json = await response.json();
      return json;
    }
  

    async create(resource, data) {
      const response = await fetch(`${this.baseUrl}/${resource}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return this.handleResponse(response);
    }
  

    async get(resource) {
      console.log(`${this.baseUrl}/${resource}`);
      const response = await fetch(`${this.baseUrl}/${resource}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return this.handleResponse(response);
    }
    
   
    async getById(resource, id = '') {
      console.log(`${this.baseUrl}/${resource}`);
      const response = await fetch(`${this.baseUrl}/${resource}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return this.handleResponse(response);
    }
  

    async update(resource, id, data) {
      const response = await fetch(`${this.baseUrl}/${resource}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return this.handleResponse(response);
    }

    async delete(resource, id) {
      const response = await fetch(`${this.baseUrl}/${resource}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return this.handleResponse(response);
    }
  }
  
  export default new HttpService();
  