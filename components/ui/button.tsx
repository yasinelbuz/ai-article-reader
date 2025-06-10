import { ButtonHTMLAttributes, forwardRef } from 'react';

export type ButtonVariant =
  | 'default'
  | 'alternative'
  | 'dark'
  | 'light'
  | 'green'
  | 'red'
  | 'yellow'
  | 'purple'
  | 'gradientPurpleBlue'
  | 'gradientCyanBlue'
  | 'gradientGreenBlue'
  | 'gradientPurplePink'
  | 'gradientPinkOrange'
  | 'gradientTealLime'
  | 'gradientRedYellow'
  | 'outline'
  | 'outline-green'
  | 'outline-red'
  | 'outline-yellow'
  | 'outline-purple';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', className = '', ...props }, ref) => {
    const baseStyles =
      'font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles: Record<ButtonVariant, string> = {
      default:
        'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
      alternative:
        'py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700',
      dark: 'text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700',
      light:
        'text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700',
      green:
        'text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800',
      red: 'text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900',
      yellow:
        'text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900',
      purple:
        'text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900',
      gradientPurpleBlue:
        'text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800',
      gradientCyanBlue:
        'text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800',
      gradientGreenBlue:
        'text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800',
      gradientPurplePink:
        'text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800',
      gradientPinkOrange:
        'text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800',
      gradientTealLime:
        'text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700',
      gradientRedYellow:
        'text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400',
      outline:
        'text-blue-700 bg-transparent border border-blue-700 hover:bg-blue-100 focus:ring-4 focus:ring-blue-300 dark:text-blue-500 dark:border-blue-500 dark:hover:bg-blue-800 dark:focus:ring-blue-800',
      'outline-green':
        'text-green-700 bg-transparent border border-green-700 hover:bg-green-100 focus:ring-4 focus:ring-green-300 dark:text-green-500 dark:border-green-500 dark:hover:bg-green-800 dark:focus:ring-green-800',
      'outline-red':
        'text-red-700 bg-transparent border border-red-700 hover:bg-red-100 focus:ring-4 focus:ring-red-300 dark:text-red-500 dark:border-red-500 dark:hover:bg-red-800 dark:focus:ring-red-800',
      'outline-yellow':
        'text-yellow-400 bg-transparent border border-yellow-400 hover:bg-yellow-100 focus:ring-4 focus:ring-yellow-300 dark:text-yellow-400 dark:border-yellow-400 dark:hover:bg-yellow-800 dark:focus:ring-yellow-900',
      'outline-purple':
        'text-purple-700 bg-transparent border border-purple-700 hover:bg-purple-100 focus:ring-4 focus:ring-purple-300 dark:text-purple-500 dark:border-purple-500 dark:hover:bg-purple-800 dark:focus:ring-purple-800',
    };

    return (
      <button
        disabled={props.disabled}
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export default Button;
