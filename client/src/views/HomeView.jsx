import { useState } from "react";
import "../assets/css/home.css";
import logo from "../assets/img/logo.png"; // Asegúrate de mover tu imagen aquí

const HomeView = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));

      // Aquí iría la llamada a la IA (por ahora, simulamos una respuesta)
      setDescription("Esta parece ser una imagen con un objeto aún por identificar...");
    }
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <img src={logo} alt="AI Visual Analyzer" className="logo" />
        <button
          className="logout-btn"
          onClick={() => (window.location.href = "/login")}
        >
          Cerrar sesión
        </button>
      </nav>

      <main className="content">
        <h2>Sube una imagen para analizarla</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="upload-input"
        />

        {image && (
          <div className="preview">
            <img src={image} alt="preview" />
            <p className="description">{description}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomeView;