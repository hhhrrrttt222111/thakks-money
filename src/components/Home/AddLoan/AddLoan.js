import React, { useState, useContext, useEffect } from 'react';
import firebase from 'firebase/compat';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { AuthContext } from '../../../context/AuthContext'
import { db } from '../../../firebase/firebase';

function AddLoan() {

    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    
    const [open, setOpen] = useState(false);

    const { currentUser }  = useContext(AuthContext)

    const handleAddLoanOpen = () => {
      setOpen(true);
    };
  
    const handleAddLoanClose = () => {
      setOpen(false);
    };

    const addNewLoan = () => {
        if(name && amount) {
            db.collection('users').doc(currentUser.uid).collection('loans').add({
                name: name,
                amount: amount,
                description: description,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            })
        }
        setOpen(false);
        setName('')
        setAmount('')
        setDescription('')
    }


    return (
        <div className='addLoan'>
            <button onClick={handleAddLoanOpen}>Add Loan</button>
            <Dialog 
                open={open} 
                onClose={handleAddLoanClose}
                PaperProps={{
                    style: {
                      backgroundColor: '#e6b800',
                    },
                }}
            >
                <DialogTitle>Add Loan</DialogTitle>
                <DialogContent>
                    <div className='addLoan__body'>
                        <div className='addLoan__div'>
                            <label>Name</label>
                            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className='addLoan__input'/>
                        </div>

                        <div className='addLoan__div'>
                            <label>Amount</label>
                            <input id="amount" type="text" value={amount} onChange={(e) => setAmount(e.target.value)} className='addLoan__input'/>
                        </div>

                        <div className='addLoan__div'>
                            <label>Description</label>
                            <textarea id="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} className='addLoan__input textarea'/>
                        </div>
                        
                    </div>
                </DialogContent>
                <DialogActions>
                    <button onClick={addNewLoan} className='addButton'>Add</button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddLoan
