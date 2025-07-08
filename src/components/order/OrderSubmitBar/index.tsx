import { useOrder } from "@/contexts/OrderContext";
import { orderSubmitBarStyle } from "./styles";

function OrderSubmitBar({
  formRef,
}: {
  formRef: React.RefObject<HTMLFormElement | null>;
}) {
  const { totalPrice } = useOrder();

  const handleClick = () => {
    formRef.current?.requestSubmit();
  };
  return (
    <div css={orderSubmitBarStyle} onClick={handleClick}>
      {totalPrice}원 주문하기
    </div>
  );
}

export default OrderSubmitBar;
