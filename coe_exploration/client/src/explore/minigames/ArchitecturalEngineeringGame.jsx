import React from 'react';
import MatchingGame from './MatchingGame.jsx';

const ArchitecturalEngineeringGame = () => {
    // List of architectural styles for the matching game
    const dictionary = {
        'Gothic: Look for elaborate details and decorations, especially in windows and doorways':
        {
            definition: 'gothic.jpg',
            type: 'image',
            credit:
                'By Oldmanisold - Own work, CC BY-SA 4.0, https://commons.wikimedia.org/w/index.php?curid=68588598',
        },
        'Romanesque: Often have a solid and heavy look, with semi-circular arches and small windows':
        {
            definition: 'romanesque.jpg',
            type: 'image',
            credit:
                'Photography by: Osvaldo Gago, with perspective fixing by other members of Wikimedia Commons (see history of the file) - Wiki Commons, CC BY-SA 2.0, https://commons.wikimedia.org/w/index.php?curid=20000663',
        },
        'Baroque: Look for dramatic use of light and shadow and opulent materials': {
            definition: 'baroque.jpg',
            type: 'image',
            credit:
                'By NonOmnisMoriar - Own work, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=19848395',
        },
        'Neoclassical: Often feature columns, domes, and triangular pediments': {
            definition: 'neoclassical.jpg',
            type: 'image',
            credit:
                'By Sergey Galyonkin from Kyiv, Ukraine - Pantheon of Paris Uploaded by paris 17, CC BY-SA 2.0, https://commons.wikimedia.org/w/index.php?curid=30422566',
        },
        'Art Deco: Geometric shapes, bold colors, and lavish ornamentation': {
            definition: 'art_deco.jpg',
            type: 'image',
            credit:
                'By Visitor7 - Own work, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=32668978',
        },
        'Victorian: Look for decorative trim, asymmetrical facades, steeply pitched roofs':
        {
            definition: 'victorian.jpg',
            type: 'image',
            credit:
                'By Bjørn Christian Tørrissen - Own work by uploader, http://bjornfree.com/galleries.html, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=19282202',
        },
        'Brutalist: Look for unfinished concrete construction, blocky shapes, and rugged, angular forms':
        {
            definition: 'brutalist.jpg',
            type: 'image',
            credit:
                'By José Gregorio Ferrer - Own work, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=28729400',
        },
        'Modern: Look for buildings with clean lines, lack of ornamentation, and open floor plans':
        {
            definition: 'modern.jpg',
            type: 'image',
            credit:
                'By Valueyou (talk) - I created this work entirely by myself., CC BY-SA 3.0, https://en.wikipedia.org/w/index.php?curid=19648390',
        },
    };

    return (
        <div className="matching-game-body">
            <div className="intro">
                <h1>Architectural Engineering Matching Game</h1>
                <p>
                    Click on cards to flip them over and match them with the correct
                    architectural styles. There's no time limit, so take your time!
                </p>
            </div>
            <MatchingGame terms={dictionary} rewardID={1} rewardName={"Dog House"} />
        </div>
    );
};

export default ArchitecturalEngineeringGame;