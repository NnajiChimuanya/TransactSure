import React, { createContext, useReducer } from "react";

type InitialState = typeof initalState;

type Action =
  | {
      type: "SET_LOGIN";
      payload: {
        name: string;
        email: string;
        phoneNumber: string;
        password: string;
        paymentId: string[];
        balance: number;
      };
    }
  | {
      type: "SET_PAYMENTID";
      payload: string[];
    }
  | {
      type: "SET_BALANCE";
      payload: number;
    };

interface ContextProviderProps {
  children: React.ReactNode;
}

const initalState = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  paymentId: [""],
  balance: 0,
};

const reducer = (state: InitialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_LOGIN":
      return {
        ...state,
        name: payload.name,
        email: payload.email,
        phoneNumber: payload.phoneNumber,
        password: payload.password,
        paymentId: payload.paymentId,
        balance: payload.balance,
      };
    case "SET_PAYMENTID":
      return {
        ...state,
        paymentId: payload,
      };

    case "SET_BALANCE":
      return {
        ...state,
        balance: payload,
      };

    default:
      return state;
  }
};

export const SkyeWalletContext = createContext<{
  state: InitialState;
  dispatch: React.Dispatch<Action>;
}>({ state: initalState, dispatch: () => {} });

export const SkyeWalletContextProvider = ({
  children,
}: ContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initalState);
  return (
    <SkyeWalletContext.Provider value={{ state, dispatch }}>
      {children}
    </SkyeWalletContext.Provider>
  );
};
