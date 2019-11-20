const isAuth = () => {
  if (localStorage.getItem("access_token") == null) {
    return false;
  }
  return true;
};

export default isAuth;
