import React from "react";
import Button from "react-bootstrap/Button";
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
interface Props {
  name: string;
  id: string;
  areaName: string;
  onClickNumber: (name: string) => void;
}

const NumberButtons: React.FC<Props> = ({
  name,
  areaName,
  onClickNumber,
  id,
}) => {
  const style = {
    default: {
      gridArea: areaName,
      boxShadow: "1px 1px 3px grey",
    },
  };
  return (
    <Button
      type="button"
      variant="outline-secondary"
      id={id}
      style={style.default}
      onClick={() => onClickNumber(name)}
    >
      {name}
    </Button>
  );
};

export default NumberButtons;
