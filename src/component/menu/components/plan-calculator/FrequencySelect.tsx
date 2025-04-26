import React, { useEffect } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import "./styles/FrequencySelect.css";

const FrequencySelect: React.FC<any> = (props) => {
  const { setFrequency } = props;
  const frequencies = ["Daily", "Holding", "Half Yearly", "Quarterly"];
  const [selected, setSelected] = React.useState("Daily");

  useEffect(() => {
    setFrequency(selected);
  }, [selected]);

  return (
    <div className={`multi-switch-button ${props.className}`}>
      <ButtonGroup className="frequency-button-group d-flex justify-content-center">
        {frequencies.map((frequency, idx) => (
          <ToggleButton
            key={idx}
            id={`frequency-${idx}`}
            type="radio"
            name="frequency"
            value={frequency}
            checked={selected === frequency}
            onChange={(e) => setSelected(e.currentTarget.value)}
            style={{
              borderRadius: "20px",
              boxShadow:
                selected === frequency
                  ? "#2d2d2d 2px 3px 10px 3px inset"
                  : "none",
            }}
            className="custom-toggle-button"
          >
            {frequency}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default FrequencySelect;
