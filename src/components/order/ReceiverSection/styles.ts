import { css } from "@emotion/react";

export const headerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const addButtonStyle = css`
  background: #f5f5f5;
  border: none;
  border-radius: 12px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;

export const emptyBoxStyle = css`
  margin-top: 12px;
  padding: 40px 0;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  text-align: center;
`;

export const emptyTextStyle = css`
  color: #a0a0a0;
  font-size: 14px;
  line-height: 1.5;
`;

export const receiverTableStyle = css`
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;
`;

export const tableHeaderRowStyle = css`
  background-color: #f6f7f9;
`;

export const tableHeaderCellStyle = css`
  text-align: left;
  padding: 12px;
`;

export const tableRowStyle = css`
  border-top: 1px solid #eee;
`;

export const tableCellStyle = css`
  padding: 12px;
`;
