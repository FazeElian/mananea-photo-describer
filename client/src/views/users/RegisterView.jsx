import { useNavigate } from "react-router-dom";
import "../../assets/css/register.css";

const RegisterView = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías agregar la lógica de registro o validación si quieres
    alert("Registro exitoso ✅");
    navigate("/login"); // Redirige al login después de registrarse
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Crear cuenta</h2>

        <input type="text" placeholder="Nombre real" required />
        <input type="email" placeholder="Correo electrónico" required />

        <div className="password-container">
          <input type="password" placeholder="Contraseña" required />
          <button type="button" className="show-btn">Mostrar</button>
          <div className="strength-bar">
            <div className="strength-progress"></div>
          </div>
        </div>

        <input type="password" placeholder="Confirmar contraseña" required />

        <button type="submit" className="submit-btn">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default RegisterView;