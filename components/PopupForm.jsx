import React, { useState } from 'react'



const PopupForm = ( {closeModal, formdat , type , user})  => {


  const [pform, setPform] = useState({
    name:'',
    description:'',
    category:'',
    doe: '',
    amount: '',
  });
  

  const handleChange = (e) => {
    const {name, value} = e.target;
    setPform({
      ...pform,
      [name]: value,
    })
   

  }

  const enterdata = async () => {

    const {name,description,category,doe,amount} = pform

    console.log(name);

    try {
      const response = await fetch('/api/prompt/new', {
        
          method: 'POST',
          body: JSON.stringify({
            name,description,category,doe,amount,user})
      })
      if(response.ok){
        router.push('/');
      }
    } catch (error) {
      console.log(error);
      
    }


  }


  
  return (
    <section className='popupform ' id='basic' >

      <div className='modalComponent  pt-4 px-6  bg-white rounded-xl w-[300px] sm:w-[500px]'>
        <div className='modal__header text-xl font-semibold flex justify-between items-center '>
        <h3 className='pb-2'>{type} Expense</h3>

        <button onClick={() => closeModal(false)}><img src='/Icon.svg' alt='close tag' /></button>

        </div>        
        <div className='modalmiddle my-6'>
          <form>
            <p className='my-1 '>Name </p>
            <input maxlength="140"  placeholder='Name of the Expanse' className='modal_inputs' type='text'  required  name='name' value={pform.name} onChange={handleChange} />

            <p className='my-1 mt-5 '>Description </p>
            <input placeholder='Describe the Expanse' className='modal_inputs' type='text'  required name='description' value={pform.description} onChange={handleChange} />

            <p className='my-1 mt-5 '>Category</p>
            <select name="category" id="category" className='modal_inputs' required  value={pform.category} onChange={handleChange}>
              <option value="category-less">Select category </option>
              <option value="Health">Health</option>
              <option value="Books">Books</option>
              <option value="Electronics" >Electronics</option>
              <option value="Travel"  >Travel</option>
              <option value="Education" >Education</option>
              <option value="Others" selected>Others</option>


            </select>

            <p className='my-1 mt-5 '>Date of Expanse</p>
            <input placeholder='Date of Expanse' className='modal_inputs' type='date'  required name='doe' value={pform.doe} onChange={handleChange} />

            <p className='my-1 mt-5 '>Expanse Amount</p>
            <input placeholder='Expanse Amount in INR ' className='modal_inputs' type='number'  required name='amount' value={pform.amount} onChange={handleChange} min='0' />
            

          </form>
        </div>

        <div className='modalfoot'>

        <button  onClick={() =>{
          closeModal(false)

        }} className='bg-gray px-4 py-3 text-white rounded-[10px]'>Cancel </button>


        <button  onClick={() =>{

          closeModal(false)
          formdat(pform)
          // console.log(pform.name)

          enterdata()




        }} className='bg-green-500 px-4 py-3 text-white rounded-[10px]'>{type}</button>

        </div>
      </div>

    </section>
  )
}

export default PopupForm