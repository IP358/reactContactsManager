import React, { useState } from 'react';
import { EditContactForm } from './ContactForm';
import { connect } from 'react-redux';
import { editContact, deleteContact, createContact } from '../actions';
import { Transition, animated } from 'react-spring/renderprops';

const EditContact = props => { 
    const [shouldRender, setShouldRender] = useState(false);
    const [changedId, setChangedId] = useState(false);
    const [contact, setContact] = useState(null);

    // ---- FORM SUBMIT FUNCTIONS ----
    const onSubmitInitial = (formValues, changed) => {
        console.log("onSubmitInitial");
        console.log(changed);
        // Check if the id (phone number + email) was edited
        if (!changed){
            props.editContact(formValues);
            setShouldRender(false);
        } else {
            setShouldRender(false);
            setContact(formValues);
            setChangedId(true);
        }
    }

    const createNewContact = () => {
        console.log("createNewContact");
        props.createContact(contact);
        setShouldRender(false);
        setChangedId(false);
    }

    const changeExistingContact = () => {
        console.log("changeExistingContact");
        props.deleteContact(props.contact.id);
        props.createContact(contact);
        setShouldRender(false);
        setChangedId(false);
    }

    // ---- Transition Animations and Render Logic for Edit Form and idChanged Pop Up ---

    const renderForm = () => {
        return (
        <Transition
          native
          items={shouldRender}
          from={{position: 'absolute', overflow: 'hidden', height: 0}}
          enter={[{position: 'static', height: 'auto'}]}
          leave={{ height: 0 }}>
            {shouldRender => 
              shouldRender && (propss => <animated.div style={propss} className="edit-form">
                <EditContactForm onSubmit={onSubmitInitial} initialValues={props.contact} oldId={props.contact.id} destroyOnUnmount />
                </animated.div>)
              }
        </Transition>
        );
      }

    const renderPop = () => {
        return (
            <Transition
              native
              items={changedId}
              from={{position: 'absolute', overflow: 'show', height: 0}}
              enter={[{position: 'static', height: 'auto'}]}
              leave={{ height: 0, overflow: 'hidden' }}>
                {changedId => 
                  changedId && (propss => <animated.div style={propss} className="changed-id-container" >
                    <React.Fragment>
                        <h3>You have changed phone-number or email</h3>
                        <div className="pop-button-wrapper" >
                            <button className="pop-button" onClick={ () => createNewContact() }>Create A New Contact</button>
                            <button className="pop-button" onClick={ () => changeExistingContact() }>Change Existing Contact</button>
                        </div>
                    </React.Fragment>
                    </animated.div>)
                  }
            </Transition>
            );
    }

    // ---- JSX Return for Functional Component ----

    return(
        <React.Fragment>
            <button className="edit" onClick={() => setShouldRender(true)}>Edit</button>
            {renderPop()}
            {renderForm()}
        </React.Fragment>
    );
}

export default connect(null, { editContact, deleteContact, createContact })(EditContact);