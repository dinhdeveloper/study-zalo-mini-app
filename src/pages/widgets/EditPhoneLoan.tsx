import { useState } from "react";
import { Box, Input, Icon, Text as ZText } from "zmp-ui";

interface EditPanelProps {
  questionType: string;
  value: string;
  onSubmit: (questionType: string, value: string) => void;
  onClose: () => void;
}

export default function EditPanel(props: EditPanelProps) {
  switch (props.questionType) {
    case "EXPRESSLOAN_PHONE":
      return <PhoneEditView {...props} />;
    default:
      return null;
  }
}


function PhoneEditView({ questionType, value: initialValue, onSubmit, onClose }: EditPanelProps) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
    setValue(digitsOnly);
  };

  const isValid = value.length === 10;

  return (
    <Box className="flex flex-col gap-3 p-4">
      <Input
        autoFocus
        type="text"
        inputMode="numeric"
        maxLength={10}
        value={value}
        onChange={handleChange}
        placeholder="Nhập số điện thoại"
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