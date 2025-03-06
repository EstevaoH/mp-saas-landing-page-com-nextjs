import { AlertDialogTrigger, AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "./ui/alert-dialog";

interface ModalAlertDialogProps {
    triggerText: string; // Texto do botão que abre o diálogo
    title: string; // Título do diálogo
    description: string; // Descrição do diálogo
    cancelText?: string; // Texto do botão de cancelar (opcional)
    actionText: string; // Texto do botão de ação principal
    onAction?: () => void; // Função a ser executada ao clicar no botão de ação
    onCancel?: () => void; // Função a ser executada ao clicar no botão de cancelar
}


export function ModalAlertDialog({ triggerText, title, description, actionText, cancelText = 'Fechar', onAction, onCancel }: ModalAlertDialogProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    {triggerText}
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onCancel}>{cancelText}</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-green-500 hover:bg-green-600"
                        onClick={onAction}
                    >
                        {actionText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}