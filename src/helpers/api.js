const apiUri = 'https://airbean.awesomo.dev/api';

function createRequest(body = {}) {
  const token = sessionStorage.token;

  return {
    method: Object.keys(body).length ? 'POST' : 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(Object.keys(body).length ? { body: JSON.stringify(body) } : {}),
  };
}

async function callApi(endpoint, body = {}) {
  const request = createRequest(body);

  try {
    const response = await fetch(`${apiUri}${endpoint}`, request);
    return await response.json();
  } catch (error) {
    console.log(error);
    return { success: false, message: 'error' };
  }
}

async function validateToken() {
  const data = await callApi('/user/status');

  if (data.success) {
    return true;
  } else {
    return false;
  }
}

async function validator(callback) {
  if (sessionStorage.token) {
    if (await validateToken()) {
      return await callback();
    } else {
      sessionStorage.removeItem('token');
      return { success: false, message: 'invalid-token' };
    }
  } else {
    return await callback();
  }
}

async function postOrder(order) {
  return await validator(async () => await callApi('/beans/order', { details: { order: order } }));
}

async function getOrder(orderNr) {
  return await validator(async () => await callApi(`/beans/order/status/${orderNr}`));
}

async function getOrderHistory() {
  return await validator(async () => await callApi('/user/history/'));
}

export { postOrder, getOrder, getOrderHistory };
