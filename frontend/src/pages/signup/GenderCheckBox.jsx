import React from "react";

const GenderCheckBox = ({ onCheckBoxChange, selectedGender }) => {
  return (
    <div className="flex justify-around p-1">
      <div className="form-control">
        <label
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer transition-all duration-200 ${
            selectedGender === "male" 
              ? "bg-blue-600/60 border border-blue-300/50 shadow-md" 
              : "hover:bg-blue-800/40"
          }`}
          onClick={() => onCheckBoxChange("male")}
        >
          {/* Male icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="7" r="5"/>
            <path d="M12 12v8"/>
            <path d="M8 16h8"/>
          </svg>
          <span className="text-blue-100 text-sm font-medium">Male</span>
          <div className={`h-3 w-3 rounded-full border-2 border-blue-300 flex items-center justify-center ${
            selectedGender === "male" ? "bg-blue-300" : "bg-transparent"
          }`}>
            {selectedGender === "male" && (
              <div className="h-1.5 w-1.5 rounded-full bg-blue-900"></div>
            )}
          </div>
        </label>
      </div>
      
      <div className="form-control">
        <label
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer transition-all duration-200 ${
            selectedGender === "female" 
              ? "bg-blue-600/60 border border-blue-300/50 shadow-md" 
              : "hover:bg-blue-800/40"
          }`}
          onClick={() => onCheckBoxChange("female")}
        >
          {/* Female icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-pink-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="8" r="5"/>
            <path d="M12 13v8"/>
            <path d="M9 18h6"/>
          </svg>
          <span className="text-blue-100 text-sm font-medium">Female</span>
          <div className={`h-3 w-3 rounded-full border-2 border-pink-300 flex items-center justify-center ${
            selectedGender === "female" ? "bg-pink-300" : "bg-transparent"
          }`}>
            {selectedGender === "female" && (
              <div className="h-1.5 w-1.5 rounded-full bg-blue-900"></div>
            )}
          </div>
        </label>
      </div>
    </div>
  );
};

export default GenderCheckBox;
