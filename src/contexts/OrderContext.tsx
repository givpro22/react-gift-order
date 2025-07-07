import React, { createContext, useContext, useState } from "react";

type OrderContextType = {
  quantity: number;
  setQuantity: (q: number) => void;
  totalPrice: number;
  setTotalPrice: (p: number) => void;
  productPrice: number;
  setProductPrice: (p: number) => void;
  productName: string;
  setProductName: (name: string) => void;
};

const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [productName, setProductName] = useState("");

  return (
    <OrderContext.Provider
      value={{
        quantity,
        setQuantity,
        totalPrice,
        setTotalPrice,
        productPrice,
        setProductPrice,
        productName,
        setProductName,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context)
    throw new Error("useOrder must be used within an OrderProvider");
  return context;
};
