import {
  modalTitleStyle,
  modalDescriptionStyle,
  modalAddButtonStyle,
  modalFooterStyle,
  modalCancelButtonStyle,
  modalConfirmButtonStyle,
  receiverListScrollContainer,
} from "./styles";
import { useOrder } from "@/contexts/OrderContext";

import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import ModalLayout from "@/components/layout/ModalLayout";
import ReceiverForm from "./ReceiverForm";

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
    <ModalLayout onClose={onClose}>
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
        <ReceiverForm
          receivers={localReceivers}
          onChange={handleInputChange}
          onRemove={handleRemoveClick}
          showValidation={showValidation}
        />
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
    </ModalLayout>
  );
}

export default ReceiverSelectModal;
