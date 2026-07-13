type Listener = (isLoading: boolean) => void;

let listeners: Listener[] = [];
let activeRequestCount = 0;

export function subscribeLoading(listener: Listener): () => void {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function notify() {
  const isLoading = activeRequestCount > 0;
  listeners.forEach((l) => l(isLoading));
}

export function showLoading() {
  activeRequestCount += 1;
  notify();
}

export function hideLoading() {
  activeRequestCount = Math.max(0, activeRequestCount - 1);
  notify();
}