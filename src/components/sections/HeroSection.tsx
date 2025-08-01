export function HeroSection() {
  const buttonClasses = "h-[34px] w-[100px] rounded-full font-nunito text-base leading-[26px] transition-colors flex items-center justify-center bg-primary text-black-87 hover:bg-primary/90 no-underline";

  return (
    <section className="max-w-[1170px] px-4 mx-auto pt-10 sm:pt-0 sm:flex sm:items-center sm:justify-center bg-cover bg-center h-[500px] md:h-[650px] hero-background">
      <div className="text-center mx-auto text-white max-w-[328px] sm:max-w-[380px] flex flex-col justify-center items-center">
        <h1 className="font-nunito text-[40px] font-normal leading-none mb-[21px]">
          Test assignment for front-end developer
        </h1>
        <p className="font-nunito text-base leading-relaxed mb-8">
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they'll be building web interfaces with accessibility in
          mind. They should also be excited to learn, as the world of Front-End
          Development keeps evolving.
        </p>
        <a href="#signup" className={buttonClasses}>
          Sign up
        </a>
      </div>
    </section>
  );
}
