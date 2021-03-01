import './InputField.css';
function InputField({ type, icon, placeholder, value, onChange, isValid }) {
  return (
    <div
      className={
        isValid === false
          ? 'container-input-field-error'
          : 'container-input-field'
      }
    >
      <img src={icon} className='input-field-icon' />
      <input
        type={type}
        className='input-field'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default InputField;
