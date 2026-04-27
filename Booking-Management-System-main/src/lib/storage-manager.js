const AUTH_TOKEN_KEY = 'auth_token';

function getStorageItem(key) {
  return window.localStorage.getItem(key);
}

function setStorageItem(key, value) {
  window.localStorage.setItem(key, value);
}

function removeStorageItem(key) {
  window.localStorage.removeItem(key);
}

export {
  AUTH_TOKEN_KEY,
  getStorageItem,
  removeStorageItem,
  setStorageItem,
};
