import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useAuth } from '../authentication/AuthComponent';
import PetMenu from './PetMenu';
import outfitMappings from './outfitConfig';
import RewardManager from './RewardManagerComponent';
import PetStatsDisplay from './PetStatsDisplay';
import FrisbeeReward from './frisbee';
import TooltipComponent from './TooltipComponent';
import './pet_styles.css';

const Pet = () => {
    const { accessToken } = useAuth();  // Get the access token from the AuthProvider to make authenticated requests
    const [showMenu, setShowMenu] = useState(false);
    const [showRewards, setShowRewards] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [petStats, setPetStats] = useState({ pet_name: "O'malley", mood: "neutral", love: 0, recreation: 0, hunger: 0, cleanliness: 100 })
    const [animationState, setAnimationState] = useState('walking'); // ['walking', 'eating', 'idle', 'washing', 'petting']
    const [outfit, setOutfit] = useState('default');
    const [dirtOverlay, setDirtOverlay] = useState('none'); // ['none', 'light', 'heavy']
    const [loadedImages, setLoadedImages] = useState([]);
    const [playModeType, setPlayModeType] = useState(null); // ['bell', 'frisbee']
    const [showPaws, setShowPaws] = useState(false);
    const [rewards, setRewards] = useState([]);
    const [activeRewards, setActiveRewards] = useState([]);
    const [showTooltips, setShowTooltips] = useState(false);
    const [tooltipStep, setTooltipStep] = useState(0);
    const [rewardId, setRewardId] = useState(''); // DEBUG ######################################

    const tooltips = [
        { message: "This is your pet. You can open the pet interaction menu by clicking on them.", nextStep: () => {setTooltipStep(1); setShowRewards(true);} },
        { message: "This is the reward manager. Here you can change your pet's outfit and display other rewards. You can come back here by clicking on the Style button in the interaction menu", nextStep: () => setTooltipStep(2) },
        { message: "You can name or rename your pet at the bottom of this window.", nextStep: () => setTooltipStep(3) },
        { message: "Each major in the Explore Page has an outfit, cosmetic, or new game mechanic that you can earn by winning that major's minigame.", nextStep: () => setTooltipStep(4) },
        { message: "Your pet has needs and a mood which you can influence by interacting with them and playing games. These will be hidden from you until you unlock the reward to see them.", nextStep: () => setTooltipStep(5) },
        { message: "Hint: Beat the Outdoor Products minigame to get a new way to interact with your pet.", nextStep: () => setTooltipStep(6), isLast: true }
    ];

    const points = [
        { left: 70, top: 50, scale: 1 },
        { left: 35, top: 50, scale: 1 },
        { left: 5, top: 50, scale: 1 },
        { left: -5, top: 50, scale: 1},
        { left: 0, top: 45, scale: 0.95 },
        { left: 70, top: 45, scale: 0.95 },
        { left: 70, top: 40, scale: 0.9 },
        { left: 50, top: 40, scale: 0.9},
        { left: 30, top: 40, scale: 0.9 },
        { left: 76, top: 30, scale: 0.8 },
        { left: 0, top: 30, scale: 0.8 },
        { left: 40, top: 20, scale: 0.7 },
        { left: 65, top: 20, scale: 0.7 },
        {left: 80, top: 15, scale: 0.65},
        {left: 81, top: 15, scale: 0.65},
        {left: 73, top: 15, scale: 0.65},
    ];

    const pickRandomPoint = () => {
        const randomIndex = Math.floor(Math.random() * points.length);
        return points[randomIndex];
    };

    const [position, setPosition] = useState({...pickRandomPoint(), flip: 1});
    const [targetPosition, setTargetPosition] = useState(pickRandomPoint());

    // Set the style for the body page of the pet component then reset it when the component unmounts
    useEffect(() => {
        document.body.style.backgroundColor = 'rgb(53, 164, 0)'
        document.body.style.overflow = 'hidden' // Prevent scrolling on the page
        
        return () => {
            document.body.style.backgroundColor = ''
            document.body.style.overflow = ''
        }
    }, []);

    // Fetch the pet's stats and active rewards from the server
    useEffect(() => {
        const fetchPetStatsAndRewards = async () => {
            if (!accessToken) {
                console.error('User token not found');
                return;
            }

            try {
                // Fetch pet stats
                const petStatsResponse = await fetch('/api/pet/stats', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                if (petStatsResponse.ok) {
                    const petStatsData = await petStatsResponse.json();
                    console.log(petStatsData.petStats);
                    setPetStats(petStatsData.petStats);
                    setOutfit(petStatsData.petStats.outfit.replace(/\s/g, ''));
                    setDirtOverlay(getDirtLevel(petStatsData.petStats.cleanliness));
                    setShowTooltips(petStatsData.petStats.showTooltips)
                } else {
                    console.error(`Error fetching pet stats: ${petStatsResponse.status}`);
                }

                // Fetch rewards
                const rewardsResponse = await fetch('/api/pet/rewards', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                if (rewardsResponse.ok) {
                    const rewardsData = await rewardsResponse.json();
                    console.log("Active rewards: ", rewardsData.activeRewards, "Cosmetics: ", rewardsData.activeCosmetics);
                    setRewards(rewardsData.rewards);
                    setActiveRewards(rewardsData.activeRewards);
                } else {
                    console.error(`Error fetching rewards: ${rewardsResponse.status}`);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchPetStatsAndRewards();
    }, [accessToken]);

    const handleNextTooltip = () => {
        if (tooltipStep < tooltips.length - 1) {
            tooltips[tooltipStep].nextStep();
        } else {
            setShowTooltips(false);
            setTooltipStep(0);
            // Update the database to indicate that tooltips have been shown
            updateTooltipsShown();
        }
    };

    const updateTooltipsShown = async () => {
        const response = await fetch('/api/pet/toggle-tooltips', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            console.error(`Error status: ${response.status}`);
        }
    };

    // Preload the pet's images to prevent flickering when transitioning between animations
    const preloadImages = () => {
        const images = [];
        const states = ['walking', 'eating', 'idle', 'washing', 'petting'];
        states.forEach(state => {
            const img = new Image();
            img.src = `src/assets/default/${state}.png`;
            images.push(img);
        });

        // Preload outfit overlays based on the mappings in outfitConfig.jsx
        if (outfit && outfit !== 'default'){
            states.forEach(state => {
                if (outfitMappings[outfit][state]) {
                    const img = new Image();
                    img.src = `src/assets/${outfit}/${outfitMappings[outfit][state]}.png`;
                    images.push(img);
                }
            });
        }

        // Preload the dirt overlay images if applicable
        if (dirtOverlay !== 'none') {
            const dirtStates = ['walking', 'eating', 'idle', 'petting'];
            dirtStates.forEach(state => {
                const img = new Image();
                img.src = `src/assets/dirt/${dirtOverlay}_${outfitMappings[dirtOverlay][state]}.png`;
                images.push(img);
            });
        }
        setLoadedImages(images); // This stores the loaded images in state to ensure they are not garbage-collected
    };

    useEffect(() => {
        preloadImages();
    }, [outfit, dirtOverlay]); // Only need to run this when outfit changes
    
    // Move the pet to the target position
    useEffect(() => {
        const movePet = () => {
            if (showMenu || animationState !== 'walking') return; // If the menu is open or the pet is not walking, don't do anything

            // Step sizes for pet movements (higher is faster)
            const leftStepSize = 0.075;
            const topStepSize = 0.1;

            // Variables to sync scaling and moving up or down to simulate depth
            const totalTopDistance = targetPosition.top - position.top;
            const totalScaleChange = targetPosition.scale - position.scale;
            const totalSteps = Math.abs(totalTopDistance / topStepSize);
            const scaleStepSize = totalScaleChange / totalSteps;

            setPosition((prevPosition) => {
                // Check if pet has made it to target location
                const reachedTarget =
                    prevPosition.left === targetPosition.left &&
                    prevPosition.top === targetPosition.top &&
                    prevPosition.scale === targetPosition.scale;

                // Stop walking animation when at target destination
                if (reachedTarget) {
                    setAnimationState('idle');
                    if (playModeType === 'bell') {  // If the bell was rung, jump up on the screen
                        setShowPaws(true);
                        setTimeout(() => {  // Wait for 6 seconds before jumping back down and resetting position
                            setShowPaws(false);
                            setPlayModeType(null);
                            setAnimationState('walking');
                            setPosition({ left: 30, top: 70, scale: 1, flip: 1 });  // Reset pet position
                            setTargetPosition(pickRandomPoint());
                        }, 6000); 
                        return { ...prevPosition, scale: 3, left: 30, top: 50 };
                    }
                    return prevPosition;
                  }

                // Flip pet if it's moving to the right of its current position
                const newFlip = targetPosition.left > prevPosition.left ? -1 : 1;

                let newLeft = prevPosition.left;
                if (
                    Math.abs(targetPosition.left - prevPosition.left) >
                    Math.abs(leftStepSize)
                ) {
                    // If the pet hasn't reached the newLeft position, move towards it
                    newLeft +=
                        targetPosition.left > prevPosition.left ? leftStepSize
                            : -leftStepSize;
                } else {
                    // Adjust newLeft to exactly match the target to prevent overshooting
                    newLeft = targetPosition.left;
                }

                let newTop = prevPosition.top;
                if (
                    Math.abs(targetPosition.top - prevPosition.top) >
                    Math.abs(topStepSize)
                ) {
                    // If the pet hasn't reached the newTop position, move towards it
                    newTop +=
                        targetPosition.top > prevPosition.top ? topStepSize : -topStepSize;
                } else {
                    // Adjust newTop to exactly match the target to prevent overshooting
                    newTop = targetPosition.top;
                }

                let newScale = prevPosition.scale;
                if (
                    Math.abs(targetPosition.scale - prevPosition.scale) >
                    Math.abs(scaleStepSize)
                ) {
                    // If the pet hasn't finished scaling, adjust the scale
                    newScale += scaleStepSize;
                } else {
                    // Adjust newScale to exactly match the target to prevent overshooting
                    newScale = targetPosition.scale;
                }

                return {left: newLeft, top: newTop, scale: newScale, flip: newFlip};
            });
        };

        let intervalId;
        if (animationState === 'walking') {
            intervalId = setInterval(movePet, 10); // Move the pet every 10ms
        }

        // Clear the interval on component unmount to prevent memory leaks
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }  
        };
    }, [targetPosition, animationState, showMenu]);

    // Set the pet to wait for a few seconds before walking again
    useEffect(() => {
        const time = 4000; // Time to wait in milliseconds
        if (showMenu) return
        if (playModeType === 'bell') return // The bell has its own rules for waiting
        if (animationState === 'idle') {
            const waitTimer = setTimeout(() => {
                setAnimationState('walking');
                setTargetPosition(pickRandomPoint());  // Pick new target after waiting
            }, time);

            return () => clearTimeout(waitTimer);
        }
    }, [animationState]);  // Effect runs only when waiting state changes


    const handlePetClick = (event) => {
        if (!showMenu) {
            setAnimationState('idle'); // Stop the pet from walking
            setShowMenu(true); // Show the menu
            setMenuPosition({ x: event.pageX, y: event.pageY }); // Position the menu at the click location
        }
        else {
            setAnimationState('walking'); // Stop the pet from walking
            setShowMenu(false);
        }
    };

    const handleOptionSelected = (interactionType) => {
        console.log(`Selected option: ${interactionType}`);
        setShowMenu(false);

        if (interactionType === 'feed') {
            setAnimationState('eating');
        } else if (interactionType === 'wash') {
            setAnimationState('washing');
        } else if (interactionType === 'pet') {
            setAnimationState('petting');
        } else if (interactionType === 'style') {
            setShowRewards(true);
            return;
        } else {
            setAnimationState('walking');
            return;
        }

        setTimeout(() => {
            setAnimationState('walking');
        }, 2200);

        sendInteraction(interactionType);
    };

    const sendInteraction = async (interactionType) => {
        if (!accessToken) {
            console.error('User token not found');
            return;
        }

        // Send a request to the server to interact with the pet
        const response = await fetch('/api/pet/interact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`, // Send the access token in the header
            },
            body: JSON.stringify({ interactionType }),
        });

        // Check if the request was successful (response code 200-299), then update the pet's stats
        if (response.ok) {
            const data = await response.json();
            console.log(data.message, data.pet);
            setPetStats(data.pet);
            setDirtOverlay(getDirtLevel(data.pet.cleanliness));
        } else {
            console.error(`Error status: ${response.status}`);
        }
    };

    // Some outfits share overlay images for certain states, so we need to check the mappings to get the correct images
    const getOutfitImage = (state) => {
        if (outfit && outfit !== 'default' && outfitMappings[outfit][state]) {
          return `src/assets/${outfit}/${outfitMappings[outfit][state]}.png`;
        } else {
          return '';
        }
    };

    const getDirtOverlayImage = (state) => {
        if (dirtOverlay !== 'none') {
            return `src/assets/dirt/${dirtOverlay}_${outfitMappings[dirtOverlay][state]}.png`;
        } else {
            return '';
        }
    }

    const getDirtLevel = (cleanliness) => {
        if (cleanliness > 70) {
            return 'none';
        } else if (cleanliness > 30) {
            return 'light';
        } else {
            return 'heavy';
        }
    }

    const handleFrisbeeThrow = (frisbeePosition) => {
        const newTarget = frisbeePosition;
        const petPosition = position;
        // We just want the pet to move left towards the frisbee
        setTargetPosition({left: newTarget.left, top: petPosition.top, scale: petPosition.scale});
        setAnimationState('walking');
    }

    const handleBell = () => {
        // Set new target position to front of the screen
        setPlayModeType('bell');
        if (animationState === 'idle') {
            setAnimationState('walking');
        }
        setTargetPosition({left: 40, top: 90, scale: 1});   // Pet will move to the front of the screen
    }

    useEffect(() => {                                                   // TESTING ############################################################################################################
        if (playModeType !== null) {
            sendInteraction('playing');
        }
    }, [playModeType]);

    const handleCloseRewards = () => {
        setShowRewards(false);
        setAnimationState('walking');
        window.location.reload(); // Reload the page
    };

    // Memoize the rendered rewards
    const renderedRewards = useMemo(() => {
        return activeRewards.map((reward) => {
            console.log("Reward: ", reward);
            const name = reward.rewardName.replace(/\s+/g, '').toLowerCase();
            return (
                <React.Fragment key={reward.rewardID}>
                    {reward.rewardType === 'cosmetic' && <img src={`src/assets/Decorations/${name}.png`} alt={reward.rewardName} className={`reward-${name} overlay`} />}
                    {reward.rewardType === 'mechanic' && name === "bell" && <img src={`src/assets/Decorations/${name}.png`} alt={reward.rewardName} className={`${name} mechanic`} onClick={handleBell} />}
                    {reward.rewardType === 'mechanic' && name === "bioengineering" && <PetStatsDisplay petStats={petStats} />}
                    {reward.rewardType === 'mechanic' && name === "frisbee" && <FrisbeeReward onThrow={handleFrisbeeThrow} />}
                </React.Fragment>
            );
        });
    }, [activeRewards, petStats]);

    const debugAnimation = () => {
        if (outfit === 'default') {
            setOutfit('ChemicalEngineering');
        } else if (outfit === 'ChemicalEngineering') {
            setOutfit('CivilEngineering');
        } else if (outfit === 'CivilEngineering') {
            setOutfit('ComputerScience');
        } else if (outfit === 'ComputerScience') {
            setOutfit('ConstructionEngineeringManagement');
        } else if (outfit === 'ConstructionEngineeringManagement') {
            setOutfit('EnvironmentalEngineering');
        } else if (outfit === 'EnvironmentalEngineering') {
            setOutfit('IndustrialEngineering');
        } else if (outfit === 'IndustrialEngineering') {
            setOutfit('MechanicalEngineering');
        } else if (outfit === 'MechanicalEngineering') {
            setOutfit('NuclearEngineering');
        } else if (outfit === 'NuclearEngineering') {
            setOutfit('RadiationHealthPhysics');
        } else {
            setOutfit('default');
        }
    }

    const debugAnimation2 = () => {
        if (animationState === 'walking') {
            setAnimationState('idle');
        } else {
            setAnimationState('walking');
        }
    }

    const debugAnimation3 = () => {
        setAnimationState('running');
    }

    const debugRewards = async () => {
        const response = await fetch('/api/debug/unlock-rewards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            }});
        
        if (response.ok) {
            const data = await response.json();
            console.log(data.rewards);
        } else {
            console.error(`Error status: ${response.status}`);
        }
    };

    const checkReward = async (rewardId) => {
        const response = await fetch(`/api/pet/check-reward/${rewardId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        if (response.ok) {
            const data = await response.json();
            setShowNotification(!data.hasReward);
        } else {
            console.error(`Error status: ${response.status}`);
        }
    };

    return (
        <div className="backyard">
            <img src="src/assets/yard_fence.png" alt="fence" className="fence overlay" />
            <img src={`src/assets/Decorations/bell.png`} alt={'bell'} className={`bell mechanic`} onClick={handleBell} />
            <FrisbeeReward onThrow={handleFrisbeeThrow} />
            {renderedRewards}
        

            {/* DEBUG */}
            <div>
                <button className="debug" onClick={debugAnimation} style={{
                    position: 'absolute',
                    left: '11.1%',
                    top: '30%',
                    }}>{outfit}</button>
                <button className="debug" onClick={debugAnimation2} style={{
                    position: 'absolute',
                    left: '11.1%',
                    top: '32%',
                    }}>Idle</button>
                <button className="debug" onClick={() => [petStats.cleanliness -= 20, setDirtOverlay(getDirtLevel(petStats.cleanliness))]} style={{
                    position: 'absolute',
                    left: '11.1%',
                    top: '34%',
                    }}>Add dirt</button>
                <button className='debug' onClick={debugAnimation3} style={{
                    position: 'absolute',
                    left: '11.1%',
                    top: '36%',
                }}>run</button>
                <button className="debug" style={{
                    position: 'absolute',
                    left: '11.1%',
                    top: '38%',
                }}>Jump</button>
                <button className="debug" onClick={debugRewards} style={{
                    position: 'absolute',
                    left: '11.1%',
                    top: '40%',
                }}>Unlock Rewards</button>
                <div className="reward-input" style={{
                    position: 'absolute',
                    left: '11.1%',
                    top: '26%',
                    zIndex: 100,
                }}>
                    <input
                        type="number"
                        value={rewardId}
                        onChange={(e) => setRewardId(e.target.value)}
                        placeholder="Enter Reward ID"
                    />
                    <button
                        className="debug"
                        onClick={() => checkReward(rewardId)}
                    >Unlock Reward</button>
                </div>
            </div>
            {/* DEBUG */}
            
                <div    // Pet base image
                    key={`pet-${animationState}-${outfit}-${dirtOverlay}`}
                    className={`pet ${animationState}`}
                    style={{
                        backgroundImage: `url('src/assets/default/${animationState}.png')`,
                        position: 'absolute',
                        left: `${position.left}%`,
                        top: `${position.top}%`,
                        transform: `scale(${position.scale}) scaleX(${position.flip})`,
                        pointerEvents: 'none',
                    }}>
                    <div // Dirt overlay image
                        key={`${dirtOverlay}-${animationState}`}
                        className={`dirt-${dirtOverlay}-${animationState}`} 
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage: `url(${getDirtOverlayImage(animationState)})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            pointerEvents: 'none',
                    }} />
                    <div // Outfit overlay image
                        key={`${outfit}-${animationState}`}
                        className={`${outfit}-${animationState}`}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage: `url(${getOutfitImage(animationState)})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            pointerEvents: 'none',
                        }}
                    />
                    <div className='clickableArea'
                    onClick={animationState === 'walking' || animationState === 'idle' ? handlePetClick : null}
                    style={{
                        position: 'absolute',
                        top: '30%',
                        left: '35%',
                        width: '50%',
                        height: '50%',
                        cursor: 'pointer',
                        pointerEvents: 'visible',
                    }}
                    />
                    {showPaws && <div className='paws' style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `url('src/assets/paws.png')`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        pointerEvents: 'none',
                    }} />}

                </div>

            {showMenu && <PetMenu x={menuPosition.x} y={menuPosition.y} onOptionSelected={handleOptionSelected} />}
            {showRewards && <RewardManager onClose={handleCloseRewards} />}
            {showTooltips && (
                <TooltipComponent
                    message={tooltips[tooltipStep].message}
                    onNext={handleNextTooltip}
                    onClose={handleNextTooltip}
                    isLast={tooltips[tooltipStep].isLast}
                />
            )}
            <div className="resize-message">
                <p>Please enlarge your screen or rotate your device for the best experience.</p>
            </div>
        </div>
    );
};

export default Pet;
