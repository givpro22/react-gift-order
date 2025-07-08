import { whiteSectionStyle } from "@/styles/CommonStyles";
import theme from "@/styles/theme";
import { sectionTitleStyle, inputStyle, infoTextStyle } from "./styles";
import { useInput } from "@/hooks/useInput";

function SenderSection({
  senderInput,
}: {
  senderInput: ReturnType<typeof useInput>;
}) {
  return (
    <div css={whiteSectionStyle(theme)}>
      <h3 css={sectionTitleStyle}>보내는 사람</h3>
      <input
        type="text"
        placeholder="이름을 입력하세요."
        css={inputStyle}
        value={senderInput.value}
        onChange={(e) => senderInput.onChange(e.target.value)}
        onBlur={senderInput.onBlur}
      />
      {senderInput.error && (
        <p css={infoTextStyle} style={{ color: "red" }}>
          {senderInput.error}
        </p>
      )}
    </div>
  );
}

export default SenderSection;
