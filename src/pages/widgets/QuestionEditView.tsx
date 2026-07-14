import { useState } from "react";
import { Box, Input, Icon, Text as ZText } from "zmp-ui";

interface QuestionEditViewProps {
  questionType: string;
  value: string;
  onSubmit: (questionType: string, value: string) => void;
  onClose?: () => void;
}

type FieldConfig = {
  placeholder: string;
  inputMode?: "text" | "numeric" | "email";
  maxLength?: number;
  transform?: (raw: string) => string;
  validate: (value: string) => boolean;
};

// Cấu hình theo từng questionType — muốn thêm loại câu hỏi mới chỉ cần khai báo thêm ở đây
const FIELD_CONFIG: Record<string, FieldConfig> = {
  EXPRESSLOAN_PHONE: {
    placeholder: "Nhập số điện thoại",
    inputMode: "numeric",
    maxLength: 10,
    transform: (raw) => raw.replace(/\D/g, "").slice(0, 10),
    validate: (v) => v.length === 10,
  },
  EXPRESSLOAN_EMAIL: {
    placeholder: "Nhập địa chỉ email",
    inputMode: "email",
    transform: (raw) => raw.trim(),
    validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  },
  // fallback mặc định cho các loại câu hỏi dạng text tự do
  DEFAULT: {
    placeholder: "Nhập câu trả lời",
    transform: (raw) => raw,
    validate: (v) => v.trim().length > 0,
  },
};

function getFieldConfig(questionType: string): FieldConfig {
  return FIELD_CONFIG[questionType] ?? FIELD_CONFIG.DEFAULT;
}

export default function QuestionEditView({
  questionType,
  value: initialValue,
  onSubmit,
}: QuestionEditViewProps) {
  const config = getFieldConfig(questionType);
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setValue(config.transform ? config.transform(raw) : raw);
  };

  const isValid = config.validate(value);

  const htmlInputMode =
    config.inputMode === "email"
      ? "email"
      : config.inputMode === "numeric"
        ? "numeric"
        : "text";

  return (
    <Box className="flex flex-col gap-3 p-4">
      <Input
        autoFocus
        type="text"
        inputMode={htmlInputMode}
        maxLength={config.maxLength}
        value={value}
        onChange={handleChange}
        placeholder={config.placeholder}
      />

      <Box className="flex items-center justify-end gap-2">
        <ZText
          className="text-[14px] font-medium"
          style={{ color: isValid ? "#476EFF" : "#9CA3AF" }}
        >
          Đi tiếp
        </ZText>

        <Box
          className="flex items-center justify-center rounded-full"
          style={{
            width: 36,
            height: 36,
            backgroundColor: isValid ? "#476EFF" : "#D1D5DB",
            cursor: isValid ? "pointer" : "not-allowed",
          }}
          onClick={() => {
            if (isValid) onSubmit(questionType, value);
          }}
        >
          <Icon icon="zi-arrow-right" style={{ color: "#FFFFFF" }} size={18} />
        </Box>
      </Box>
    </Box>
  );
}