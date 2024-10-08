import React, { useState, useEffect } from 'react';
import { NavLink, useSearchParams, useParams } from "react-router-dom";
import MajorRequirements from './MajorRequirements';

import './explore.css'
import Background from '../assets/majorsbg.jpg'
import MajorBackground from '../assets/exploremajorsbg.jpg'

const Explore = () => {
  const [majors, setMajors] = useState([]);

  useEffect(() => {
    // Fetch data from the Flask server
    fetch('/api/majors')
      .then(response => response.json())
      .then(data => setMajors(data))
      .catch(error => console.error('Error fetching majors:', error));
  }, []);

  return (
    <div className="majors" style={{backgroundImage: `url(${Background})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed'}}>
      {majors.map(major => (
        <NavLink to={`/explore/${encodeURIComponent(major.majorName)}?majorID=${major.majorID}`} key={major.majorID} style={{ textDecoration: 'none', color: 'black' }}>
          <div className="major">
            <h2 className="leftText">{major.majorName}</h2>
            <p>{major.majorDescription}</p>
            <p>Career Ideas: {major.careerProspects}</p>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default Explore;

export function MajorInfo() {
  const [majorInfo, setMajorInfo] = useState({
    topProfessors: [],
    studentQuotes: [],
    careerProspects: '',
    minors: [],
    skills: [],
    interests: []
  });
  const [searchParams] = useSearchParams();
  const { majorName } = useParams();
  const majorID = searchParams.get('majorID');

  useEffect(() => {
    const fetchMajorInfo = async () => {
      const response = await fetch(`/api/majors/majorinformation/${majorID}`);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setMajorInfo(data.majorInfo);
      } else {
        console.error(`Error status: ${response.status}`);
      }
    };
    fetchMajorInfo();
  }, [majorID]);

  if (!majorInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ backgroundImage: `url(${MajorBackground})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }}>
      <h1>{majorName} Information</h1>
      <div className="majorInfo professors">
        <h3 className="centerText">Top Professors</h3>
        <div className="center">
          {majorInfo.topProfessors.map((prof, index) => (
            <div className="professorCard" key={index}>
              <img src={prof.professorURL} className="professorImage" alt={prof.name} />
              {prof.professorName}
            </div>
          ))}
        </div>
      </div>
      <div className="majorInfo quotes">
        <h3>Student Quotes</h3>
        <ul className="leftText info">
          {majorInfo.studentQuotes.map((quote, index) => (
            <li key={index}>{quote}</li>
          ))}
        </ul>
      </div>
      <div className="majorInfo careers">
        <h3>Careers</h3>
        <p className="infoSmall">{majorInfo.careerProspects}</p>
      </div>
      <div className="majorInfo minors">
        <h3>Potential Minors</h3>
        <ul className="leftText info">
          {majorInfo.minors.map((minor, index) => (
            <li key={index}>
              <strong>{minor.name}</strong>: {minor.message}
            </li>
          ))}
        </ul>
      </div>
      <div className="majorInfo skills">
        <h3>Skills Current Students Recommend to be Successful in {majorName}</h3>
        <p className="infoSmall">{majorInfo.skills.join(', ')}</p>
      </div>
      <div className="majorInfo interests">
        <h3>Interests that led Current Students to {majorName}</h3>
        <p className="infoSmall">{majorInfo.interests.join(', ')}</p>
      </div>
      <div className="majorInfo majorRequirementsSection">
        <MajorRequirements major={majorName} />
      </div>
      <div className="playButton">
        <NavLink to={`/explore/${majorName}/minigame`} style={{ textDecoration: 'none', color: 'black' }}>
          Play the {majorName} Game
        </NavLink>
      </div>
    </div>
  );
}
