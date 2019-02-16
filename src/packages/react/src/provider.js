import React, { useContext } from "react";

export const ClientContext = React.createContext(null);

export const ClientProvider = props => (
  <ClientContext.Provider value={props.client}>
    {props.children}
  </ClientContext.Provider>
);

export const useClient = () => {
  return useContext(ClientContext);
};
