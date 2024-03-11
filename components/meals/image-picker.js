"use client"

import { useRef,useState } from 'react'
import classes from './image-picker.module.css'
import Image from 'next/image'

export default function ImagePicker({ label,name }) {

    const imgInputRef = useRef()
    const [pickedImage, setPickedImage] = useState(null)

    const handleImagePick =() =>{
        imgInputRef.current.click()
    }

    const handleImageChange = (e)=>{
        const file = e.target.files[0]
        if(!file){
            setPickedImage(null)
            return
        }
         const fileReader = new FileReader()
        
         fileReader.onload = ()=>{
             setPickedImage(fileReader.result)
         }

         fileReader.readAsDataURL(file)
    }

    return <div className={classes.picker}>
        <label htmlFor={name}> {label} </label>
        <div className={classes.control} >
            <div onClick={handleImagePick} className={classes.preview} >
                {!pickedImage && <p>Please choose an image to preview.</p> }
                {pickedImage && (
                    <Image src={pickedImage} alt='Image picked by the user' fill  />
                ) }
            </div>
            <input 
            className={classes.input}
            type="file" 
            onChange={handleImageChange}
            required
            name={name} 
            id={name} 
            ref={imgInputRef}
            accept='image/*' />
            {/* <button className={classes.button} onClick={handleImagePick} type='button' >Pick an Image</button> */}
        </div>
    </div>
}