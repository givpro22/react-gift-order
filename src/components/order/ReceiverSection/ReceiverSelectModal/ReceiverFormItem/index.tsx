import {
  sectionTitleStyle,
  formGroupStyle,
  labelStyle,
  inputStyle,
  infoTextStyle,
} from "../styles";
import type { Receiver } from "@/components/order/type";

interface Props {
  index: number;
  receiver: Receiver;
  receiverList: Receiver[];
  onChange: (
    index: number,
    field: keyof Receiver,
    value: string | number
  ) => void;
  onRemove: (index: number) => void;
  showValidation: boolean;
}

function ReceiverFormItem({
  index,
  receiver,
  receiverList,
  onChange,
  onRemove,
  showValidation,
}: Props) {
  return (
    <section>
      <h4 css={sectionTitleStyle}>
        받는 사람 {index + 1}
        <button type="button" onClick={() => onRemove(index)}>
          ✕
        </button>
      </h4>

      <div css={formGroupStyle}>
        <label css={labelStyle}>이름</label>
        <input
          css={inputStyle}
          placeholder="이름을 입력하세요."
          value={receiver.name}
          onChange={(e) => onChange(index, "name", e.target.value)}
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
          onChange={(e) => onChange(index, "phone", e.target.value)}
        />
        {showValidation &&
          (!/^010\d{8}$/.test(receiver.phone) ||
            receiverList.filter((r) => r.phone === receiver.phone).length >
              1) && (
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
          onChange={(e) => onChange(index, "quantity", e.target.value)}
          min={1}
        />
        {showValidation && receiver.quantity < 1 && (
          <p css={infoTextStyle} style={{ color: "red" }}>
            수량은 1 이상이어야 합니다.
          </p>
        )}
      </div>
    </section>
  );
}

export default ReceiverFormItem;
