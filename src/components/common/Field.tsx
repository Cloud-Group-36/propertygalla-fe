import React from "react";
import {
  Field as ChakraField,
  Input,
  Textarea,
} from "@chakra-ui/react";

interface FieldPropsBase {
  name: string;
  label: string;
  type?: "text" | "password" | "textarea" | "select" | "number" | "file" | "email";
  placeholder?: string;
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;

  options?: { value: string; label: string }[]; // only for select
  isRequired?: boolean;
  accept?: string; // only for file
  min?: number; // only for number
  inputRef?: React.Ref<HTMLInputElement>; // ✅ added
  disabled?: boolean;
  multiple?: boolean

}

const Field: React.FC<FieldPropsBase> = ({
  name,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  options = [],
  isRequired = false,
  accept,
  min,
  inputRef,
  disabled,
  multiple,

}) => {
  return (
    <ChakraField.Root required={isRequired} mt={4}>
      <ChakraField.Label>{label}</ChakraField.Label>
      {type === "textarea" ? (
        <Textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      ) : type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled} 
          style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "0.375rem",
            border: "1px solid #CBD5E0",
            backgroundColor: "white",
          }}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <Input
          ref={inputRef}
          name={name}
          type={type}
          placeholder={placeholder}
          value={type === "file" ? undefined : value}
          onChange={onChange}
          accept={accept}
          min={min}
          disabled={disabled} 
          multiple={multiple}
        />
      )}
    </ChakraField.Root>
  );
};

export default Field;
