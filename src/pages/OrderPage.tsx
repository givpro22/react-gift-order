import { HorizontalSpacing } from "@/components/common/Spacing/HorizontalSpacing";
import GiftMessageSection from "@/components/order/GiftMessageSection";
import ProductInfoSection from "@/components/order/ProductInfoSection";
import SenderSection from "@/components/order/SenderSection";
import ReceiverSection from "@/components/order/ReceiverSection";
import OrderSubmitBar from "@/components/order/OrderSubmitBar";
import { FormProvider, useForm } from "react-hook-form";
import type { FormValues } from "@/components/order/type";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useOrder } from "@/contexts/OrderContext";

function OrderPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const { productName, quantity } = useOrder();
  const methods = useForm<FormValues>({
    mode: "onSubmit",
    defaultValues: {
      message: "",
      sender: "",
      receivers: [{ name: "", phone: "", quantity: 1 }],
    },
  });
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = methods;
  const onSubmit = (data: FormValues) => {
    alert(
      `주문이 완료되었습니다.\n` +
        `상품명: ${productName}\n` +
        `구매 수량: ${quantity}\n` +
        `발신자 이름: ${data.sender}\n` +
        `메시지: ${data.message}`
    );
    navigate("/");
  };

  return (
    <FormProvider {...methods}>
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <GiftMessageSection
          register={register}
          errors={errors}
          setValue={setValue}
        />
        <HorizontalSpacing size="spacing3" />
        <SenderSection register={register} errors={errors} />
        <HorizontalSpacing size="spacing3" />
        <ReceiverSection />
        <HorizontalSpacing size="spacing3" />
        <ProductInfoSection />
        <HorizontalSpacing size="spacing3" />
        <OrderSubmitBar formRef={formRef} />
      </form>
    </FormProvider>
  );
}

export default OrderPage;
