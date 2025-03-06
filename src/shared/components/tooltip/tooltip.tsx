import React, { useState, useRef, useEffect } from "react";
import cn from "classnames";
import "./tooltip.scss";

interface TooltipProps {
  children: React.ReactElement;
  content: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  const toggleTooltip = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="tooltip" ref={tooltipRef}>
      {React.cloneElement(children, { onClick: toggleTooltip })}
      {isVisible && <div className={cn("tooltip__content", { tooltip__content_opened: isVisible })}>{content}</div>}
    </div>
  );
};

export default Tooltip;
