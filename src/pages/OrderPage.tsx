import { HorizontalSpacing } from "@/components/common/Spacing/HorizontalSpacing";
import GiftMessageSection from "@/components/order/GiftMessageSection";
import ProductInfoSection from "@/components/order/ProductInfoSection";
import SenderSection from "@/components/order/SenderSection";
import ReceiverSection from "@/components/order/ReceiverSection";
import { useOrderForm } from "@/contexts/OrderFormContext";
import OrderSubmitBar from "@/components/order/OrderSubmitBar";
import { useForm } from "react-hook-form";
import type { FormValues } from "@/components/order/type";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function OrderPage() {
  const { nameInput, phoneInput, quantityInput } = useOrderForm();
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onSubmit",
    defaultValues: {
      message: "",
      sender: "",
    },
  });

  const productName = "상품명"; // You may replace this with actual product name from context or props

  const onSubmit = (data: FormValues) => {
    alert(
      `주문이 완료되었습니다.\n` +
        `상품명: ${productName}\n` +
        // `구매 수량: ${data.receivers?.[0]?.quantity ?? ""}\n` +
        `발신자 이름: ${data.sender}\n` +
        `메시지: ${data.message}`
    );
    navigate("/");
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <GiftMessageSection
        register={register}
        errors={errors}
        setValue={setValue}
      />
      <HorizontalSpacing size="spacing3" />
      <SenderSection register={register} errors={errors} />
      <HorizontalSpacing size="spacing3" />
      <ReceiverSection
        nameInput={nameInput}
        phoneInput={phoneInput}
        quantityInput={quantityInput}
      />
      <HorizontalSpacing size="spacing3" />
      <ProductInfoSection />
      <HorizontalSpacing size="spacing3" />
      <OrderSubmitBar formRef={formRef} />
    </form>
  );
}

export default OrderPage;
