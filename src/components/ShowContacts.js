import React from 'react';
import {connect} from 'react-redux';
import { editContact, deleteContact } from '../actions';
import _ from "lodash";
import EditContact from './EditContact';

const ShowContacts = props => {
    const onDeleteSubmit = id => {
        console.log("Deleting contact with ID of: "+id);
        props.deleteContact(id);
    }

    const renderContacts = () => {
        const render = Object.values(props.contacts).map(contact => {
            //const [...contactDetails] = Object.values(_.omit(contact, ['id'])).join(" ");
            const [...contactDetails] = Object.values(_.omit(contact, ['id'])).join("  -  ");
            return(
                    <div onClick={ e => e.stopPropagation()} key={contact.id} className="contact-card">
                            <div className="contact-text">{contactDetails}</div>
                            <div className="edit-contact-buttons-wrapper">
                                <button className="delete" onClick={() => onDeleteSubmit(contact.id)}>Delete</button>
                                <EditContact contact={contact} />
                            </div>  
                    </div>
            );
        });
        if (render.length===0){
            console.log("empty");
            return (
                <p>
                    No Contacts!
                </p>
            );
        }
        return render;
    }
       
    return (
        <div className="contacts-container">
            {renderContacts()}
        </div>
    );
}

const mapStateToProps = state => {
    return{
        contacts: state.contacts,
    };
}
export default connect(mapStateToProps, { editContact, deleteContact })(ShowContacts);