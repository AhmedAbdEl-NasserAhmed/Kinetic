interface Props {
  message: string;
}

function ErrorMessage({ message }: Props) {
  return <p className="text-xl font-normal text-red-500 ">{message}</p>;
}

export default ErrorMessage;
