import React, {useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { useStateContext } from '../context';
import { CustomButton, FormField, Loader } from '../components';

 const createJob = () => {
   const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState(false);
   const { createJob } = useStateContext();
   const [form, setForm] = useState({
    title: '',
    description: '',
    token: '',
    deadline: ''

   });
   const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formattedToken = ethers.utils.parseUnits(form.token, 18);

    await createJob({ ...form, token: formattedToken });
    setIsLoading(false);
    navigate('/');

    console.log(form);
  };
  return (
    <div className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 '>
      {isLoading && <Loader/>}
      <div className='flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]'>
        <h1 className='font-epilogue fon-bold sm:text-[25px] text-[18px] leading-[38px] text-white'>Post a Job</h1>
      </div>
      <form onSubmit={handleSubmit} className='w-full mt-[65px] flex flex-col gap-[30px]'>
        <div className='flex flex-wrap gap-[40px]'>
        <FormField 
        labelName="Job Title *"
      placeholder="Enter a job title"
      inputType="text"
      value={form.title}
      handleChange={(e) => handleFormFieldChange ('title', e)}
        />


        </div>
        <FormField 
        labelName="Description*"
      placeholder="Enter your job description"
      isTextArea
      value={form.description}
      handleChange={(e) => handleFormFieldChange ('description', e)}
        />

        <div className='flex justify-center items-center mt-[40px]'>

        <FormField 
        labelName="Token needed*"
      placeholder="Token needed to request job proposal"
      inputType="text"
      value={form.token}
      handleChange={(e) => handleFormFieldChange ('token', e)}
        />
        <FormField 
        labelName="End Date*"
      placeholder="Job end Date"
      inputType="date"
      value={form.deadline}
      handleChange={(e) => handleFormFieldChange ('deadline', e)}
        />
        </div>
          <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
          btnType='Submit'
          title='Submit new Job'
          styles='bg-[#1dc071]'
          />

        </div>

      </form>
      </div>
  )
}

export default createJob