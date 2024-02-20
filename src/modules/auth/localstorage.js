function addToken({ item, value }) {
  localStorage.setItem(item, value);
}
function getToken({item}) {
  return localStorage.getItem(item);
}

function removeToken({item}) {
  localStorage.removeItem(item);
}

export { checkToken, getToken, removeToken };
