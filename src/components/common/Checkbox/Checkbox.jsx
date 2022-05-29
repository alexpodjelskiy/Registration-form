import styles from './checkbox.module.css'

function Checkbox({ label, value, checked, onChange }) {
  return (
    <div className={styles.radio}>
      <input type="radio" name="gender" value={value} checked={checked} onChange={onChange} />
      <label htmlFor="gender">{label}</label>
    </div>
  );
}

export const CheckboxGroup = ({ value, options, onChange }) => {

  return (
    <div className={styles.container}>
      {options.map(({ id, isChecked, label }) => {
        return <Checkbox key={id} value={isChecked} label={label} checked={isChecked === value ? true : false} onChange={onChange} />
      })}
    </div>
  );
};
