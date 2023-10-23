import { useRouter } from 'next/navigation';
import React from 'react'

const Del = ({setDelmod,posttobeDEleted,user }) => {

    const router = useRouter() 

    const handleDelete = async (key) =>{

        console.log(key);

        

    
          try {
            await fetch  (`/api/prompt/${key.toString()}`,{
              method: 'DELETE'
            })
      
      
            
          } catch (error) {
            console.log(error);
            
          }
      
          router.refresh();
        
        
    
    
    
    
      } 
  return (
    <section className='popupform ' id='basic' >

    <div className='modalComponent  pt-4 px-6  bg-white rounded-xl w-[300px] sm:w-[500px]'>
      <div className='modal__header text-xl font-semibold flex justify-between items-center '>
      <h3 className='pb-2'>Delete</h3>

      <button onClick={() => setDelmod(false)}><img src='/Icon.svg' alt='close tag' /></button>

      </div>        
      <div className='modalmiddle my-6'>
        <p>Are you sure you want to Delete?</p>
      </div>

      <div className='modalfoot'>

      <button  onClick={() =>{
        setDelmod(false)

      }} className='bg-gray px-4 py-3 text-white rounded-[10px]'>Cancel </button>


      <button  onClick={() =>{

        setDelmod(false)

        handleDelete(posttobeDEleted)
      


        




      }} className='bg-red-500 px-4 py-3 text-white rounded-[10px]'>Delete</button>

      </div>
    </div>

    </section>
  )
}

export default Del