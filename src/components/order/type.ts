import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

interface Receiver {
  name: string;
  phone: string;
  quantity: number;
}

export type FormValues = {
  message: string;
  sender: string;
  receivers: Receiver[];
};

export type GiftMessageSectionProps = {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  setValue: UseFormSetValue<FormValues>;
};

export type SenderSectionProps = {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
};
