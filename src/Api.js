async function myFetch({ url, method, body }) {
  const res = await fetch(url, {
    method: method || "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();
  return data;
}

class Api {
  constructor(url) {
    this.url = url;
  }

  async addTripToUser(user, tripId) {
    try {
      return await myFetch({
        url: `${this.url}/users/trips`,
        method: "POST",
        body: { user, tripId },
      });
    } catch (err) {
      console.log("addTripToUser err:", err.message);
    }
  }
  async getUserByEmail(email) {
    try {
      return await myFetch({
        url: `${this.url}/users/email`,
        method: "POST",
        body: { email },
      });
    } catch (err) {
      console.log("addTripToUser err:", err.message);
    }
  }
}

const api = new Api("https://city-route.herokuapp.com/api");

export default api;
