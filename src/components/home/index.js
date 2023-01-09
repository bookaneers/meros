// import dependencies and libraries
import React from 'react';
import logo from '../../images/Inventive-Group-Logo-White.png'

const Home = () => {
    return(
        <div className="home-div">
            <span className="home">Welcome to μέρος</span>
            <span className="home">Inventive Group Parts Database</span>
            <img src={logo} alt="Logo" />
        </div>
    )
}

export default Home