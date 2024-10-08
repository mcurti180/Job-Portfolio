import '../assets/home.css'

import HowToBackground from '../assets/howtobg.png'

const HowTo = () => {
    return (
        <body style={{ backgroundImage: `url(${HowToBackground})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', margin: 0, padding: 0, height: '100vh' }}>
            <div className="howto-container"> 
                <h3> CoE Major Exploration Game How To: </h3>

                <p> Start out by taking the Major Exploration Quiz. Through this, you will answer the different questions which will help
                    you find a major that fits you in the College of Engineering at Oregon State University. If you are not ready to take the 
                    quiz yet, you can also choose to explore the majors first and then take the quiz after.
                </p>
                <p> After taking the quiz, you will have the option to explore the majors the quiz gave you or you can choose to explore 
                    all the majors. Listed in the exploration page, you will find all of the engineering majors offered at Oregon State. This includes 
                    both the Corvallis and Cascades campus. When you click on a major in the exploration page it will take you to information on the 
                    major such as top professors, student quotes, possible minors, and more.
                </p>
                <p>
                    At the end of each major's page, you will see a button to take you to a mini game related to the major. Once you've successfully
                    complete the mini game, you will be rewarded an item that can be applied to your pet. Play all 17 mini games to get every item for your pet!
                </p>
                <p> 
                    You can also choose to play with your pet. By playing with your pet, you can earn better stats to make your pet happy. You can also
                    choose what items you want to equipt on your pet here as well. Make sure to check up on your pet every so often otherwise they will
                    unhappy and dirty. 
                </p>
            </div>
        </body>
    )
}

export default HowTo