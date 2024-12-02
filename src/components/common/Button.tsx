import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const getVariantClasses = (variant: string) => {
  switch (variant) {
    case 'primary':
      return 'bg-[var(--color-primary)] text-[var(--text-white)] hover:bg-[var(--color-primary-hover)] shadow-md hover:shadow-lg';
    case 'secondary':
      return 'bg-[var(--color-secondary)] text-[var(--text-white)] hover:bg-[var(--color-secondary-hover)] shadow-md hover:shadow-lg';
    case 'outline':
      return 'border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--text-white)] hover:shadow-lg';
    default:
      return '';
  }
};

const getSizeClasses = (size: string) => {
  switch (size) {
    case 'sm':
      return 'px-4 py-2 text-sm';
    case 'lg':
      return 'px-8 py-4 text-lg';
    default:
      return 'px-6 py-3 text-base';
  }
};

const Button = ({ 
  children, 
  className = '', 
  variant = 'primary', 
  size = 'md', 
  ...props 
}: ButtonProps) => {
  return (
    <button
      className={`
        inline-flex items-center justify-center
        rounded-full
        font-medium
        transition-all duration-300
        transform hover:scale-[1.02] active:scale-[0.98]
        ${getVariantClasses(variant)}
        ${getSizeClasses(size)}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
