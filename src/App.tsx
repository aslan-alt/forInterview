import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Layout} from "./components/Layout";
import {Arrange} from "./components/Arrange";
import {Conversion} from "./components/Conversion";
import {NumberPad} from "./components/NumberPad";
import styled from "styled-components";




function App() {

  return <Routes>
      <Route path="/" element={<Layout />}>
          <Route path="conversion" element={<Conversion />} />
          <Route path="chaining" element={<Arrange />} />
          <Route path="numberKeyboard" element={ <StyledWrapper>
              <NumberPad />
          </StyledWrapper> } />
      </Route>
  </Routes>;
}

const StyledWrapper= styled.div`
    display: flex;
  flex-direction: column;
  align-items: center;
`;

export default App;
