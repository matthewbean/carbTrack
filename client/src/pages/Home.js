import React, { useContext, useEffect } from 'react';
import Foods from '../components/modules/Foods';
import AddFood from '../components/modules/AddFood';




import AuthContext from '../context/author/authContext';



function Home() {
    const authContext = useContext(AuthContext);

    const { loadUser, user } = authContext;

    useEffect(()=> {
        loadUser();
        //eslint-disable-next-line
    }, []);

 

    return (
        <div className = "container">
            {user && <h2 className = "text-center m-2">Greetings {user.name} </h2>}
            <div className = "row">
                <AddFood />
                <Foods /> 

            </div>
            
        </div>
    )
}

export default Home
