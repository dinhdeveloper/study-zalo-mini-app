import ChatBubbleLeft from "./ChatBubbleLeft";
import ChatBubbleRight from "./ChatBubbleRight";
import { ExpressLoanQuestion } from "@/hooks/models/expressLoan";
import { getAnswerText } from "@/hooks/useLoanProducts";

interface ChatConversationProps {
  questions: ExpressLoanQuestion[];
  onEdit?: (questionType: string) => void;
}

const SKIP_STOP_TYPES = ["EXPRESSLOAN_INTRODUCE", "EXPRESSLOAN_CONFIRM"];

function isHtmlContent(content?: string): boolean {
  if (!content) return false;
  return /<[a-z][\s\S]*>/i.test(content);
}

export default function ChatConversation({
  questions,
  onEdit,
}: ChatConversationProps) {
  const items: React.ReactNode[] = [];
  const list = Array.isArray(questions) ? questions : [];

  for (const question of list) {
    if (!question.enable) continue;

    items.push(
      <div
        id={`question-${question.questionType}`}
        key={`wrap-${question.questionType}`}
        className="flex flex-col gap-3"
      >
        <ChatBubbleLeft
          message={question.content ?? ""}
          html={isHtmlContent(question.content)}
        />

        {question.answer?.value && (
          <ChatBubbleRight
            id={question.questionType}
            message={getAnswerText(question.answer.value)}
            onEdit={onEdit}
          />
        )}
      </div>
    );

    const hasAnswer = !!question.answer?.value;
    const isSkipStopType = SKIP_STOP_TYPES.includes(question.questionType);

    if (!hasAnswer && !isSkipStopType) {
      break;
    }
  }

  return <div className="flex flex-col gap-3">{items}</div>;
}