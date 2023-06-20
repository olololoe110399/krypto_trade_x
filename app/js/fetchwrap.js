class FetchWrapper {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  get(endpoint) {
    return fetch(this.baseURL + endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed get API");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  put(endpoint, body) {
    return this._send("put", endpoint, body);
  }

  post(endpoint, body) {
    return this._send("post", endpoint, body);
  }

  delete(endpoint, body) {
    return this._send("delete", endpoint, body);
  }

  _send(method, endpoint, body) {
    return fetch(this.baseURL + endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed call API");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error call API:", error);
      });
  }
}
