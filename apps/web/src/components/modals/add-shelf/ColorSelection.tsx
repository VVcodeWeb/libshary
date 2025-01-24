'use client';
//TODO: Add color selection component
export type Color = 'red' | 'green' | 'blue';
export const ColorSelection = () => {
  return (
    <div className="flex items-center">
      <select
        name="color"
        className="select select-bordered"
        defaultValue={'green'}
      >
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
      </select>
    </div>
  );
};
