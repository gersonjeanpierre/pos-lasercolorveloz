export class ApiClient {
  constructor(
    private entity: string,
    private baseUrl: string = 'http://localhost:3000/api/v1'
  ) { }

  get url() {
    return `${this.baseUrl}/${this.entity}`;
  }

  async post(data: any) {
    if (Array.isArray(data)) {
      // Si es un array, envía cada registro individualmente
      const results: any[] = [];
      for (const item of data) {
        const res = await fetch(this.url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item),
        });
        results.push(await res.json());
      }
      return results;
    } else {
      // Si es un solo objeto, envía normalmente
      const res = await fetch(this.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.json();
    }
  }

  async getAll() {
    const res = await fetch(this.url);
    return res.json();
  }

  async get(id?: string) {
    const res = await fetch(
      id ? `${this.url}/${id}` : this.url
    );
    return res.json();
  }

  async put(id: string, data: any) {
    const res = await fetch(`${this.url}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  }

  async patch(id: string, data: any) {
    const res = await fetch(`${this.url}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  }

  async delete(id: string) {
    const res = await fetch(`${this.url}/${id}`, {
      method: 'DELETE',
    });
    return res.json();
  }
}
