import { Input, Group, FormInputLabel } from './form-input.styles.jsx';

const FormInput = ({ label, ...otherProps }: any) => {
    return (
        <Group>
            <Input {...otherProps} />
            {label && (
            <FormInputLabel shrink={otherProps.value.length}>   
                {label}
            </FormInputLabel>
            )}
        </Group>
    )
}

export default FormInput