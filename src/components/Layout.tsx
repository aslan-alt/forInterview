import * as React from "react";
import styled from "styled-components";
import {Link, Outlet} from "react-router-dom";
import { FC, useState} from "react";

export const Layout:FC =()=>{
    const [selectedId,setSelectedId] = useState(0)

    return <Container>
        <NavBar $selectedId={selectedId}>
            <Link to="conversion" onClick={()=>{
                setSelectedId(1)
            }}>conversion</Link>
            <Link to="chaining" onClick={()=>{
                setSelectedId(2)
            }}>Arrange (chaining)</Link>
            <Link to="numberKeyboard" onClick={()=>{
                setSelectedId(3)
            }}>3</Link>
        </NavBar>
        <Outlet />
    </Container>;

}

const Container = styled.div`
  border: 1px solid red;
`;

const NavBar = styled.div<{$selectedId:number}>`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 32px;
    text-align: center;
    a:nth-child(${({$selectedId})=>$selectedId}){
      background: #ffffff;
      color: black;
      border: 1px solid black;
     
    }
    a{
      background: black;
      color: #ffffff;
      padding: 20px 0;
    }
`;
