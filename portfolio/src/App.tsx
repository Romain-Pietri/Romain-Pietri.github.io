import React from 'react';
import './App.css';
import ExampleComponent from './components/ExampleComponent';

const App: React.FC = () => {
    return (
        <div className="App">
            <h1>Bienvenue dans mon application React</h1>
            <ExampleComponent />
        </div>
    );
};

export default App;