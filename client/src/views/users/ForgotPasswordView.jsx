import "../../assets/css/forgot-password.css";

const ForgotPasswordView = () => {
  return (
    <div className="forgot-container">
      <form className="forgot-form">
        <h2>Recuperar contraseña</h2>
        <p className="info-text">
          Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
        </p>

        <input type="email" placeholder="Correo electrónico" required />

        <button type="submit" className="forgot-btn">
          Enviar enlace
        </button>

        <p className="back-link">
          ¿Recordaste tu contraseña? <a href="/login">Volver al inicio de sesión</a>
        </p>
      </form>
    </div>
  );
};

export default ForgotPasswordView;