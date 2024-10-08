import '../assets/home.css'
import { NavLink, Outlet } from "react-router-dom"
import Background from '../assets/homebg.png'
import Quiz from '../assets/hiring.png'
import Explore from '../assets/mortarboard.png'
import Reward from '../assets/safety.png'


const Home = () => {
    return (
        <>
            <div className="home-background"> 
                <div className="howto-container">
                    <h1> Explore the College of Engineering Majors</h1>
                    <p> We've taken information from students in the College of Engineering at Oregon State University and turn it into a quiz
                        to help you find your top three engineering majors and explore the majors from a student perspective. 
                    </p>
                    <div>
                        <NavLink to="/login"> <button className="link-button"> Login </button> </NavLink>
                        <NavLink to="/howto"> <button className="link-button"> How To </button>  </NavLink>
                    </div>
                </div>

                <div className="container">
                    <div className="small-card"> 
                        <div className="icon-container">
                            <img src={Quiz} className="icon-small"></img>
                        </div>
                        <div className="text-container">
                        Take the quiz. Our quiz is made to find you your top three engineering majors at Oregon State University. 
                        </div>
                    </div> 
                    <div className="small-card"> 
                        <div className="icon-container">
                            <img src={Explore} className="icon-small"></img>
                        </div>
                        <div className="text-container">
                        Explore all 16 majors within the College of Engineering. You can learn about every major from a students perspective. 
                        </div>
                    </div>
                    <div className="small-card"> 
                        <div className="icon-container">
                            <img src={Reward} className="icon-small"></img>
                        </div>
                        <div className="text-container">
                            Apply your items to your pet. Play all of the 17 mini games to get every item you can equipt to your pet. 
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
        
}

export default Home
