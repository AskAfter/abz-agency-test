import logo from '/images/logo.svg';

export function Header() {
  const buttonClasses =
    'h-[34px] w-[100px] rounded-full font-nunito text-base leading-[26px] transition-colors flex items-center justify-center bg-primary text-black-87 hover:bg-primary/90 no-underline';

  return (
    <header className="bg-white h-[60px] w-full mx-auto">
      <div className="bg-transparent px-4 h-[60px] flex justify-between items-center max-w-[1170px] mx-auto md:px-[32px] lg:px-[60px] xl:px-0">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-[104px] h-[26px]" />
        </div>
        <div className="flex items-center gap-2.5">
          <a href="#users" className={buttonClasses}>
            Users
          </a>
          <a href="#signup" className={buttonClasses}>
            Sign up
          </a>
        </div>
      </div>
    </header>
  );
}
