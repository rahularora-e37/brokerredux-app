class BrokersApi {

  static requestHeaders() {
    return {'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`}
  }

  static getAllBrokers() {
    //const headers = this.requestHeaders();
    const headers = Object.assign({'Accept': 'application/json'})
    const request = new Request(`${process.env.API_HOST}/api/v1/brokers`, {
      method: 'GET',
      headers: headers
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static updateBroker(broker) {
    const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
    const request = new Request(`${process.env.API_HOST}/api/v1/brokers/${broker.id}`, {
      method: 'PUT',
      headers: headers, 
      body: JSON.stringify({broker: broker})
    });


    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static createBroker(broker) {
    const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
    const request = new Request(`${process.env.API_HOST}/api/v1/brokers`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({broker: broker})
    });


    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static deleteBroker(broker) {
    const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
    const request = new Request(`${process.env.API_HOST}/api/v1/brokers/${broker.id}`, {
      method: 'DELETE', 
      headers: headers
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

export default BrokersApi;
