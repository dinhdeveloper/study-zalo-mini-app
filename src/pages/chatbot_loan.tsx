import { useEffect, useState } from "react";
import { useNavigate } from "zmp-ui";
import { Page, Header, Box } from "zmp-ui";

import { useListQuestionExLoan, getAnswerText } from "@/hooks/useLoanProducts";
import ChatConversation from "./widgets/ChatConversation";
import EditPanel from "./widgets/EditPhoneLoan";

function ChatbotPage() {
  const { questions, fetchListQuestion } = useListQuestionExLoan();
  const [editingQuestionType, setEditingQuestionType] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchListQuestion("2");
  }, []);

  const handleEdit = (questionType: string) => {
    const el = document.getElementById(`question-${questionType}`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });

    setEditingQuestionType(questionType);
  };

  const handleCloseEdit = () => {
    setEditingQuestionType(null);
  };

  const handleSubmitEdit = (questionType: string, value: string) => {
    // TODO: gọi API cập nhật answer mới cho questionType tương ứng
    console.log("Submit edit:", questionType, value);
    setEditingQuestionType(null);
  };

  const rawValue = questions.find(
    (q) => q.questionType === editingQuestionType
  )?.answer?.value ?? "";

  // parse ra giá trị thật bên trong, ví dụ: {"phone":"0975469232"} -> "0975469232"
  const editingValue = getAnswerText(rawValue);

  return (
    <Page className="flex flex-col pt-20 min-h-screen bg-white">
      <Header
        title="Đăng ký vay tài tốc"
        className="overflow-hidden bg-transparent"
        style={{ backgroundColor: "transparent", color: "#476EFF", paddingLeft: 25 }}
        showBackIcon={false}
      />

      <ChatConversation questions={questions} onEdit={handleEdit} />

      {editingQuestionType && (
        <Box
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg"
          style={{ zIndex: 1000 }}
        >
          <EditPanel
            questionType={editingQuestionType}
            value={editingValue}
            onSubmit={handleSubmitEdit}
            onClose={handleCloseEdit}
          />
        </Box>
      )}
    </Page>
  );
}

export default ChatbotPage;