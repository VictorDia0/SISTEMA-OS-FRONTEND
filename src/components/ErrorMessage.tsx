import React from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <p className="text-red-500 text-sm text-center">{message}</p>
);

export default ErrorMessage;
