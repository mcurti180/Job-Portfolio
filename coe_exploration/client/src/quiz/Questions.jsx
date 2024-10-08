// QuestionDefinitions.jsx
import React from 'react';

const Question1 = ({ selectedOption, onOptionChange, onNext }) => (
  <div>
    <p>Question 1: Which area of technology fascinates you the most?</p>
    <input
      type="radio"
      name="q1"
      value="Computer Science,Construction Engineering Management,"
      checked={selectedOption === "Computer Science,Construction Engineering Management,"}
      onChange={onOptionChange}
    />
    A. Software engineering and digital solutions
    <br />
    <input
      type="radio"
      name="q1"
      value="Civil Engineering,Architectural Engineering,"
      checked={selectedOption === "Civil Engineering,Architectural Engineering,"}
      onChange={onOptionChange}
    />
    B. Infrastructure and urban development
    <br />
    <input
      type="radio"
      name="q1"
      value="Electrical and Computer Engineering,Bioengineering,Environmental Engineering,Chemical Engineering,Ecological Engineering,"
      checked={selectedOption === "Electrical and Computer Engineering,Bioengineering,Environmental Engineering,Chemical Engineering,Ecological Engineering,"}
      onChange={onOptionChange}
    />
    C. Energy production and environmental sustainability
    <br />
    <input
      type="radio"
      name="q1"
      value="Mechanical Engineering,Industrial Engineering,Manufacturing Engineering,Aerospace Engineering,Energy Systems Engineering (Cascades),Engineering Science (Cascades),Radiation Health Physics,Outdoor Products (Cascades),Nuclear Engineering,"
      checked={selectedOption === "Mechanical Engineering,Industrial Engineering,Manufacturing Engineering,Aerospace Engineering,Energy Systems Engineering (Cascades),Engineering Science (Cascades),Radiation Health Physics,Outdoor Products (Cascades),Nuclear Engineering,"}
      onChange={onOptionChange}
    />
    D. Machinery, industrial automation, and advanced technologies
    <br />
    <br />
    {/* <button onClick={() => onNext(selectedOption)}>Next</button> */}
  </div>
);

const Question2 = ({ selectedOption, onOptionChange, onNext }) => (
  <div>
    <p>Question 2: What kind of projects would you enjoy working on?</p>
    <input
      type="radio"
      name="q2"
      value="Computer Science,Energy Systems Engineering (Cascades),Electrical and Computer Engineering,"
      checked={selectedOption === "Computer Science,Energy Systems Engineering (Cascades),Electrical and Computer Engineering,"}
      onChange={onOptionChange}
    />
    A. Software development, energy systems, and electrical engineering
    <br />
    <input
      type="radio"
      name="q2"
      value="Civil Engineering,Environmental Engineering,Ecological Engineering,Outdoor Products (Cascades),"
      checked={selectedOption === "Civil Engineering,Environmental Engineering,Ecological Engineering,Outdoor Products (Cascades),"}
      onChange={onOptionChange}
    />
    B. Architectural design, environmental sustainability, and outdoor products
    <br />
    <input
      type="radio"
      name="q2"
      value="Aerospace Engineering,Chemical Engineering,Bioengineering,Radiation Health Physics,Engineering Science (Cascades),"
      checked={selectedOption === "Aerospace Engineering,Chemical Engineering,Bioengineering,Radiation Health Physics,Engineering Science (Cascades),"}
      onChange={onOptionChange}
    />
    C. Renewable energy and ecological engineering
    <br />
    <input
      type="radio"
      name="q2"
      value="Mechanical Engineering,Manufacturing Engineering,Industrial Engineering,Nuclear Engineering,"
      checked={selectedOption === "Mechanical Engineering,Manufacturing Engineering,Industrial Engineering,Nuclear Engineering,"}
      onChange={onOptionChange}
    />
    D. Manufacturing processes, industrial engineering, and nuclear technology
    <br />
    <br />
    {/* <button onClick={() => onNext(selectedOption)}>Next</button> */}
  </div>
);


const Question3 = ({ selectedOption, onOptionChange, onNext }) => (
  <div>
    <p>Question 3:What aspect of engineering interests you the most?</p>
    <input
      type="radio"
      name="q3"
      value="Computer Science,Engineering Science (Cascades),Bioengineering,"
      checked={selectedOption === "Computer Science,Engineering Science (Cascades),Bioengineering,"}
      onChange={onOptionChange}
    />
    A. Structural design and urban planning
    <br />
    <input
      type="radio"
      name="q3"
      value="Civil Engineering,Nuclear Engineering,Architectural Engineering,Energy Systems Engineering (Cascades),"
      checked={selectedOption === "Civil Engineering,Nuclear Engineering,Architectural Engineering,Energy Systems Engineering (Cascades),"}
      onChange={onOptionChange}
    />
    B. Programming and software architecture
    <br />
    <input
      type="radio"
      name="q3"
      value="Aerospace Engineering,Radiation Health Physics,Electrical and Computer Engineering,Mechanical Engineering,"
      checked={selectedOption === "Aerospace Engineering,Radiation Health Physics,Electrical and Computer Engineering,Mechanical Engineering,"}
      onChange={onOptionChange}
    />
    C. Environmental conservation and resource management
    <br />
    <input
      type="radio"
      name="q3"
      value="Construction Engineering Management,Outdoor Products (Cascades),Industrial Engineering,Environmental Engineering,"
      checked={selectedOption === "Construction Engineering Management,Outdoor Products (Cascades),Industrial Engineering,Environmental Engineering,"}
      onChange={onOptionChange}
    />
    D. Industrial optimization and process engineering
    <br />
    <br />
    {/* <button onClick={() => onNext(selectedOption)}>Next</button> */}
  </div>
);

const Question4 = ({ selectedOption, onOptionChange, onNext }) => (
  <div>
    <p>Question 4: Which field of study aligns with your current hobbies or interests?</p>
    <input
      type="radio"
      name="q4"
      value="Computer Science,Electrical and Computer Engineering,Radiation Health Physics,"
      checked={selectedOption === "Computer Science,Electrical and Computer Engineering,Radiation Health Physics,"}
      onChange={onOptionChange}
    />
    A. Program a robot for a battle bot competition
    <br />
    <input
      type="radio"
      name="q4"
      value="Civil Engineering,Chemical Engineering,Energy Systems Engineering (Cascades),"
      checked={selectedOption === "Civil Engineering,Chemical Engineering,Energy Systems Engineering (Cascades),"}
      onChange={onOptionChange}
    />
    B. Experimenting with model bridges or building miniature architectural structures 
    <br />
    <input
      type="radio"
      name="q4"
      value="Aerospace Engineering,Bioengineering,Environmental Engineering,"
      checked={selectedOption === "Aerospace Engineering,Bioengineering,Environmental Engineering,"}
      onChange={onOptionChange}
    />
    C. Building and launching model rockets
    <br />
    <input
      type="radio"
      name="q4"
      value="Mechanical Engineering,Industrial Engineering,Architectural Engineering,Manufacturing Engineering,Nuclear Engineering,"
      checked={selectedOption === "Mechanical Engineering,Industrial Engineering,Architectural Engineering,Manufacturing Engineering,Nuclear Engineering,"}
      onChange={onOptionChange}
    />
    D. Taking apart and reassembling machinery or appliances
    <br />
    <br />
    {/* <button onClick={() => onNext(selectedOption)}>Next</button> */}
  </div>
);


const Question5 = ({ selectedOption, onOptionChange, onNext }) => (
  <div>
    <p>Question 5: What motivates you to pursue a career in engineering?</p>
    <input
      type="radio"
      name="q5"
      value="Computer Science,Construction Engineering Management,Aerospace Engineering,Electrical and Computer Engineering,"
      checked={selectedOption === "Computer Science,Construction Engineering Management,Aerospace Engineering,Electrical and Computer Engineering,"}
      onChange={onOptionChange}
    />
    A. Creating sustainable and resilient urban environments
    <br />
    <input
      type="radio"
      name="q5"
      value="Civil Engineering,Architectural Engineering,Bioengineering,Nuclear Engineering,"
      checked={selectedOption === "Civil Engineering,Architectural Engineering,Bioengineering,Nuclear Engineering,"}
      onChange={onOptionChange}
    />
    B. Innovating with technology and digital solutions
    <br />
    <input
      type="radio"
      name="q5"
      value="Radiation Health Physics,Environmental Engineering,Chemical Engineering,Engineering Science (Cascades)"
      checked={selectedOption === "Radiation Health Physics,Environmental Engineering,Chemical Engineering,Engineering Science (Cascades)"}
      onChange={onOptionChange}
    />
    C. Addressing environmental challenges and climate change
    <br />
    <input
      type="radio"
      name="q5"
      value="Mechanical Engineering,Industrial Engineering,Manufacturing Engineering,Ecological Engineering,Energy Systems Engineering (Cascades)"
      checked={selectedOption === "Mechanical Engineering,Industrial Engineering,Manufacturing Engineering,Ecological Engineering,Energy Systems Engineering (Cascades)"}
      onChange={onOptionChange}
    />
    D. Optimizing production processes and industrial systems
    <br />
    <br />
    {/* <button onClick={() => onNext(selectedOption)}>Next</button> */}
  </div>
);


const Question6 = ({ selectedOption, onOptionChange, onNext }) => (
  <div>
    <p>Question 6:What type of course are you most interested in taking?</p>
    <input
      type="radio"
      name="q6"
      value="Computer Science,Construction Engineering Management,"
      checked={selectedOption === "Computer Science,Construction Engineering Management,"}
      onChange={onOptionChange}
    />
    A. Programming and Software Development
    <br />
    <input
      type="radio"
      name="q6"
      value="Civil Engineering,Architectural Engineering,"
      checked={selectedOption === "Civil Engineering,Architectural Engineering,"}
      onChange={onOptionChange}
    />
    B. Engineering and Architectural Design
    <br />
    <input
      type="radio"
      name="q6"
      value="Bioengineering,Environmental Engineering,Chemical Engineering,Ecological Engineering"
      checked={selectedOption === "Bioengineering,Environmental Engineering,Chemical Engineering,Ecological Engineering"}
      onChange={onOptionChange}
    />
    C. Scientific Research and Data Analysis
    <br />
    <input
      type="radio"
      name="q6"
      value="Mechanical Engineering,Industrial Engineering,Construction Engineering Management"
      checked={selectedOption === "Mechanical Engineering,Industrial Engineering,Construction Engineering Management"}
      onChange={onOptionChange}
    />
    D. Project Management and Leadership
    <br />
    <br />
    {/* <button onClick={() => onNext(selectedOption)}>Submit</button> */}
  </div>
);

export { Question1, Question2, Question3, Question4, Question5, Question6 };

