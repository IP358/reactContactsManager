import React, { useState } from 'react';
import NewContact from './NewContact';
import ShowContacts from './ShowContacts';
import { connect } from 'react-redux';
import { createContact } from '../actions';
import data from '../data/data.json';
import '../styles/App.scss';
import { Transition, animated } from 'react-spring/renderprops';

const App = (props) => {
  const [ expandNewContact, setExpandNewContact ] = useState(false);
  const [ showAll, setShowAll ] = useState(false);

  // Pre-load contacts from local data.json
  const loadContacts = () => {
    Object.values(data.contacts).map(contact => props.createContact(contact));
  }
  // Render All Contacts
  const onShowAll = () => {
    setExpandNewContact(false);
    setShowAll(true);
  }

  // ---- Animation and Render Logic Set up ----
  const renderNewContact = () => {
    return (
    <Transition
      native
      items={expandNewContact}
      from={{position: 'absolute', overflow: 'hidden', height: 0}}
      enter={[{position: 'static', height: 'auto'}]}
      leave={{ height: 0, }}>
        {expandNewContact => 
          expandNewContact && (props => <animated.div style={props}>
            <NewContact onSubmit={() => setExpandNewContact(!expandNewContact)} />
            </animated.div>)
          }
    </Transition>
    );
  }

  const showAllContacts = () => {
    return(
      <Transition
        native
        items={showAll}
        from={{ height: 0, overflow: 'hidden', position: 'absolute' }}
        enter={[{ height: 'auto', position: 'static' }]}
        leave={{ height: 0 }}>
          {showAll => 
            showAll && (props => <animated.div style={props} >
                <ShowContacts />
              </animated.div>)
            }
    </Transition>
    );
  }
  
  // ---- JSX return from functional component ----
  return (
    <div className="app-container" onClick={() => { setExpandNewContact(false); setShowAll(false) }}>
      <div className="app" onClick={e => e.stopPropagation()}>
      {renderNewContact()}
        <div className="button-wrapper" >
            <button onClick={() => {setExpandNewContact(!expandNewContact); setShowAll(false) }}>New Contact</button>
            <button onClick={onShowAll}>Show All</button>
            {showAllContacts()}
            <button onClick={() => loadContacts()}>Load Preset Contacts</button>
        </div>
      </div>
    </div>
  );
}

export default connect(null, { createContact })(App);
