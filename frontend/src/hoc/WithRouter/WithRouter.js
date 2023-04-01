import React from "react";
import {useNavigate, useParams, useLocation} from "react-router-dom";

// TODO: react 17 проверить работу нужна location
export const withRouter = (WrappedComponent) => props => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <WrappedComponent
      {...props}
      params={params}
      location={location}
      navigate={navigate}
    />
  );
};