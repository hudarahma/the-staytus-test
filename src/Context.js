import React, { createContext, useState, useEffect} from 'react';export const MyContext = createContext();

const ContextProvider = ({ children }) => {

    const [ planets, setPlanets ] = useState('');
    const [ reptails, setReptails ] = useState([]);
    
    const fetchData = async () => {
        const url = 'https://swapi.dev/api/';

        const result1 = await fetch(`${url}/planets`, {
            headers: {
                Accept: 'application/json',
            },
        });

        const data = await result1.json();
        setPlanets(data.results);
        console.log(data.results, 'data')


        const result2 = await fetch(`${url}/species`, {
            headers: {
                Accept: 'application/json',
            },
        });
        const data2 = await result2.json();
        console.log(data2,'reptails');
        setReptails(data2.results);
    };


    useEffect(() => {
        fetchData();
    }, []);


    const initialState = {
        fetchData,
        setPlanets,
        planets,
        setReptails,
        reptails,
    }

    return ( 
        <MyContext.Provider value={initialState}>
            {children}
        </MyContext.Provider>
    )

}

export default ContextProvider;
