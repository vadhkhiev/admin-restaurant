function checkToken({item}) {
  return localStorage.getItem(item);
}

function getToken({item}) {
  return localStorage.getItem(item);
}

function removeToken({item}) {
  localStorage.removeItem(item);
}

export { checkToken, getToken, removeToken };
