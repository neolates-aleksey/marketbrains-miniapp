import React from "react";
import "./loader.scss";

interface IProps {
  isLoading: boolean;
  bg?: boolean;
}

const Loader: React.FC<IProps> = ({ isLoading, bg = false }) => {
  if (!isLoading) return null;

  return (
    <>
      {bg ? (
        <div className={`loader-overlay ${bg ? "bg" : ""}`}>
          <div className="loader" />
        </div>
      ) : (
        <div className="loader" />
      )}
    </>
  );
};

export default Loader;
