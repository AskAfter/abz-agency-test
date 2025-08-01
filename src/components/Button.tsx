interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "outline";
  type?: "button" | "submit" | "reset";
  width?: string;
  loading?: boolean;
}

export function Button({ 
  label, 
  onClick, 
  disabled = false, 
  variant = "primary",
  type = "button",
  width = "w-[100px]",
  loading = false
}: ButtonProps) {
  const baseClasses = `h-[34px] ${width} rounded-full font-nunito text-base leading-[26px] transition-colors flex items-center justify-center`;
  const variants = {
    primary: disabled || loading
      ? "bg-disabled-bg text-white-87 cursor-not-allowed" 
      : "bg-primary text-black-87 hover:bg-primary/90",
    outline: "border border-primary text-primary hover:bg-primary hover:text-black-87"
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <img 
          src="/images/loader.svg" 
          alt="Loading" 
          className="w-[48px] h-[48px] animate-spin"
        />
      </div>
    );
  }

  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]}`}
    >
      {label}
    </button>
  );
}
