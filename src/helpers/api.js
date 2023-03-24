// const apiUri = 'https://airbean.joakimtrulsson.se/api';
const apiUri = 'http://127.0.0.1:8000/api';

function createRequest(method, body) {
  const token = sessionStorage.token;

  return {
    method: `${method}`,
    headers: {
      ...(body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: body } : {}),
  };
}

async function callApi(endpoint, method, body) {
  const request = createRequest(method, body);

  try {
    const response = await fetch(`${apiUri}${endpoint}`, request);
    const result = await response.json();
    console.log('!', result);
    if (result.status === 'error') {
      sessionStorage.clear();
      return { success: false, message: 'error' };
    }
    return result;
  } catch (error) {
    console.log(error);
    return { success: false, message: 'error' };
  }
}

// Bygg om
async function patchUserImg(formData) {
  return await callApi('/user/updateme/', 'PATCH', formData);
}

async function getOrderHistory() {
  return await callApi('/orders/order-history/', 'GET');
}

async function getUserData() {
  return await callApi('/user/me/', 'GET');
}

async function getAllProducts() {
  return await callApi('/product/', 'GET');
}

async function postLogin(body) {
  return await callApi('/user/login/', 'POST', body);
}

async function postSignUp(body) {
  return await callApi('/user/signup/', 'POST', body);
}

async function patchPassword(body) {
  return await callApi('/user/updatemypassword/', 'PATCH', body);
}

async function getCheckoutSession(body) {
  return await callApi('/orders/checkout-session/', 'POST', body);
}

async function getOrderStatus(orderId) {
  return await callApi(`/orders/orderstatus/${orderId}`, 'GET');
}

// Ändras
async function postOrder(order) {
  return await validator(async () => await callApi('/beans/order', { details: { order: order } }));
}
async function getOrder(orderNr) {
  return await validator(async () => await callApi(`/beans/orders/status/${orderNr}`));
}

export {
  postOrder,
  getOrder,
  getOrderHistory,
  getUserData,
  patchUserImg,
  getAllProducts,
  postLogin,
  postSignUp,
  patchPassword,
  getCheckoutSession,
  getOrderStatus,
};
