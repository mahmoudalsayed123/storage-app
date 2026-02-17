
const MainHeading = ({
  heading,
  totalSize,
}: {
  heading: string;
  totalSize: string;
}) => {
  return (
    <div className="mb-[70px]">
      <h1 className="text-[32px] sm:text-[40px] font-bold mb-3">{heading}</h1>
      <p>
        Total: <span className="font-bold">{totalSize} MB</span>
      </p>
    </div>
  );
};

export default MainHeading;
