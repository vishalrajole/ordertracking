type Props = {
  message?: string;
  children?: React.ReactNode;
};

const Loading = ({ children, message }: Props) => {
  return <div>{message}</div>;
};

export default Loading;
