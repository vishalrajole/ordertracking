type Props = {
  message?: string;
  children?: React.ReactNode;
  dataTestId?: string;
};

const Loading = ({ children, message, dataTestId }: Props) => {
  return <div data-testid={dataTestId}>{message}</div>;
};

export default Loading;
