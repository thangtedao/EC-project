const FormRowSelect = ({
  name,
  labelText,
  list,
  defaultValue = "",
  onChange,
  id,
  optional,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {optional && <option value="">None</option>}
        {list.map((item) => {
          return (
            <option key={item._id} value={id ? item._id : item.slug}>
              {item.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FormRowSelect;
