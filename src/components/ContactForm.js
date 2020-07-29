import React from "react";
import { Field, reduxForm } from 'redux-form';

const newContactForm = props => {
    const renderError = ({error, visited}) => {
        if (visited && error) {
            return(
                'error'
            );
        } else if (visited && !error){
            return "pass";
        } else return '';
    }
    const renderInput = ({ input, label, meta}) => {
        return(
            <div className="form-input">
                <input {...input} placeholder="&nbsp;" autoComplete="off" className={renderError(meta) === '' ? "pass" :`${renderError(meta)}`}/>
                <span className="label">{label}</span>
                <span className="focus-bg"></span>    
            </div>
        );
    }
    const onSubmit = formValues => {
        const id = `${formValues.phoneNumber}${formValues.email}`;
        formValues.id = id;
        props.onSubmit(formValues);
        props.destroy();
    }
    return(
        <form onSubmit={props.handleSubmit(onSubmit)}>
            <Field name="fName" component={renderInput} label="First Name"  />
            <Field name="lName" component={renderInput} label="Last Name" />
            <Field name="phoneNumber" component={renderInput} label="Phone Number" />
            <Field name="email" component={renderInput} label="Email" />
            <Field name="address" component={renderInput} label="Address (optional)" />
            <button>
                <span>Submit</span>
                <span className="button-span"></span>
            </button>
            
        </form>
    );
}

const editContactForm = props => {
    const renderError = ({error, touched}) => {
        if (touched && error) {
            return(
                'error'
            );
        } else if (touched && !error){
            return "pass";
        } else return '';
    }
    const renderInput = ({ input, label, meta}) => {
        return(
            <div className="form-input">
                <input {...input} placeholder="&nbsp;" autoComplete="off" className={renderError(meta) === '' ? "pass" :`${renderError(meta)}`}/>
                <span className="label">{label}</span>
                <span className="focus-bg"></span>    
            </div>
        );
    }
    const onSubmit = formValues => {
        
        const newId = `${formValues.phoneNumber}${formValues.email}`;
        formValues.id = newId;
        /* console.log("Old Value: ", props.oldId);
        console.log("New Value: ", formValues.id); */
        if (props.oldId === newId){
            props.onSubmit(formValues, false);
            props.destroy();
        } else {
            console.log("ID CHANGED");
            props.onSubmit(formValues, true);
            props.destroy();
        }
    }
    return(
        <form onSubmit={props.handleSubmit(onSubmit)}>
            <Field name="fName" component={renderInput} label="First Name" />
            <Field name="lName" component={renderInput} label="Last Name" />
            <Field name="phoneNumber" component={renderInput} label="Phone Number" />
            <Field name="email" component={renderInput} label="Email" />
            <Field name="address" component={renderInput} label="Address (optional)" />
            <button>
                <span>Edit Contact</span>
                <span className="button-span"></span>
            </button>
        </form>
    );
}

const validate = formValues => {
    const errors = {};
    if(!formValues.fName){
        errors.fName = "You must enter a first name. Letters only";
    }
    if (!formValues.lName){
        errors.lName = "You must enter a last name. Letters only"
    }
    if (!formValues.phoneNumber){
        errors.phoneNumber = "You must enter a last name. Letters only"
    }
    if (!formValues.email){
        errors.email = "You must enter a last name. Letters only"
    }
    return errors;
}

export const NewContactForm = reduxForm({
    form: 'newContact',
    validate
})(newContactForm);

export const EditContactForm = reduxForm({
    form: 'editContact',
    validate
})(editContactForm);
