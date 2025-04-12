import React from "react";
import {
  Field as ChakraField,
  Input,
  Textarea,
} from "@chakra-ui/react";

interface FieldPropsBase {
  name: string;
  label: string;
  type?: "text" | "textarea" | "select" | "number" | "file";
  placeholder?: string;
  value?: string | number;
  onChange: (e: React.ChangeEvent<any>) => void;
  options?: { value: string; label: string }[]; // only for select
  isRequired?: boolean;
  accept?: string; // only for file
  min?: number; // only for number
  inputRef?: React.Ref<HTMLInputElement>; // ✅ added
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
  inputRef
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
          multiple={type === "file"}
        />
      )}
    </ChakraField.Root>
  );
};

export default Field;
