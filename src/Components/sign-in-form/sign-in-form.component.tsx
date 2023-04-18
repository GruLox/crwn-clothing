import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { ButtonsContainer, SignUpContainer } from './sign-in-form.styles.jsx';
import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";



const defaultformFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultformFields);
    const { email, password } = formFields

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFormFields({ ...formFields, [name]: value });
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        try {
            dispatch(emailSignInStart(email, password));
            
        } catch (error: any) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break
                default:
                    console.log(error);
            }
        }
    }

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
    }

    return (
        <SignUpContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
                />
                <FormInput
                    label="Password"
                    type="password"
                    required onChange={handleChange}
                    name="password"
                    value={password}
                />
                <ButtonsContainer>
                    <Button type='submit'>Sign in</Button>
                    <Button type='button' onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google}>Google sign in</Button>

                </ButtonsContainer>
            </form>
        </SignUpContainer>

    )
}

export default SignInForm