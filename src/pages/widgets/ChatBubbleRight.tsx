import { Box, Icon, Text } from "zmp-ui";

interface ChatBubbleRightProps {
    id: string;
    message: string;
    onEdit?: (id: string) => void;
}

export default function ChatBubbleRight({
    id,
    message,
    onEdit,
}: ChatBubbleRightProps) {
    return (
        <Box className="flex flex-row items-center justify-end px-5">
            <Box
                className="mr-3"
                onClick={() => onEdit?.(id)}
            >
                <Icon
                    icon="zi-edit-text"
                    size={20}
                    style={{ color: "#9CA3AF" }}
                />
            </Box>

            <Box className="bg-[#476EFF] rounded-tl-2xl rounded-bl-2xl rounded-br-2xl px-4 py-3">
                <Text className="text-white text-[14px] text-right">
                    {message}
                </Text>
            </Box>
        </Box>
    );
}