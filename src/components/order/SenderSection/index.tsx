import { whiteSectionStyle } from "@/styles/CommonStyles";
import theme from "@/styles/theme";
import { sectionTitleStyle, inputStyle, infoTextStyle } from "./styles";
import type { SenderSectionProps } from "../type";

function SenderSection({ register, errors }: SenderSectionProps) {
  return (
    <div css={whiteSectionStyle(theme)}>
      <h3 css={sectionTitleStyle}>보내는 사람</h3>
      <input
        type="text"
        placeholder="이름을 입력하세요."
        css={inputStyle}
        {...register("sender", { required: "이름을 입력해주세요." })}
      />
      {errors.sender && (
        <p css={infoTextStyle} style={{ color: "red" }}>
          {errors.sender?.message}
        </p>
      )}
    </div>
  );
}

export default SenderSection;
