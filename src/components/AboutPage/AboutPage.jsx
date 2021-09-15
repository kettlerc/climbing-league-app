import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <p>This about page is for anyone to read!</p>
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
        <h3>Special Thanks</h3>
      </div>
    </div>
  );
}

export default AboutPage;
