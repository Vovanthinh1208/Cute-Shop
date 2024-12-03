import React from "react";
import { Route, Redirect, useHistory } from "react-router-dom";

// Dùng ProtectedRoute để đảm bảo rằng chỉ khi người dùng đã đăng nhập mới có thể truy cập route đó
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  const history = useHistory();

  return (
    <Route
      {...rest}
      render={(props) => 
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/sign_in", state: { from: props.location } }} />
        )
      }
    />
  );
};

export default ProtectedRoute;
