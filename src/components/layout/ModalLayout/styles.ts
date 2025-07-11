import { css } from "@emotion/react";

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
