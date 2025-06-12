type HeaderTitleProps = {
  title: string;
};

const HeaderTitle = ({ title }: HeaderTitleProps) => {
  return (
    <p
      className="
        text-2xl 
        sm:text-3xl 
        md:text-4xl 
        lg:text-5xl 
        uppercase 
        mb-4 
        font-bold 
        inline-block 
        text-black 
        border-b-4 
        border-[#e95b5b]
      "
    >
      {title}
    </p>
  );
};

export default HeaderTitle;
