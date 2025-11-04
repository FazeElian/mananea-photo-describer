import { Toaster } from "sonner";
import "../../assets/css/register.css";
import { useRegisterMutation } from "../../modules/auth/mutations";
import { useForm } from "react-hook-form";

const RegisterView = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      userName: "",
      password: ""
    }
  });

  // Mutation
  const registerMutation = useRegisterMutation()
  const handleRegister = (formData) => {
    registerMutation.mutate(formData, {
      onSuccess: () => {
        reset()
      }
    });
  }

  return (
    <>
      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit(handleRegister)} method="post">
          <h2>Crear cuenta</h2>

          <input
            type="text"
            placeholder="Nombre de usuario"
            {...register("userName", {
              required: "Por favor, ingresa un nombre de usuario",
              minLength: {
                value: 4,
                message: "El nombre de usuario debe tener al menos 4 caracteres."
              }
            })}
          />
          {errors.userName && 
            <p style={{ color: "red" }}>
              {errors.userName?.message}
            </p>
          }

          <input
            type="email"
            name="email"
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
            name="password"
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

          <button type="submit" className="submit-btn">
            Registrarse
          </button>
        </form>
      </div>
      <Toaster position="top-center" richColors />
    </>
  );
};

export default RegisterView;