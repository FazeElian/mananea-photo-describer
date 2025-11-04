import { Request, Response } from "express"

// Model
import User from "../models/User";

// Utils
import { generateJWT } from "../middleware/jwt";
import { hashPassword, checkPassword } from "../utils/auth";

export class AuthController {
    static register = async (req: Request, res: Response) => {
        const { email, password } = req.body

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } })
        if (existingUser) {
            const error = new Error("Este correo electrónico ya está asociado a otra cuenta.");
            res.status(409).json({ error: error.message });
            return;
        }

        try {
            // Create new user
            const user = new User(req.body)

            // Password hashing
            user.password = await hashPassword(password)

            // Save changes
            await user.save()

            res.status(201).json("Has creado tu cuenta con éxito.")
        } catch (error) {
            res.status(500).json({ error: "Ha ocurrido un error al crear tu cuenta, inténtalo más tarde." })
            console.log("Error creating account: ", error)
        }
    }

    static login = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        // Check if the user already exists
        const user = await User.findOne({ where: { email } });
        if(!user) {
            const error = new Error("No pudimos encontrar una cuenta con los datos proporcionados. Por favor, compruébelo y vuelva a intentarlo.");
            res.status(404).json({ error: error.message });
            return;
        }

        // Check if password entered is correct
        const isPasswordCorrect = await checkPassword(password, user.password);
        if(!isPasswordCorrect) {
            const error = new Error("Por favor verifique su contraseña y vuelva a intentarlo.");
            res.status(401).json({ error: error.message });
            return;
        }

        const token = generateJWT(user.id)

        res.send(token);
    }

    static forgotPassword = (req: Request, res: Response) => {
        
    }

    static getUser = (req: Request, res: Response) => {
        
    }
}

export default AuthController;