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
import { useInput } from "@/hooks/useInput";

const GiftMessageSection = ({
  messageInput,
}: {
  messageInput: ReturnType<typeof useInput>;
}) => {
  const [selectedCardId, setSelectedCardId] = useState(cardData[0].id);
  const selectedCard = cardData.find((card) => card.id === selectedCardId);

  useEffect(() => {
    messageInput.setValue(selectedCard?.defaultTextMessage ?? "");
  }, [selectedCard]);

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
        value={messageInput.value}
        onChange={(e) => messageInput.onChange(e.target.value)}
        css={messageInputStyle}
        onBlur={messageInput.onBlur}
      />
      {messageInput.error && (
        <p css={infoTextStyle} style={{ color: "red" }}>
          {messageInput.error}{" "}
        </p>
      )}
    </div>
  );
};

export default GiftMessageSection;
