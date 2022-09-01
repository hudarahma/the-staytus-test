import React, { useEffect, useState } from 'react';
// import './App.css';
import tw from "tailwind-styled-components";
import moment from "moment";
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { update } from './formSlice';


function App() {
  //task 1
  // Build a state management package from scratch that covers:
  // - Save data in objects/classes
  // - Update data in Objects/classes
  // - Dispatch an action each time the Object/ Classes changes

  const detailsObj = {
    firstName: 'Mrs.Huda',
    lastName: 'Solymani',
  };
  const { firstName, lastName } = useSelector((state) => state.form.form);
  const dispatch = useDispatch();

  // 2. Mastery in Promise:
  // Base Url: https://swapi.dev/api/

  // Create a function that returns the planets (/planets) who had been appeared in at least one movie and who residents (/people) have reptiles (/species)

  // It only needs to be in one function and it needs to deal with at least two Promises

  //Documentation: Planets: https://swapi.dev/documentation#planets People: https://swapi.dev/documentation#people Species: https://swapi.dev/documentation#species

  //NOTE:
  //- Extra points if you return an array of Promises, complete Promise for planets with the above conditions

  const [ planets, setPlanets ] = useState('');
  // const [ films, setFilms ] = useState('');
  const url = 'https://swapi.dev/api/';

  const fetchData = async () => {
    //first async promise
    const result1 = await fetch(`${url}/planets`, {
      headers: {
        Accept: 'application/json',
      },
    });

    const data = await result1.json();
    setPlanets(data.results);
    console.log(data.results, 'data')
    // const films = data.results.map((result) => result.films[0]);
    // console.log('fimls-->', films);

    //second promise
    const result2 = await fetch(`${url}/people`, {
      headers: {
        Accept: 'application/json',
      },
    });
    const data2 = await result2.json();
    // console.log(data2);
    const reptiles = data2.results.map((result) => result.species[0]);
    console.log('reptiles-->', reptiles);
  };

  useEffect(() => {
    fetchData();
  }, []);

  //From question 1 and 2. Create cards and display the data like these:

  // https://prnt.sc/MP32qiW8Y_KR
  // https://prnt.sc/Iiv2j0owb8l_

  // NOTE:
  // - The description needs to be a String of film names.
  // - Keep the original colors
  // - Extra points if you can change the icon for the population computed for two digits
  // - Extra points if you can reuse all the elements
  // - Extra points if you can add micro interactions
  // - Extra points if you can do this in TailwindCSS
  return (
    <div className="app">
      <StateMang>
        <p>{firstName}</p>
        <p>{lastName}</p>
        <Button  onClick={() => dispatch(update(detailsObj))} variant="outlined">Set Details</Button>
      </StateMang>

      { planets && planets.map((planet,id)=> (
      <Wrapper key={id}>

          <DateDetails>
          <h3>{moment(planet.created).format("MMM Do YY")}</h3>
          <h3>{moment(planet.created).format('MMMM Do YYYY, h:mm:ss a')}</h3>
          </DateDetails>

        <PlanetDetails>
          <Icon>{planet.population.slice(0,2)}</Icon>
          <PlanetNameFilms>
            <h3 class='text-white'>{planet.name}</h3>
            <h3 class='text-stone-400'>{planet.films}</h3><br/>
          </PlanetNameFilms>
          <PlanetClimate>
            <h3 class='text-stone-300'>{planet.climate}</h3>
          </PlanetClimate>
        </PlanetDetails>
      </Wrapper>
      ))}
    </div>
  );
}

export default App;


const StateMang = tw.div`
  m-10
  text-sm
  flex
  flex-col
  items-stretch
  justify-center
`
const Wrapper = tw.div`
 w-full
 h-64
 rounded-2xl
 flex
 flex-col
 justify-around
 p-5
 mb-2.5
 cursor-pointer
 bg-stone-800
  hover:bg-stone-700  transition-all

`;

const DateDetails = tw.div `
  w-full
  h-14
  text-sm
  flex
  items-center
  justify-between
  text-amber-300
`;

const PlanetDetails = tw.div`
  w-full
  h-40
  flex
  items-center
  justify-arround
`;

const Icon = tw.div`
  w-16
  h-16
  bg-stone-700
  rounded-xl
  flex
  items-center
  justify-center
  text-amber-300

`
const PlanetNameFilms = tw.div`
flex-1
text-xl
ml-2.5
break-all
`;

const PlanetClimate = tw.div`
h-2/7
flex
items-center
flex-col
text-xl
`
