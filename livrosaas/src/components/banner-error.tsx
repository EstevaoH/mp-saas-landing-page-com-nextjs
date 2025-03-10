import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';
import { ReactNode } from 'react';

type BannerType = 'error' | 'warning' | 'success' | 'info';

type BannerErrorProps = {
  text: string;
  type?: BannerType;
  icon?: ReactNode; // Permite personalizar o ícone
  className?: string; // Permite personalizar classes adicionais
};

export default function BannerMessage({ text, type = 'warning', icon, className }: BannerErrorProps) {
  // Define cores e ícones com base no tipo de banner
  const bannerStyles = {
    error: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-l-4 border-red-400 dark:border-red-600',
      text: 'text-red-700 dark:text-red-200',
      icon: <XCircle className="h-5 w-5 text-red-400 dark:text-red-500" />,
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-l-4 border-yellow-400 dark:border-yellow-600',
      text: 'text-yellow-700 dark:text-yellow-200',
      icon: <AlertTriangle className="h-5 w-5 text-yellow-400 dark:text-yellow-500" />,
    },
    success: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-l-4 border-green-400 dark:border-green-600',
      text: 'text-green-700 dark:text-green-200',
      icon: <CheckCircle className="h-5 w-5 text-green-400 dark:text-green-500" />,
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-l-4 border-blue-400 dark:border-blue-600',
      text: 'text-blue-700 dark:text-blue-200',
      icon: <Info className="h-5 w-5 text-blue-400 dark:text-blue-500" />,
    },
  };

  const { bg, border, text: textColor, icon: defaultIcon } = bannerStyles[type];

  return (
    <div
      className={`${bg} ${border} p-4 mb-6 ${className}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex">
        <div className="flex-shrink-0">
          {icon || defaultIcon} {/* Usa o ícone personalizado ou o padrão */}
        </div>
        <div className="ml-3">
          <p className={`text-sm ${textColor}`}>{text}</p>
        </div>
      </div>
    </div>
  );
}