import { createContext, useContext } from "react";
import { useInput } from "@/hooks/useInput";
import React from "react";
import { PHONE_REGEX } from "@/utils/regex";

type OrderFormContextType = {
  nameInput: ReturnType<typeof useInput>;
  phoneInput: ReturnType<typeof useInput>;
  quantityInput: ReturnType<typeof useInput>;
  senderInput: ReturnType<typeof useInput>;
  messageInput: ReturnType<typeof useInput>;
  triggerValidation: () => void;
};

export const OrderFormContext = createContext<OrderFormContextType | null>(
  null
);

export const OrderFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const nameInput = useInput({
    initialValue: "",
    validate: (v) => (v.trim() === "" ? "이름을 입력해주세요." : ""),
  });
  const phoneInput = useInput({
    initialValue: "",
    validate: (v) =>
      PHONE_REGEX.test(v) ? "" : "올바른 전화번호를 입력해주세요.",
  });
  const quantityInput = useInput({
    initialValue: "1",
    validate: (v) => (Number(v) >= 1 ? "" : "수량은 1개 이상이어야 합니다."),
  });
  const senderInput = useInput({
    initialValue: "",
    validate: (value: string) =>
      value.trim() === "" ? "이름을 입력해주세요." : "",
  });

  const messageInput = useInput({
    initialValue: "",
    validate: (value: string) =>
      value.trim() === "" ? "메시지를 입력해주세요" : "",
  });

  const triggerValidation = () => {
    nameInput.onBlur();
    phoneInput.onBlur();
    quantityInput.onBlur();
    senderInput.onBlur();
    messageInput.onBlur();
  };

  return (
    <OrderFormContext.Provider
      value={{
        nameInput,
        phoneInput,
        quantityInput,
        senderInput,
        messageInput,
        triggerValidation,
      }}
    >
      {children}
    </OrderFormContext.Provider>
  );
};

export const useOrderForm = () => {
  const context = useContext(OrderFormContext);
  if (!context) {
    throw new Error("useOrderForm must be used within an OrderFormProvider");
  }
  return context;
};
