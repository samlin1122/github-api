import { useState, useRef } from "react";
import useClickOutside from "../hook/useClickOutside";

const DropDown = ({ id, list = [], value, handleSelect }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useClickOutside(dropdownRef, () => setOpen(false));
  return (
    <div ref={dropdownRef} className="dropdown">
      <button onClick={() => setOpen(!open)} className="dropdown__btn">
        {id}
      </button>
      {open ? (
        <div className="dropdown__list">
          {list.map((item) => (
            <div
              key={item}
              className="dropdown__list__items"
              onClick={() => handleSelect(id, item)}
              selected={value[id] === item}
            >
              {item}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default DropDown;
