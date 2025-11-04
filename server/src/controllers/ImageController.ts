import { Request, Response } from "express"
import Image from "../models/Image";
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export class ImageController {
    static getAll = async (req: Request, res: Response) => {
        try {
            const userId = req.user.id;
            
            // Get call transactions
            const images = await Image.findAll({
                order: [
                    ["date", "DESC"]
                ]
            })

            // Send images
            res.json(images)
        } catch (error) {
            res.status(500).json({ error: "Error getting all the transactions" })
        }
    }


    static new = async (req: Request, res: Response) => {
        try {
            // Message sent by the user
            const { prompt } = req.body;

            // Get user
            const userId = req.user.id

            const completion = await client.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: `
                            Describe esta imagen en pocas palabras
                        `
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
            })
            // Send response to client
            res.send(completion.choices[0].message.content)
        } catch (error) {
            res.status(500).json({ error: "Error al describir imagen, inténtelo más tarde" })
            console.log("Error Cashy BOT (new): ", error)
        } 
    }
}

export default ImageController;