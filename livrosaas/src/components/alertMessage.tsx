interface AlertMessageProps {
    success?: boolean;
    message?: string;
    errors?: { message: string }[];
}

export function AlertMessage({ success, message, errors }: AlertMessageProps) {
    if (success === false) {
        return (
            <div
                className="grid gap-1 text-xs mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
            >
                <div>
                    <strong className="font-bold">Erro!{' '}</strong>
                    <span className="block sm:inline">{message}</span>
                </div>
                {errors?.map((error, index) => (
                    <div key={index} className="text-red-500 text-sm">
                        {error.message}
                    </div>
                ))}
            </div>
        );
    }

    if (success === true) {
        return (
            <div
                className="grid gap-1 text-xs mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                role="alert"
            >
                <div>
                    <strong className="font-bold">Sucesso!{' '}</strong>
                    <span className="block sm:inline">{message}</span>
                </div>
            </div>
        );
    }

    return null; // Retorna null se não houver mensagem para exibir
}