import { useEffect } from "react";
import { useNavigate } from "zmp-ui";
import { Box, Icon, Page, Text, Header } from "zmp-ui";

import { useListQuestionExLoan } from "@/hooks/useLoanProducts";
import ChatBubbleLeft from "./widgets/ChatBubbleLeft"
import ChatBubbleRight from "./widgets/ChatBubbleRight"


function ChatbotPage() {
      const { fetchListQuestion } = useListQuestionExLoan();
      const navigate = useNavigate();

      useEffect(() => {
        fetchListQuestion("2");
      }, []);

    return (
        <Page className="flex flex-col pt-20 min-h-screen bg-white gap-4">

            <Header
                title="Đăng ký vay tài tốc"
                className="overflow-hidden bg-transparent"
                style={{ backgroundColor: "transparent", color: "#476EFF", paddingLeft: 25 }}
                showBackIcon={false}
            />

            <ChatBubbleLeft
                message="Vui lòng nhập số điện thoại để iShinhan xác thực thông tin và tiếp tục đăng ký vay nhé!"
            />

            <ChatBubbleRight
                id="phone" message="0975469232"
                onEdit={(id) => {}}
            />
        </Page>
    );
}

export default ChatbotPage;