import React, { useContext } from 'react';
import { MyContext } from './Context';
import tw from "tailwind-styled-components";


function Reptails() {
    const { reptails } = useContext(MyContext);


  return (
    <div>
        { reptails && reptails.map((reptail, id) => (
            <Wrapper key={id}>
                <h3>{reptail.name}</h3>
                <h3>{reptail.people}</h3>
            </Wrapper>

        ))}
    </div>
  )
}

export default Reptails

const Wrapper = tw.div`
 w-full
 h-40
 rounded-2xl
 flex
 flex-col
 justify-around
 p-5
 mb-2.5
 cursor-pointer
 bg-stone-600
`;