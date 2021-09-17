import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <h3>Technologies Used</h3>
        <ul>
          <li>React</li>
          <li>Redux</li>
          <li>Redux-Sagas</li>
          <li>Node.js</li>
          <li>Express</li>
          <li>Postgresql</li>
          <li>Material-UI</li>
          <li>React Circular Input</li>
        </ul>
        <h3>Hardest Challenge?</h3>
        <p>Definitely the scoring...</p>
        <h3>Future Features</h3>
        <p>More climb details, view teammate's climbs</p>
        <h3>Special Thanks</h3>
        <p>All of the Prime staff, but especially Edan and Matt.</p>
        <p>The entire Mersenne Cohort.</p>
        <p>My wife and family.</p>
      </div>
    </div>
  );
}

export default AboutPage;
