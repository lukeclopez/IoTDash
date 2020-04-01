import React from "react";
import { Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";

const PrependForm = props => {
  return (
    <InputGroup>
      <InputGroupAddon addonType="prepend">
        <InputGroupText>{props.prependtext}</InputGroupText>
      </InputGroupAddon>
      <Input {...props} />
    </InputGroup>
  );
};

export default PrependForm;
