"use server"
import { redirect } from "next/navigation"
import { saveMeal } from "./meals"
import { revalidatePath } from "next/cache"

function isInvalidText(text){
  return !text || text.trim()===''
}

export default async function shareMeal(prevState,formData){

  
  const meal={
      title: formData.get('title'),
      creator: formData.get('name'),
      creator_email: formData.get('email'),
      instructions: formData.get('instructions'),
      image: formData.get('image'),
      summary: formData.get('summary')
    }

    if(isInvalidText(meal.creator)||isInvalidText(meal.creator_email)||isInvalidText(meal.title)||isInvalidText(meal.summary)||isInvalidText(meal.instructions)|| !meal.creator_email.includes('@')|| !meal.image|| meal.image.size===0){
      return {
        message: 'Invalid Input'
      }
    }

   await saveMeal(meal)
   revalidatePath("/meals")
   redirect('/meals')
  } 