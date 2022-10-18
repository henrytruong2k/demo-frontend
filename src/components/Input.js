export const Input = ({ label, name, register, className, errors }) => (
    <>
        <label>{label}</label>
        <input className={className} {...register(name)} />
        <small>{errors?.message}</small>
    </>
)
