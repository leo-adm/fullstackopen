const Filter = ({ label, value, onChange }) =>
  <div>
    {label}
    <input 
      value={value}
      onChange={onChange}
    />
  </div>

export default Filter