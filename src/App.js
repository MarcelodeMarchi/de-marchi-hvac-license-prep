// src/App.js
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import LoginPage from "./LoginPage";
import ConteudoRestrito from "./components/ConteudoRestrito";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <p>Loading...</p>
      </div>
    );
  }

  // Se não tiver usuário logado → mostra LoginPage
  if (!user) {
    return <LoginPage />;
  }

  // Se tiver logado → mostra o conteúdo do app
  return <ConteudoRestrito />;
}

export default App;
