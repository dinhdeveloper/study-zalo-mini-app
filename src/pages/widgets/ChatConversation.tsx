import ChatBubbleLeft from "./ChatBubbleLeft";
import ChatBubbleRight from "./ChatBubbleRight";
import { Question } from "@/services/loan-product/loan-product.types";
import { getAnswerText } from "@/hooks/useLoanProducts";

interface ChatConversationProps {
  questions: Question[];
  onEdit?: (questionType: string) => void;
}

export default function ChatConversation({
  questions,
  onEdit,
}: ChatConversationProps) {

  const items: React.ReactNode[] = [];

  for (const question of questions) {

    if (!question.enable) continue;

    // Bot
    items.push(
      <ChatBubbleLeft
        key={`left-${question.questionType}`}
        message={question.content}
      />
    );

    // Chưa trả lời -> dừng
    if (!question.answer?.value) {
      break;
    }

    // User
    items.push(
      <ChatBubbleRight
        key={`right-${question.questionType}`}
        id={question.questionType}
        message={getAnswerText(question.answer.value)}
        onEdit={onEdit}
      />
    );
  }

  return <>{items}</>;
}