import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay
} from "@/components/ui/alert-dialog"

function Message(props) {
  const { show, message, onDismiss, dialogActionText = "OK" } = props;

  return (
    <AlertDialog open={show} onDismiss={onDismiss}>
      <AlertDialogOverlay onClick={onDismiss}/>
      <AlertDialogContent>
        <span className="flex justify-end font-bold cursor-pointer" onClick={onDismiss}>&#10005;</span>
        <AlertDialogHeader>
          <AlertDialogDescription className="text-lg text-black text-center mb-3">
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="bg-neutral-600 hover:bg-brand-600 m-auto" onClick={onDismiss}>{ dialogActionText }</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Message;