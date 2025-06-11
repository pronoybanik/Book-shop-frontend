type HeaderTitleProps = {
  title: string;
};

const HeaderTitle = ({ title }: HeaderTitleProps) => {
  return (
    <p className="text-4xl uppercase mb-6 font-bold inline text-black border-b-1 border-[#e95b5b]">
      {title}
    </p>
  );
};

export default HeaderTitle;
