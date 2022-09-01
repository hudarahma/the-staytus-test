import React,{ useContext } from 'react';
import tw from "tailwind-styled-components";
import moment from "moment";
import { MyContext } from './Context';
import Reptails from './Reptails';
function Cards() {

    const { planets } = useContext(MyContext);

  return (
    <div>   
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
         <Reptails />
    </div>
  )
}

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
export default Cards
