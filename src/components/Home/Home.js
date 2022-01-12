import React, { useEffect, useState, useContext } from 'react'


import AddLoan from './AddLoan/AddLoan'
import './Home.css'

import { db } from '../../firebase/firebase';
import { AuthContext } from '../../context/AuthContext';
import SingleLoan from './SingleLoan/SingleLoan';
import Header from './Header/Header';

function Home() {

    const [loans, setLoans] = useState([])

    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        db.collection('users').doc(currentUser.uid).collection('loans').onSnapshot(snapshot => (
            setLoans(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                }))
            )
        ))

    }, [currentUser.uid]);


    return (
        <div className='home'>
            <Header />
            <div className='home__container'>
                <div className='home_header'>
                    <AddLoan />
                </div>
                <div className='home_body'>
                    {
                        loans && loans.map((loan, no) => (
                            <SingleLoan key={loan.id} id={loan.id} no={no} data={loan.data} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Home
