import "./button.sass";

interface ButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`${props.className} default-btn `}
    >
      {props.text}
    </button>
  );
};
