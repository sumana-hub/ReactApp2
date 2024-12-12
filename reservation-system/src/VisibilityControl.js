import React from 'react';

export const VisibilityControl = ({ description, isChecked, callback }) => 
  <div className="form-check">
    <input 
      className="form-check-input" 
      type="checkbox" 
      checked={isChecked}
      onChange={(e) => callback(e.target.checked)} 
    />
    <label className="form-check-label">
      Show {description}
    </label>
  </div>