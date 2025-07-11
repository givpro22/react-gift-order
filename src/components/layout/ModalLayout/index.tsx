import type { ReactNode } from "react";
import { modalContainerStyle, modalOverlayStyle } from "./styles";

interface ModalLayoutProps {
  onClose: () => void;
  children: ReactNode;
}

const ModalLayout = ({ onClose, children }: ModalLayoutProps) => {
  return (
    <div css={modalOverlayStyle} onClick={onClose}>
      <div css={modalContainerStyle} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
