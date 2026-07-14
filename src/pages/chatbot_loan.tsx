import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "zmp-ui";
import { Page, Header, Box } from "zmp-ui";

import { useListQuestionExLoan, getAnswerText } from "@/hooks/useLoanProducts";
import ChatConversation from "./widgets/ChatConversation";
import QuestionEditView from "./widgets/QuestionEditView";

const SKIP_STOP_TYPES = ["EXPRESSLOAN_INTRODUCE", "EXPRESSLOAN_CONFIRM"];

function ChatbotPage() {
  const { questions, fetchListQuestion } = useListQuestionExLoan();

  // questionType đang được thao tác trên view input duy nhất (dù là trả lời mới hay sửa)
  const [activeQuestionType, setActiveQuestionType] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchListQuestion("2");
  }, []);

  // Câu hỏi đầu tiên chưa có trả lời (không tính skip type) — tự động là câu active
  // nếu người dùng chưa chủ động bấm edit câu khác
  const firstUnansweredType = useMemo(() => {
    const found = questions.find(
      (q) => q.enable && !q.answer?.value && !SKIP_STOP_TYPES.includes(q.questionType)
    );
    return found?.questionType ?? null;
  }, [questions]);

  useEffect(() => {
    // mỗi khi list câu hỏi đổi, nếu người dùng không đang sửa dở câu nào khác,
    // đưa input về đúng câu chưa trả lời tiếp theo
    setActiveQuestionType((current) => {
      if (current && questions.some((q) => q.questionType === current)) {
        return current;
      }
      return firstUnansweredType;
    });
  }, [firstUnansweredType, questions]);

  const handleEdit = (questionType: string) => {
    const el = document.getElementById(`question-${questionType}`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    setActiveQuestionType(questionType);
  };

  const handleSubmit = (questionType: string, value: string) => {
    // TODO: gọi API submit/cập nhật answer cho questionType tương ứng
    console.log("Submit answer:", questionType, value);

    // sau khi submit xong, quay lại theo câu chưa trả lời tiếp theo
    setActiveQuestionType(null);
  };

  const activeRawValue =
    questions.find((q) => q.questionType === activeQuestionType)?.answer?.value ?? "";
  const activeValue = getAnswerText(activeRawValue);

  return (
    <Page className="flex flex-col pt-20 min-h-screen bg-white">
      <Header
        title="Đăng ký vay tài tốc"
        className="overflow-hidden bg-transparent"
        style={{ backgroundColor: "transparent", color: "#476EFF", paddingLeft: 25 }}
        showBackIcon={false}
      />

      <ChatConversation questions={questions} onEdit={handleEdit} />

      {activeQuestionType && (
        <Box
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg"
          style={{ zIndex: 1000 }}
        >
          <QuestionEditView
            key={activeQuestionType} // remount khi đổi câu hỏi để reset state input bên trong
            questionType={activeQuestionType}
            value={activeValue}
            onSubmit={handleSubmit}
          />
        </Box>
      )}
    </Page>
  );
}

export default ChatbotPage;