/** @format */

import { useState, useEffect } from "react";
import Router from "./router/Router";
import { useSelector, useDispatch } from "react-redux";
import { getRoutes } from "./router/routes/index";

import publicRoutes from "./router/routes/publicRoutes";
import { get_user_info } from "./store/Reducers/authReducer";

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);

  useEffect(() => {
    const routes = getRoutes();
    // console.log(routes);
    setAllRoutes([...allRoutes, routes]);
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(get_user_info("token", token));
    }
  }, [token]);

  return <Router allRoutes={allRoutes} />;
}

export default App;
