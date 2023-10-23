import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";



export const POST  = async (req) => {
    const{ name,description,category,doe ,amount, user} = await req.json();
    console.log({description,category,doe,amount,user});

    



    try {
        await connectToDB();
        const newPrompt = new Prompt({
            creator: user,
            name,
            description,
            category,
            doe,
            amount
        })

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt),{status:201})
    } catch (error) {
        return new Response("Failed to create a new prompt",{status: 500 } )
    }

}