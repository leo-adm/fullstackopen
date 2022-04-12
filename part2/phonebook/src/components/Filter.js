const Filter = ({ label, value, handleChange }) => 
  <div>
    {label}
    <input 
      value={value}
      onChange={handleChange}
    />
  </div>


export default Filter