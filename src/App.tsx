import { useState } from 'react';
import mailsData from './mails.json';
import './index.css';

// El tipo para los datos de usuario no cambia
interface UserData {
  mail: string;
  color: string;
}

// Objeto para mapear los nombres en español a colores CSS válidos
const colorMap: { [key: string]: string } = {
  Verde: 'green',
  Azul: 'blue',
  Amarillo: '#E8C838', // Un amarillo más visible sobre fondo blanco
  Rojo: 'red',
  Naranja: 'orange',
  Celeste: 'skyblue',
};

function App() {
  const [email, setEmail] = useState('');
  const [userColor, setUserColor] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = () => {
    // 1. Nueva validación: ¿El campo está vacío?
    if (!email.trim()) {
      setError('Tenés que escribir el mail con el que te anotaste');
      setUserColor(null);
      return; // Detenemos la función aquí
    }

    // Buscamos el email ingresado
    const foundUser = (mailsData as UserData[]).find(
      (user) => user.mail.toLowerCase() === email.toLowerCase()
    );

    if (foundUser) {
      setUserColor(foundUser.color);
      setError(null); 
    } else {
      setUserColor(null); 
      // 2. Mensaje de error actualizado para mail no encontrado
      setError('mmmm.... Me parece que con ese mail no te anotaste');
    }
  };

  return (
    <div className="container">
      <h1>JAV</h1>
      
      <div className="input-group">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Escribí el mail con el que te anotaste"
        />
        <button onClick={handleSearch}>¿Qué color me tocó?</button>
      </div>

      {/* Resultado: se muestra si 'userColor' tiene un valor */}
      {userColor && (
        <div className="result">
          <p>Tu color es:</p>
          {/* Usamos el colorMap para obtener el color CSS correcto */}
          <span 
            className="color-display" 
            style={{ color: colorMap[userColor] || 'black' }}
          >
            {userColor}
          </span>
        </div>
      )}

      {/* Error: se muestra si 'error' tiene un valor */}
      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default App;