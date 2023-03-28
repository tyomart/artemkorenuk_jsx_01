import { useState } from 'react';

let nextId = 0;

export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState([]);
  const [sT,setST]= useState(0)
    const setter4 =()=> sT+4+artists[0].name
  const handleCheck = () => {
    setST(setter4())
  }

  return (
    <>
    <div><button onClick={handleCheck}>CHECKED--{sT}</button></div>
    
      
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => {
        setName('');
        setArtists([
          ...artists,
          { id: nextId++, name: name }
        ]);
      }}>Add</button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}