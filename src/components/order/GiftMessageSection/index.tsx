import { cardData } from "@/mocks/orderCardData";
import { whiteSectionStyle } from "@/styles/CommonStyles";
import theme from "@/styles/theme";
import { useState, useEffect } from "react";
import {
  cardListStyle,
  infoTextStyle,
  selectedCardStyle,
  messageInputStyle,
  cardThumbnailStyle,
  selectedCardImageStyle,
} from "./styles";
import type { GiftMessageSectionProps } from "../type";

const GiftMessageSection = ({
  register,
  errors,
  setValue,
}: GiftMessageSectionProps) => {
  const [selectedCardId, setSelectedCardId] = useState(cardData[0].id);
  const selectedCard = cardData.find((card) => card.id === selectedCardId);

  useEffect(() => {
    if (selectedCard) {
      setValue("message", selectedCard.defaultTextMessage);
    }
  }, [selectedCard, setValue]);

  return (
    <div css={whiteSectionStyle(theme)}>
      <div css={cardListStyle}>
        {cardData.map((card) => (
          <img
            key={card.id}
            src={card.thumbUrl}
            alt="card thumbnail"
            onClick={() => setSelectedCardId(card.id)}
            css={cardThumbnailStyle(card.id === selectedCardId)}
          />
        ))}
      </div>

      {selectedCard && (
        <div css={selectedCardStyle}>
          <img
            src={selectedCard.imageUrl}
            alt="selected card"
            css={selectedCardImageStyle}
          />
        </div>
      )}

      <textarea
        placeholder="메시지를 입력해주세요"
        {...register("message", { required: "메시지를 입력해주세요." })}
        css={messageInputStyle}
      />
      {errors.message && (
        <p css={infoTextStyle} style={{ color: "red" }}>
          {errors.message.message}{" "}
        </p>
      )}
    </div>
  );
};

export default GiftMessageSection;
