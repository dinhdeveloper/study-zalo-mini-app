import { Box, Text } from "zmp-ui";

interface ChatBubbleProps {
  message: string;
}

export default function ChatBubbleLeft({ message }: ChatBubbleProps) {
  return (
    <Box className="flex flex-row px-5">
      <Box
        className="bg-[#EBF0FF] rounded-tr-2xl rounded-bl-2xl rounded-br-2xl px-4 py-3"
        style={{ maxWidth: "80%" }}
      >
        <Text
          className="text-[14px]"
          style={{ color: "#1F2937" }}
        >
          {message}
        </Text>
      </Box>
    </Box>
  );
}