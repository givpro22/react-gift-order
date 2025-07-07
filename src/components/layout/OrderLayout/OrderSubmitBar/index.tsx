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
  const handleClick = () => {
    triggerValidation();

    const inputs = [
      nameInput,
      phoneInput,
      quantityInput,
      senderInput,
      messageInput,
    ];

    const isValid = inputs.every(
      (input) => input.error === "" && input.value.trim() !== ""
    );

    if (isValid) {
      alert(
        `주문이 완료되었습니다.\n` +
          `상품명: ${productName}\n` +
          `구매 수량: ${quantityInput.value}\n` +
          `발신자 이름: ${senderInput.value}\n` +
          `메시지: ${messageInput.value}`
      );
      navigate("/");
      inputs.forEach((input) => input.reset());
    }
  };
  return (
    <div css={orderSubmitBarStyle} onClick={handleClick}>
      {totalPrice}원 주문하기
    </div>
  );
}

export default OrderSubmitBar;
