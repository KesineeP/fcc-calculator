import React from "react";
import Button from "react-bootstrap/Button";

interface Props {
  name: string;
  id: string;
  areaName: string;
  onClickOperation: (name: string) => void;
}
const OperatorButtons: React.FC<Props> = ({
  name,
  id,
  areaName,
  onClickOperation,
}) => {
  const style = {
    default: {
      gridArea: areaName,
      boxShadow: "1px 1px 3px grey",
    },
  };
  return (
    <Button
      variant="outline-info"
      id={id}
      style={style.default}
      onClick={() => onClickOperation(name)}
    >
      {name}
    </Button>
  );
};
export default OperatorButtons;
