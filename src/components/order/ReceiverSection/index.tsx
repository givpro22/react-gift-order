type Receiver = {
  name: string;
  phone: string;
  quantity: number;
};
import { whiteSectionStyle } from "@/styles/CommonStyles";
import theme from "@/styles/theme";
import { sectionTitleStyle } from "./ReceiverSelectModal/styles";
import {
  addButtonStyle,
  emptyBoxStyle,
  emptyTextStyle,
  headerStyle,
  receiverTableStyle,
  tableHeaderRowStyle,
  tableHeaderCellStyle,
  tableRowStyle,
  tableCellStyle,
} from "./styles";
import { useEffect, useState } from "react";
import ReceiverSelectModal from "./ReceiverSelectModal";
import { useFormContext } from "react-hook-form";

function ReceiverSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { watch, setValue } = useFormContext();
  const receivers: Receiver[] = watch("receivers") || [];

  useEffect(() => {
    setValue("receivers", []);
  }, []);

  return (
    <>
      <div css={whiteSectionStyle(theme)}>
        <div css={headerStyle}>
          <h3 css={sectionTitleStyle}>받는 사람</h3>
          <div css={addButtonStyle} onClick={openModal}>
            추가
          </div>
        </div>

        {receivers.length === 0 ? (
          <div css={emptyBoxStyle}>
            <p css={emptyTextStyle}>
              받는 사람이 없습니다.
              <br />
              받는 사람을 추가해주세요.
            </p>
          </div>
        ) : (
          <table css={receiverTableStyle}>
            <thead>
              <tr css={tableHeaderRowStyle}>
                <th css={tableHeaderCellStyle}>이름</th>
                <th css={tableHeaderCellStyle}>전화번호</th>
                <th css={tableHeaderCellStyle}>수량</th>
              </tr>
            </thead>
            <tbody>
              {receivers.map((receiver: Receiver, index: number) => (
                <tr key={index} css={tableRowStyle}>
                  <td css={tableCellStyle}>{receiver.name}</td>
                  <td css={tableCellStyle}>{receiver.phone}</td>
                  <td css={tableCellStyle}>{receiver.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {isModalOpen && <ReceiverSelectModal onClose={closeModal} />}
    </>
  );
}

export default ReceiverSection;
