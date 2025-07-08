import { HorizontalSpacing } from "@/components/common/Spacing/HorizontalSpacing";
import GiftMessageSection from "@/components/order/GiftMessageSection";
import ProductInfoSection from "@/components/order/ProductInfoSection";
import SenderSection from "@/components/order/SenderSection";
import ReceiverSection from "@/components/order/ReceiverSection";
import { useOrderForm } from "@/contexts/OrderFormContext";
import OrderSubmitBar from "@/components/order/OrderSubmitBar";

function OrderPage() {
  const { nameInput, phoneInput, quantityInput, senderInput, messageInput } =
    useOrderForm();

  return (
    <>
      <GiftMessageSection messageInput={messageInput} />
      <HorizontalSpacing size="spacing3" />
      <SenderSection senderInput={senderInput} />
      <HorizontalSpacing size="spacing3" />
      <ReceiverSection
        nameInput={nameInput}
        phoneInput={phoneInput}
        quantityInput={quantityInput}
      />
      <HorizontalSpacing size="spacing3" />
      <ProductInfoSection />
      <HorizontalSpacing size="spacing3" />
      <OrderSubmitBar />
    </>
  );
}

export default OrderPage;
