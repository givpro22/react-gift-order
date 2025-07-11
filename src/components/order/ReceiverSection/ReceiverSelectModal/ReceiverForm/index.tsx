import ReceiverFormItem from "../ReceiverFormItem";
import type { Receiver } from "@/components/order/type";

interface Props {
  receivers: Receiver[];
  onChange: (
    index: number,
    field: keyof Receiver,
    value: string | number
  ) => void;
  onRemove: (index: number) => void;
  showValidation: boolean;
}

export default function ReceiverForm({
  receivers,
  onChange,
  onRemove,
  showValidation,
}: Props) {
  return (
    <>
      {receivers.map((receiver, index) => (
        <ReceiverFormItem
          key={index}
          index={index}
          receiver={receiver}
          receiverList={receivers}
          onChange={onChange}
          onRemove={onRemove}
          showValidation={showValidation}
        />
      ))}
    </>
  );
}
