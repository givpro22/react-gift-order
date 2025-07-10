import { css } from "@emotion/react";

export const sectionTitleStyle = css`
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 12px;
`;

export const formGroupStyle = css`
  margin-bottom: 12px;
`;

export const labelStyle = css`
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
`;

export const inputStyle = css`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
`;

export const modalOverlayStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const modalContainerStyle = css`
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80vh;
  box-sizing: border-box;
`;

export const modalTitleStyle = css`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
`;

export const modalDescriptionStyle = css`
  font-size: 13px;
  color: #555;
  line-height: 1.6;
  margin-bottom: 20px;
`;

export const modalAddButtonStyle = css`
  background-color: #f2f2f2;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;

export const modalFooterStyle = css`
  display: flex;
  margin-top: auto;
  gap: 12px;
`;

export const modalCancelButtonStyle = css`
  flex: 1;
  padding: 12px 0;
  background-color: #f2f2f2;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
`;

export const modalConfirmButtonStyle = css`
  flex: 1;
  padding: 12px 0;
  background-color: #ffe000;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
`;

export const receiverListScrollContainer = css`
  overflow-y: auto;
  max-height: 45vh;
  margin-top: 12px;
  margin-bottom: 12px;
  padding-right: 4px;
`;

export const infoTextStyle = css`
  font-size: 12px;
  color: #868b94;
`;
