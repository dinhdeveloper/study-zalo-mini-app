import { useRef } from "react";
import { useSnackbar } from "zmp-ui";

/**
 * Wrapper quanh useSnackbar của zmp-ui — trả về hàm ổn định (không đổi reference
 * qua mỗi lần render), tránh việc đưa openSnackbar vào dependency của useCallback
 * gây loop không mong muốn.
 */
export function useStableSnackbar() {
  const { openSnackbar } = useSnackbar();
  const ref = useRef(openSnackbar);
  ref.current = openSnackbar;

  const showError = (text: string) => {
    ref.current({ text, type: "error", duration: 3000 });
  };

  const showSuccess = (text: string) => {
    ref.current({ text, type: "success", duration: 3000 });
  };

  return { showError, showSuccess };
}