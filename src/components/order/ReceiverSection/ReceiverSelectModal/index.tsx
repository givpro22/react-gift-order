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

import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";

interface Receiver {
  name: string;
  phone: string;
  quantity: number;
}

function ReceiverSelectModal({ onClose }: { onClose: () => void }) {
  const { setValue, getValues } = useFormContext<{
    receivers: Receiver[];
  }>();

  const [localReceivers, setLocalReceivers] = useState<Receiver[]>([]);
  const [showValidation, setShowValidation] = useState(false);

  const { setQuantity, setTotalPrice, productPrice } = useOrder();

  useEffect(() => {
    const currentReceivers = getValues("receivers") || [];
    setLocalReceivers(currentReceivers);
  }, [getValues]);

  const handleAddClick = () => {
    if (localReceivers.length < 10) {
      setLocalReceivers([
        ...localReceivers,
        { name: "", phone: "", quantity: 1 },
      ]);
    }
  };

  const handleRemoveClick = (index: number) => {
    const newReceivers = localReceivers.filter((_, i) => i !== index);
    setLocalReceivers(newReceivers);
  };

  const handleInputChange = (
    index: number,
    field: keyof Receiver,
    value: string | number
  ) => {
    const newReceivers = [...localReceivers];
    if (field === "quantity") {
      newReceivers[index][field] = Number(value);
    } else {
      newReceivers[index][field] = value as string;
    }
    setLocalReceivers(newReceivers);
  };

  const validateReceivers = () => {
    for (let i = 0; i < localReceivers.length; i++) {
      const r = localReceivers[i];
      if (!r.name.trim()) {
        return {
          valid: false,
          message: `받는 사람 ${i + 1}의 이름은 필수입니다.`,
        };
      }
      if (!/^010\d{8}$/.test(r.phone)) {
        return {
          valid: false,
          message: `받는 사람 ${i + 1}의 전화번호 형식이 올바르지 않습니다.`,
        };
      }
      if (localReceivers.filter((rec) => rec.phone === r.phone).length > 1) {
        return {
          valid: false,
          message: `받는 사람 ${i + 1}의 전화번호가 중복됩니다.`,
        };
      }
      if (r.quantity < 1) {
        return {
          valid: false,
          message: `받는 사람 ${i + 1}의 수량은 1 이상이어야 합니다.`,
        };
      }
    }
    return { valid: true };
  };

  const handleCancelClick = () => {
    onClose();
  };

  const handleConfirmClick = async () => {
    setShowValidation(true);
    const validation = validateReceivers();
    if (!validation.valid) {
      return;
    }

    setValue("receivers", localReceivers);

    const totalQuantity = localReceivers.reduce(
      (sum, r) => sum + Number(r.quantity),
      0
    );
    setQuantity(totalQuantity);
    setTotalPrice(totalQuantity * productPrice);

    onClose();
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
              onClick={handleAddClick}
            >
              추가하기
            </button>
          </div>

          <div css={receiverListScrollContainer}>
            {localReceivers.map((receiver, index) => (
              <section key={index}>
                <h4 css={sectionTitleStyle}>
                  받는 사람 {index + 1}{" "}
                  <button
                    type="button"
                    onClick={() => handleRemoveClick(index)}
                  >
                    ✕
                  </button>
                </h4>

                <div css={formGroupStyle}>
                  <label css={labelStyle}>이름</label>
                  <input
                    css={inputStyle}
                    placeholder="이름을 입력하세요."
                    value={receiver.name}
                    onChange={(e) =>
                      handleInputChange(index, "name", e.target.value)
                    }
                  />
                  {showValidation && !receiver.name.trim() && (
                    <p css={infoTextStyle} style={{ color: "red" }}>
                      이름은 필수입니다.
                    </p>
                  )}
                </div>

                <div css={formGroupStyle}>
                  <label css={labelStyle}>전화번호</label>
                  <input
                    css={inputStyle}
                    placeholder="전화번호를 입력하세요."
                    value={receiver.phone}
                    onChange={(e) =>
                      handleInputChange(index, "phone", e.target.value)
                    }
                  />
                  {showValidation &&
                    (!/^010\d{8}$/.test(receiver.phone) ||
                      localReceivers.filter((r) => r.phone === receiver.phone)
                        .length > 1) && (
                      <p css={infoTextStyle} style={{ color: "red" }}>
                        {!/^010\d{8}$/.test(receiver.phone)
                          ? "01012341234 형식이어야 합니다."
                          : "전화번호는 중복될 수 없습니다."}
                      </p>
                    )}
                </div>

                <div css={formGroupStyle}>
                  <label css={labelStyle}>수량</label>
                  <input
                    type="number"
                    css={inputStyle}
                    value={receiver.quantity}
                    onChange={(e) =>
                      handleInputChange(index, "quantity", e.target.value)
                    }
                    min={1}
                  />
                  {showValidation && receiver.quantity < 1 && (
                    <p css={infoTextStyle} style={{ color: "red" }}>
                      수량은 1 이상이어야 합니다.
                    </p>
                  )}
                </div>
              </section>
            ))}
          </div>

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
              {localReceivers.length}명 완료
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReceiverSelectModal;
