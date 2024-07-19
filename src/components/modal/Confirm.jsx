import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogOverlay,
} from "@/components/ui/alert-dialog";
import { useTranslation } from "react-i18next";
import LoadingDot from "../loading/LoadingDot";
import styles from "./style.module.css";
import clsx from "clsx";

function Confirm(props) {
  const { t } = useTranslation();

  const {
    show,
    title,
    content,
    onDismiss,
    onAction,
    children,
    dialogActionText = t("common:continue"),
    dialogCancel = t("common:cancel"),
    isLoading = false,
    modalId = "",
    showFooter = true
  } = props;

  return (
    <AlertDialog open={show} onDismiss={onDismiss}>
      <AlertDialogOverlay onClick={onDismiss}/>
      <AlertDialogContent id={modalId} className={clsx(styles["modal-container"])}>
        <AlertDialogHeader>
          {title && <AlertDialogTitle>{title}</AlertDialogTitle>}
          <AlertDialogDescription className="text-lg text-black modal-dialog-content">
            { content ?? "" }
          </AlertDialogDescription>
        </AlertDialogHeader>
        { children ?? "" }
        {showFooter ? <AlertDialogFooter className={clsx(styles["modal-dialog-action"], "modal-dialog-action")}>
          <AlertDialogCancel onClick={onDismiss}>{dialogCancel}</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onAction}
            disabled={isLoading}
            className={`${isLoading ? "bg-gray-400 hover:bg-gray-400 active:bg-gray-400" : "bg-neutral-600 hover:bg-brand-600"}`}
          >
            { isLoading ? <LoadingDot /> : dialogActionText }
          </AlertDialogAction>
        </AlertDialogFooter> : ""}
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Confirm;
