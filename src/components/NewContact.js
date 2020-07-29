import React from 'react';
import { connect } from 'react-redux';
import { NewContactForm } from './ContactForm';
import { createContact } from '../actions'

const newContact = props => {

    const onSubmit = (formValues) => {
        props.createContact(formValues);
        props.onSubmit();
    }
    
    return(
        <div className="new-contact-container">
           {/*  <button onClick={() => setExpand()}>New Contact</button> */}
            {/* {expand? <NewContactForm onSubmit={onSubmit} destroyOnUnmount /> : null} */}
            <NewContactForm onSubmit={onSubmit} destroy />
        </div>
    );
}

export default connect(null, { createContact })(newContact);