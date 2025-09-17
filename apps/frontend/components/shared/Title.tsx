

type TitleProps = {
  title: string;

};

export const Title = ({ title }: TitleProps) => {
  return (
    <div className="flex items-center">
      <div className="size-3" />
      <span className="text-dark font-medium text-xs">{title}</span>
    </div>
  );
};
