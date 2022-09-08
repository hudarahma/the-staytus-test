import React, { createContext, useState, useEffect} from 'react';
export const MyContext = createContext();

const ContextProvider = ({ children }) => {

    const [ planets, setPlanets ] = useState('');
    let  planetWithMovies  =  [];
    const [ planetResidents, setPlanetResidents ] = useState([])
    const [ reptails, setReptails ] = useState([]);
    const [finalPlanets, setFinalPlanets] = useState([]);
    
    const fetchData = async () => {
        const url = 'https://swapi.dev/api/';

        const result1 = await fetch(`${url}/planets`, {
            headers: {
                Accept: 'application/json',
            },
        });

        const data = await result1.json();
        setPlanets(data.results);
        console.log(planets.length, 'planets');
      
       
       for ( let i=0; planets.length > i; i++) {
            console.log(planets[i].films.length)
            if ( planets[i].films.length > 0 ) {
                planetWithMovies.push( planets[i])
            }
            
        }
        // console.log(planetWithMovies, 'movies');

        setPlanetResidents((planetWithMovies.filter((res, index) => res.residents.length > 0 ? res.residents[index] : 'no-residents')));
        console.log(planetResidents,'res');

        for ( let i = 0; i < planetResidents.length; i++) {
            if (planetResidents[i].residents.length > 0 ) {
                // console.log(planetResidents[i],'exist')
                for ( let j = 0; j < planetResidents[i].residents.length; j++) {
                //    console.log(planetResidents[i].residents[j])
                   const getResident = await fetch(`${planetWithMovies[i].residents[j]}`,
                        {
                        headers: {
                            Accept: 'application/json',
                        },
                    });
                    const resident = await getResident.json();
                   
                    if (resident.species.length > 0) {
                            let speciesFound = false;
                            let x = 0;
                            while (!speciesFound && x < resident.species.length) {
                                const getSpecies = await fetch(`${resident.species[x]}`, {
                                headers: {
                                    Accept: 'application/json',
                                },
                                });
                                const species = await getSpecies.json();
                                // test Mammal
                                if (species.classification === 'mammal') {
                                    speciesFound = true;
                                    finalPlanets.push(planetWithMovies[i]);
                                }
                                x++;
                            }
                        speciesFound = false;
                    }   
                }
            }
        }
    
        setFinalPlanets(finalPlanets);
        console.log(finalPlanets, 'Mammal found');
    };
    // console.log(resident.filter((res,index) => res.species.length > 0 ? res.species[index] : 'no-species'))
    

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
