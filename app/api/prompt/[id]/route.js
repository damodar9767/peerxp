import Prompt from "@/models/prompt";

import { connectToDB } from "@/utils/database";


//get{read}
export const GET = async (request,{ params }) => {
    try {
        await connectToDB()

        const prompt = await Prompt.findById(params.id).populate('creator')

        if(!prompt ) return new Response("Prompt not found",{status:404 })

        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 

//Patch(update)

export const PATCH = async (request,{params}) =>{
    
    const{ name,description,category,doe ,amount, user} = await request.json();
    console.log({description,category,doe,amount,user});

    try {
        await connectToDB();
        
        const existingPrompt = await Prompt.findById(params.id);
        console.log(existingPrompt);

        if(!existingPrompt) return new Response("Prompt not found", {status:404})
        
        existingPrompt.name = name;
        existingPrompt.description = description;
        existingPrompt.category = category;
        existingPrompt.doe = doe;
        existingPrompt.amount = amount;




        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), {status: 200})

    } catch (error) {
        return new Response ("Failed to update the prompt" , { status: 500})
        
    }


}

//delete

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();
        await Prompt.findByIdAndRemove(params.id);

        return new Response ("Prompt deleted succecfully", {status: 200})

    } catch (error) {
        return new Response ("Failed to delete the prompt" , { status: 500})
        
    }

}