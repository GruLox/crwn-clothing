import './button.styles.scss';

const BUTTON_TYPE_CLASSES: { [key: string]: string } = {
    google: 'google-sign-in',
    inverted: 'inverted'
}

type buttonProps = {
    children: string;
    buttonType: string;
    type: string
}

const Button = ({ children, buttonType, ...otherProps }: any) => {
    return (
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>{ children }</button>
    )
};


export default Button;