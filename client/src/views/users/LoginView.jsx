import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/login.css";

const LoginView = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulación de cuenta ya registrada (puedes reemplazarlo por localStorage o backend)
    const cuentaRegistrada = {
      email: "usuario@ejemplo.com",
      password: "1234",
    };

    // Validación
    if (email === cuentaRegistrada.email && password === cuentaRegistrada.password) {
      setError("");
      alert("Inicio de sesión exitoso ✅");
      navigate("/main"); // Redirige a la pantalla principal
    } else {
      setError("Correo o contraseña incorrectos ❌");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error-message">{error}</p>}

        <p>
          ¿Olvidaste tu contraseña?{" "}
          <a href="/forgot-password">Presiona aquí</a>
        </p>

        <button type="submit" className="login-btn">
          Ingresar
        </button>

        <p className="register-link">
          ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
        </p>
      </form>
    </div>
  );
};

export default LoginView;
