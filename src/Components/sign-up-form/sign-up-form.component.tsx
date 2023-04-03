import { ChangeEvent, FormEventHandler, useState } from "react";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sign-up-form.styles.scss';


const defaultformFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultformFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value});
    };

    const resetFormFields = () => {
        setFormFields(defaultformFields);
    }

    const handleSubmit: FormEventHandler = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('passwords do not match');
            
        } 
    
        try {
            const response = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(response!.user, { displayName });
            resetFormFields();

        } catch (error: any) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use.');
            } else {
                console.log(error);
            }
            console.log('user creation encountered an error', error);
        }
        
        
        
        
        // confirm that password matches
        // see if authentication is successful
        // create a user document
        

    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name" 
                    type="text" 
                    required onChange={handleChange} 
                    name="displayName" 
                    value={displayName}
                />

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

                <FormInput
                    label="Confirm Password"
                    type="password" 
                    required onChange={handleChange} 
                    name="confirmPassword" 
                    value={confirmPassword} 
                />

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;