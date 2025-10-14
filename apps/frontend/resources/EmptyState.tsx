import { H6 } from '@common/components/typography';

interface EmptyStateProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="flex items-center">
        <Icon className="size-7 m-2 text-muted" />
        <H6 className="text-primary text-base">{title}</H6>
      </div>
      <p className="text-sm text-muted max-w-md">{description}</p>
      {action && action}
    </div>
  );
};
