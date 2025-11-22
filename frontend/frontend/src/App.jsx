import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import SignupForm from './components/SignupForm';
import NewPlace from './components/NewPlace';
import UserItem from './components/UserItem';
import PlaceItem from './components/PlaceItem';

function App() {
  const [count, setCount] = useState(0);
  const [createdUser, setCreatedUser] = useState(null);
  const [createdPlace, setCreatedPlace] = useState(null);


  const handleDeletePlace = async (id) => {

    setCreatedPlace(null);

  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>


      <SignupForm onCreated={setCreatedUser} />

      {createdUser && (
        <UserItem name={createdUser.name} email={createdUser.email} image={createdUser.image} />
      )}


      <NewPlace onCreated={setCreatedPlace} />

      {createdPlace && (
        <PlaceItem
          id={createdPlace._id || createdPlace.id} 
          title={createdPlace.title}
          description={createdPlace.description}
          address={createdPlace.address}
          creator={createdPlace.creator}
          image={createdPlace.image}
          onDelete={handleDeletePlace} 
        />
      )}

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
