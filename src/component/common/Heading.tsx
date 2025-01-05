import React from "react";
import "./styles/Heading.css";

export const Heading: React.FC<any> = (props: any) => {
  const {
    heading,
    subHeading,
    headerPosition = "center",
    subHeaderPosition = "center",
    className,
  } = props;
  return (
    <div className={`title-col-div ${className}`}>
      <h2 className={`text-${headerPosition}`}>{heading}</h2>
      <hr></hr>
      <h6 className={`text-${subHeaderPosition}`}>{subHeading}</h6>
    </div>
  );
};
