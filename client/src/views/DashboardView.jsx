import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/dashboard.css";
import logo from "../assets/img/logo.png";
import { supabase } from "../supabase/client"; // IMPORTANTE ✅

const DashboardView = () => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const redirect = useNavigate()

  // Cargar desde localStorage
  useEffect(() => {
    const token = localStorage.getItem("AUTH_TOKEN")
    if (!token) {
      redirect("/login")
    }
    const stored = JSON.parse(localStorage.getItem("uploadedImages")) || [];
    setImages(stored);
  }, []);

  const logOut = () => {
    redirect("/login")
    localStorage.removeItem("AUTH_TOKEN")
  }

  // Guardar en localStorage si cambia
  useEffect(() => {
    localStorage.setItem("uploadedImages", JSON.stringify(images));
  }, [images]);

  // ✅ Subir imagen a Supabase
  async function uploadImage(file) {
    const fileName = `${Date.now()}_${file.name}`;

    const { data, error } = await supabase.storage
      .from("images") // bucket
      .upload(fileName, file);

    if (error) {
      console.error(error);
      throw error;
    }

    // Obtener URL pública
    const { data: publicUrlData } = supabase.storage
      .from("images")
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  }

  // ✅ Manejar selección y subida
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      // 1) Subir a Supabase
      const publicUrl = await uploadImage(file);

      // 2) Crear objeto para dashboard
      const newImage = {
        id: Date.now(),
        name: file.name,
        url: publicUrl,
        date: new Date().toLocaleString(),
      };

      // 3) Agregar al estado/localStorage
      setImages([newImage, ...images]);
    } catch (error) {
      console.error("Error subiendo imagen:", error);
      alert("Hubo un error al subir la imagen.");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Eliminar imagen del dashboard/localStorage
  const handleDelete = (id) => {
    const updated = images.filter((img) => img.id !== id);
    setImages(updated);
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <img src={logo} alt="AI Visual Analyzer" className="logo" />

        <div className="nav-buttons">
          <label htmlFor="file-upload" className="upload-btn">
            📤 Subir imagen
          </label>

          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleUpload}
            hidden
          />

          <button
            className="logout-btn"
            onClick={logOut}
          >
            Cerrar sesión
          </button>
        </div>
      </nav>

      {/* Contenido */}
      <main className="dashboard-content">
        <h2>Mis imágenes subidas</h2>

        {uploading && <p className="uploading">⏳ Subiendo imagen...</p>}

        {images.length === 0 ? (
          <p className="empty">No hay imágenes todavía. 📁</p>
        ) : (
          <div className="image-grid">
            {images.map((img) => (
              <div key={img.id} className="image-card">
                <img src={img.url} alt={img.name} />
                <div className="image-info">
                  <p className="image-name">{img.name}</p>
                  <p className="image-date">{img.date}</p>
                </div>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(img.id)}
                >
                  🗑️ Eliminar
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardView;