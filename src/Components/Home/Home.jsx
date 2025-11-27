import React from 'react'
import Greeting from '../Greeting/Greeting'
import ToggleBtn from '../Toggle/ToggleBtn'
import "./Home.css";
import ListItems from '../RenderItemsDynamic/ListItems';
import ProfileCard from '../ProfileCard/ProfileCard';

const Home = ({ Color, SetColor }) => {
    let name = "Sreenu"
    const clickHand = () => { SetColor(!Color) }

    return (
        <div className="container">
            <div className={`container ${Color ? "active" : ""}`}>

                <Greeting name={name} />
                <ToggleBtn />
                <ListItems />
                <ProfileCard />
                <button onClick={clickHand}>{Color ? "Turn Off" : "Turn On"}</button>
            </div >
        </div >

    )
}

export default Home