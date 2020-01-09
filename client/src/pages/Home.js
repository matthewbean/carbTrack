import React, { useContext, useEffect } from 'react';
import Foods from '../components/modules/Foods';
import AddFood from '../components/modules/AddFood';



import AuthContext from '../context/author/authContext';



function Home() {
    const authContext = useContext(AuthContext);

    useEffect(()=> {
        authContext.loadUser();
        //eslint-disable-next-line
    }, []);


    return (
        <div className = "container">
            <div className = "row">
                <AddFood />
                <Foods />  
            </div>
            
        </div>
    )
}

export default Home
