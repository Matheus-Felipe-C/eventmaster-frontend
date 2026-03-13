import toast from "react-hot-toast";
import { ToastInfo } from "../../components/Toasts/ToastInfo";

export const notify = {
    success: (message: string) =>
        toast.custom(<ToastInfo message={message} type="success" />, {
            id: "toast-success",
            duration: 5 * 1000,
        }),

    error: (message: string) =>
        toast.custom(
            <ToastInfo message={message} type="error" dismissible={false} />,
            {
                id: "toast-error",
                duration: 5 * 1000,
            }
        ),

    info: (message: string) =>
        toast.custom(<ToastInfo message={message} type="info" />, {
            id: "info-toast",
            duration: 5 * 1000,
        }),
    warning: (message: string) =>
        toast.custom(
            <ToastInfo message={message} type="warning" dismissible={false} />,
            {
                id: "warning-toast",
                duration: 5 * 1000,
            }
        ),
} as const;
