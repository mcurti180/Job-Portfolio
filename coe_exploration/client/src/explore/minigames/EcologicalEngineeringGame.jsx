import React from 'react';
import Wordle from './Wordle.jsx';

const EcologicalEngineeringGame = () => {
    // List of themed words for the wordle game
    const words = [
        "flora",
        "fauna",
        "green",
        "solar",
        "water",
        "earth",
        "wind",
        "soil",
        "tree",
        "plant",
        "leaf",
        "root",
        "stem",
        "seed",
        "bloom",
        "grow",
        "rain",
        "forest",
        "grass",
        "bush",
        "biome",
        "energy",
        "cycle",
        "ozone",
        "nature",
        "waste",
        "filter",
        "biomes",
        "biogas",
        "habitat",
        "lichen",
        "perch",
        "boggy",
        "lilac",
        "reeds",
        "vines",
        "weeds",
        "crust",
        "debris",
        "mossy",
        "shrub",
        "creek",
        "swamp",
        "dunes",
        "xeric",
        "algae",
        "floral",
        "fungus",
        "lagoon",
        "stem",
    ];

    return (
        <div>
            <Wordle word_list={words} rewardID={7} rewardName={"Flower Bush"} />
        </div>
    );
};

export default EcologicalEngineeringGame;