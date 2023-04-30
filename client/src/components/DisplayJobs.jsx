import React from 'react';
import { useNavigate } from 'react-router-dom';

import FundCard from './FundCard';

import { loader } from '../assets';

const DisplayJobs = ({ title, isLoading, Job }) => {
  const navigate = useNavigate();

  const handleNavigate = (Job) => {
    navigate(`/job-details/${Job.title}`, { state: Job })
  }

  return (
    <div>
      <h1 className='font-epilogue font-semibold text-[18px] text-white text-left'>{title} ({Job && Job.length})</h1>
      <div className='flex flex-wrap mt-[20px] gap-[26px]'>
        {isLoading && (
          <img src={loader} alt="loader" className='w-[100px] h-[100px] object-contain'/>
        )}

        {!isLoading && (! Job ||  Job.length === 0 && (
          <p className='font epilogue font-semibold text-[14px] leading-[30px] text-[#818183]'>
            you have not posted any jobs yet.
          </p>
        ))}
        {!isLoading && Job && Job.length > 0 && Job.map((Job) => <FundCard
        key={Job.pId}
        {...Job}
        handleClick={() => handleNavigate(Job)}
        />)}

      </div>
    </div>
)

}

export default DisplayJobs