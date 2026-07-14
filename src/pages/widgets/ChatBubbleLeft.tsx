import { Box, Text } from "zmp-ui";

interface ChatBubbleProps {
  message: string;
  html?: boolean; // true nếu message chứa HTML cần render ra thẻ thật
}

export default function ChatBubbleLeft({ message, html }: ChatBubbleProps) {
  return (
    <Box className="flex flex-row px-5">
      <Box
        className="bg-[#EBF0FF] rounded-tr-2xl rounded-bl-2xl rounded-br-2xl px-4 py-3"
        style={{ maxWidth: "80%" }}
      >
        {html ? (
          <div
            className="text-[14px] [&_a]:text-[#476EFF] [&_a]:no-underline"
            style={{ color: "#1F2937" }}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        ) : (
          <Text className="text-[14px]" style={{ color: "#1F2937" }}>
            {message}
          </Text>
        )}
      </Box>
    </Box>
  );
}