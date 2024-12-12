import React from 'react';

export const SlotRow = ({ item, callback }) => 
  <tr>
    <td>{item.area}</td>
    <td>{item.time}</td>
    <td>
      <input 
        type="checkbox" 
        checked={item.reserved}
        onChange={() => callback(item)}
      />
    </td>
  </tr>