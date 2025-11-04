import { Toaster } from "sonner";
import "../../assets/css/login.css";
import { useLoginMutation } from "../../modules/auth/mutations";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


const LoginView = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      userName: "",
      password: ""
    }
  });

  // Mutation
  const loginMutation = useLoginMutation()
  const redirect = useNavigate()
  const handleRegister = (formData) => {
    loginMutation.mutate(formData, {
      onSuccess: () => {
        reset()
        redirect("/dashboard")
      }
    });
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit(handleRegister)}>
        <h2>Iniciar sesión</h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          {...register("email", {
            required: "El correo electrónico es obligatorio",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Por favor, ingresa un correo electrónico válido"
            }
          })}
        />
        {errors.email && 
          <p style={{ color: "red" }}>
            {errors.email?.message}
          </p>
        }

        <input
          type="password"
          placeholder="Crea una contraseña (mínimo 8 caracteres)"
          {...register("password", {
            required: "Debes ingresar una contraseña.",
            minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres."
            }
          })}
        />
        {errors.password && 
          <p style={{ color: "red" }}>
            {errors.password?.message}
          </p>
        }

        <p>
          ¿Olvidaste tu contraseña?{" "}
          <a href="/forgot-password">Presiona aquí</a>
        </p>

        <button type="submit" className="login-btn">
          Iniciar Sesión
        </button>

        <p className="register-link">
          ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
        </p>
      </form>
    </div>
  );
};

export default LoginView;
