import { useOrder } from "@/contexts/OrderContext";
import { orderSubmitBarStyle } from "./styles";
import { useOrderForm } from "@/contexts/OrderFormContext";
import { useNavigate } from "react-router-dom";

function OrderSubmitBar() {
  const { triggerValidation } = useOrderForm();
  const { totalPrice, productName } = useOrder();
  const { nameInput, phoneInput, quantityInput, senderInput, messageInput } =
    useOrderForm();
  const navigate = useNavigate();

  const collectInputs = () => [
    nameInput,
    phoneInput,
    quantityInput,
    senderInput,
    messageInput,
  ];

  const isFormValid = (inputs: (typeof nameInput)[]) =>
    inputs.every((input) => input.error === "" && input.value.trim() !== "");

  const resetInputs = (inputs: (typeof nameInput)[]) => {
    inputs.forEach((input) => input.reset());
  };

  const handleClick = () => {
    triggerValidation();

    const inputs = collectInputs();
    if (isFormValid(inputs)) {
      alert(
        `주문이 완료되었습니다.\n` +
          `상품명: ${productName}\n` +
          `구매 수량: ${quantityInput.value}\n` +
          `발신자 이름: ${senderInput.value}\n` +
          `메시지: ${messageInput.value}`
      );
      navigate("/");
      resetInputs(inputs);
    }
  };
  return (
    <div css={orderSubmitBarStyle} onClick={handleClick}>
      {totalPrice}원 주문하기
    </div>
  );
}

export default OrderSubmitBar;
