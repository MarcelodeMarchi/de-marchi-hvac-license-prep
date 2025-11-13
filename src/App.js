import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import LoginPage from "./LoginPage";
import ConteudoRestrito from "./components/ConteudoRestrito";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const handleLogout = () => {
    setUser(null); // isto força voltar para LoginPage
  };

  if (!user) return <LoginPage />;

  return <ConteudoRestrito onLogout={handleLogout} />;
}

export default App;
