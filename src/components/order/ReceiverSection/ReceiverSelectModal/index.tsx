import {
  modalOverlayStyle,
  modalContainerStyle,
  modalTitleStyle,
  modalDescriptionStyle,
  modalAddButtonStyle,
  modalFooterStyle,
  modalCancelButtonStyle,
  modalConfirmButtonStyle,
  sectionTitleStyle,
  formGroupStyle,
  labelStyle,
  inputStyle,
  receiverListScrollContainer,
  infoTextStyle,
} from "./styles";
import { useOrder } from "@/contexts/OrderContext";

import { useFieldArray, useFormContext } from "react-hook-form";

interface Receiver {
  name: string;
  phone: string;
  quantity: number;
}

function ReceiverSelectModal({ onClose }: { onClose: () => void }) {
  const {
    register,
    setValue,
    trigger,
    getValues,
    formState: { errors },
    control,
  } = useFormContext<{
    receivers: Receiver[];
  }>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "receivers",
  });
  const { setQuantity, setTotalPrice, productPrice } = useOrder();

  const handleCancelClick = async () => {
    const isValid = await trigger("receivers");
    if (!isValid) {
      setValue("receivers", [], { shouldDirty: false });
    }
    onClose();
  };

  const handleConfirmClick = async () => {
    const isValid = await trigger("receivers");
    if (isValid) {
      const values = getValues("receivers");
      setValue("receivers", values);

      const totalQuantity = values.reduce(
        (sum, r) => sum + Number(r.quantity),
        0
      );
      setQuantity(totalQuantity);
      setTotalPrice(totalQuantity * productPrice);

      onClose();
    }
  };

  return (
    <>
      <div css={modalOverlayStyle} onClick={onClose}>
        <div css={modalContainerStyle} onClick={(e) => e.stopPropagation()}>
          <div>
            <h3 css={modalTitleStyle}>받는 사람</h3>
            <p css={modalDescriptionStyle}>
              * 최대 10명까지 추가할 수 있어요.
              <br />* 받는 사람의 전화번호를 중복으로 입력할 수 없어요.
            </p>
            <button
              type="button"
              css={modalAddButtonStyle}
              onClick={() => {
                if (fields.length < 10)
                  append({ name: "", phone: "", quantity: 1 });
              }}
            >
              추가하기
            </button>
          </div>

          <div css={receiverListScrollContainer}>
            {fields.map((field, index) => (
              <section key={field.id}>
                <h4 css={sectionTitleStyle}>
                  받는 사람 {index + 1}{" "}
                  <button type="button" onClick={() => remove(index)}>
                    ✕
                  </button>
                </h4>

                <div css={formGroupStyle}>
                  <label css={labelStyle}>이름</label>
                  <input
                    css={inputStyle}
                    placeholder="이름을 입력하세요."
                    {...register(`receivers.${index}.name`, {
                      required: "이름은 필수입니다.",
                    })}
                  />
                  {errors.receivers?.[index]?.name && (
                    <p css={infoTextStyle} style={{ color: "red" }}>
                      {errors.receivers[index].name?.message}
                    </p>
                  )}
                </div>

                <div css={formGroupStyle}>
                  <label css={labelStyle}>전화번호</label>
                  <input
                    css={inputStyle}
                    placeholder="전화번호를 입력하세요."
                    {...register(`receivers.${index}.phone`, {
                      required: "전화번호는 필수입니다.",
                      pattern: {
                        value: /^010\d{8}$/,
                        message: "01012341234 형식이어야 합니다.",
                      },
                      validate: (value) => {
                        const allValues = getValues("receivers");
                        const duplicates = allValues.filter(
                          (r) => r.phone === value
                        );
                        if (duplicates.length > 1) {
                          return "전화번호는 중복될 수 없습니다.";
                        }
                        return true;
                      },
                    })}
                  />
                  {errors.receivers?.[index]?.phone && (
                    <p css={infoTextStyle} style={{ color: "red" }}>
                      {errors.receivers[index].phone?.message}
                    </p>
                  )}
                </div>

                <div css={formGroupStyle}>
                  <label css={labelStyle}>수량</label>
                  <input
                    type="number"
                    defaultValue={1}
                    css={inputStyle}
                    {...register(`receivers.${index}.quantity`, {
                      required: true,
                      min: { value: 1, message: "수량은 1 이상이어야 합니다." },
                    })}
                  />
                  {errors.receivers?.[index]?.quantity && (
                    <p css={infoTextStyle} style={{ color: "red" }}>
                      {errors.receivers[index].quantity?.message}
                    </p>
                  )}
                </div>
              </section>
            ))}
          </div>

          {typeof errors.receivers?.message === "string" && (
            <p style={{ color: "red" }}>{errors.receivers.message}</p>
          )}

          <div css={modalFooterStyle}>
            <button
              type="button"
              css={modalCancelButtonStyle}
              onClick={handleCancelClick}
            >
              취소
            </button>
            <button
              type="button"
              css={modalConfirmButtonStyle}
              onClick={handleConfirmClick}
            >
              {fields.length}명 완료
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReceiverSelectModal;
