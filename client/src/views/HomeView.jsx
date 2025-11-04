import { useState, useEffect } from "react";
import "../assets/css/home.css";
import logo from "../assets/img/logo.png";

const HomeView = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/images`); // tu ruta del backend
        if (!res.ok) throw new Error("Error al obtener imágenes");

        const data = await res.json();
        setImages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) return <p>Cargando imágenes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="home-container">
      {images.length > 0 ? (
        images.map((img) => (
          <div key={img.id} className="image-card">
            <img src={img.url} alt={img.name} />
            <p>{img.name}</p>
          </div>
        ))
      ) : (
        <p>No hay imágenes disponibles.</p>
      )}
    </div>
  );
};

export default HomeView;
