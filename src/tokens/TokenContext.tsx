import React, {createContext, useContext, useState} from 'react';

interface ITokenContext {
  token: string;
  setToken: (token: string) => void;
}

const TokenContext = createContext<ITokenContext>({
  token: '',
  setToken: () => {},
});
export const TokenProvider = ({
  children: children,
}: {
  children: React.ReactNode;
}) => {
  const [token, setToken] = useState('');
  return (
    <TokenContext.Provider value={{token, setToken}}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  return useContext(TokenContext);
};
