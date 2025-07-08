import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

export type FormValues = {
  message: string;
  sender: string;
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
