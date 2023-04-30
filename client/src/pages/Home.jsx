import React, { useState, useEffect } from 'react'

import DisplayJobs from '../components/DisplayJobs';

import { useStateContext } from '../context'

const Home = () => {
const [isLoading, setIsLoading] = useState(false);
const [Job, setJob] = useState([]);

const { address, contract, getJobs} = 
useStateContext();

const fetchJobs = async () => {
  setIsLoading(true);
const data = await getJobs();
setJob(data);
setIsLoading(false);
}

useEffect(() => {
if(contract) fetchJobs();
}, [address, contract]);


  return (
   <DisplayJobs
   title="All Jobs"
   isLoading={isLoading}
   Job={Job}
   />
  )
}

export default Home