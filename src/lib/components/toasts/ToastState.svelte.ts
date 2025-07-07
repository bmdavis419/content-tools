import { getContext, setContext } from "svelte";

type Toast = {
  type: "info" | "error" | "warning" | "success";
  title: string;
  description: string;
  duration: number;
  id: string;
};

class ToastState {
  toasts = $state<Toast[]>([]);

  addToast(toast: Omit<Toast, "id">) {
    const id = Math.random().toString(36).substring(2, 15);
    const newToast: Toast = {
      ...toast,
      id,
    };

    this.toasts.push(newToast);

    setTimeout(() => {
      this.removeToast(id);
    }, toast.duration);

    return newToast;
  }

  removeToast(id: string) {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
  }
}

const DEFAULT_KEY = "$_toast_state";

export const getToastContext = (key = DEFAULT_KEY) => {
  const store = getContext<ToastState>(key);

  if (!store) {
    throw new Error(`Toast context not found for key: ${key}`);
  }

  return store;
};

export const setToastContext = (key = DEFAULT_KEY) => {
  const nStore = new ToastState();

  return setContext(key, nStore);
};
