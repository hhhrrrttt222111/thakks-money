import React, { useState, useContext, useEffect } from 'react';
import firebase from 'firebase/compat'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { AuthContext } from '../../../context/AuthContext'
import { db } from '../../../firebase/firebase';

import './SingleLoan.css'

function SingleLoan({ data, id, no }) {

    const [newAmount, setNewAmount] = useState('')
    const { currentUser }  = useContext(AuthContext)

    const paidMoney = () => {
        db.collection('users').doc(currentUser.uid).collection('loans').doc(id)  
        .delete()  
    }

    const addMoney = () => {
        db.collection('users').doc(currentUser.uid).collection('loans').doc(id).update({
            amount: firebase.firestore.FieldValue.increment(newAmount)
        })
    }

    return (
        <div className='singleLoan'>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id={id}>
                    <div className='sl__title'>
                        <p className='sl__no'>{no+1}.</p>
                        <h1 className='sl__name'>{data.name}</h1>
                        <p className='sl__amount'>{data.amount} Rs</p>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='sl__body'>
                        <p>{data.description}</p>
                        <div className='sl__options'>
                            <button onClick={paidMoney}>Paid</button>
                            <button onClick={addMoney}>Add more</button>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default SingleLoan
