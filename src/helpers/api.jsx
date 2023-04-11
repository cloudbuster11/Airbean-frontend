// const apiUri = 'https://airbean.joakimtrulsson.se/api';
const apiUri = 'http://127.0.0.1:8000/api';

const createRequest = (method, body) => {
  return {
    method: `${method}`,
    headers: {
      ...(body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
    },
    credentials: 'include',
    ...(body ? { body: body } : {}),
  };
};

const callApi = async (endpoint, method, body, param) => {
  const request = createRequest(method, body);
  let url = `${apiUri}${endpoint}`;

  if (param) url = `${apiUri}${endpoint}/${param}`;

  try {
    const response = await fetch(url, request);
    if (response.status === 204) {
      return { success: 'success' };
    }

    const result = await response.json();

    if (result.status === 'fail') {
      return { success: false, message: 'fail' };
    }

    return result;
  } catch (error) {
    return { success: false, message: 'error' };
  }
};

export const getAllProducts = () => callApi('/product/', 'GET');
export const getOrderHistory = () => callApi('/orders/order-history/', 'GET');
export const getUserData = () => callApi('/user/me/', 'GET');
export const getCheckoutSession = (body) => callApi('/orders/checkout-session/', 'POST', body);
export const getOrderStatus = (orderId) => callApi(`/orders/orderstatus/${orderId}`, 'GET');
export const getAllOrders = () => callApi(`/orders/`, 'GET');
export const getSignOut = () => callApi(`/user/logout/`, 'GET');
export const getAllUsers = () => callApi(`/user/`, 'GET');
export const getTopRatedProducts = () => callApi(`/product/top-5-products`, 'GET');
export const getMostSoldProducts = () => callApi(`/orders/most-sold-products`, 'GET');
export const getTotalIncome = () => callApi(`/orders/total-income`, 'GET');
export const postLogin = (body) => callApi('/user/login/', 'POST', body);
export const postSignUp = (body) => callApi('/user/signup/', 'POST', body);
export const postReview = (body) => callApi(`/reviews/`, 'POST', body);
export const postNewProduct = (body) => callApi(`/product/`, 'POST', body);
export const postForgotPassword = (body) => callApi(`/user/forgotpassword`, 'POST', body);
export const patchUserImg = (formData) => callApi('/user/updateme/', 'PATCH', formData);
export const patchPassword = (body) => callApi('/user/updatemypassword/', 'PATCH', body);
export const patchResetPassword = (body, param) => callApi(`/user/resetpassword`, 'PATCH', body, param);
export const patchProduct = (body, id) => callApi(`/product/${id}`, 'PATCH', body);
export const patchUser = (body, id) => callApi(`/user/${id}`, 'PATCH', body);
export const updateMe = (body) => callApi(`/user/updateme/`, 'PATCH', body);
export const deleteReview = (reviewId) => callApi(`/reviews/${reviewId}`, 'DELETE');
export const deleteMe = () => callApi(`/user/deleteme/`, 'DELETE');
export const deleteProduct = (id) => callApi(`/product/${id}`, 'DELETE');
export const deleteUser = (id) => callApi(`/user/${id}`, 'DELETE');
export const deleteOrder = (id) => callApi(`/orders/${id}`, 'DELETE');
