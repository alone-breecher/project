import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0xE089E8e2f366d91eFad4228300fC9616D35799C4'); // Update the contract address here
  const { mutateAsync: createJob, mutateAsync: applyToJob } = useContractWrite(contract, 'createJob', 'applyToJob');

  const address = useAddress();
  const connect = useMetamask();

  const publishJob = async (form) => {
    try {
      const data = await createJob({args:[
        address, //owner
        form.title,
        form.description,
        form.token,
        new Date(form.deadline).getTime()
      ]});
      console.log("contract call success ", data);
    } catch (error) {
      console.log("contract call failed ", error);
    }
  }

  const getJobs = async () => {
    const jobs = await contract.call('getJobs');
    const parsedJobs = jobs.map((job, i) => ({
      owner:job.owner,
      title:job.title,
      description: job.description,
      token: ethers.utils.formatEther(job.token.toString()),
      deadline: job.deadline.toNumber(),
      pId: i
    }));
    return parsedJobs;
  }

  const getUserJobs = async () => {
    const allJobs = await getJobs();

    const filteredJobs = allJobs.filter((job) => job.owner === address);

    return filteredJobs;
  }

  const apply = async (pId, amount, email, coverLetter, workToken) => {
    const data = await contract.call('applyToJob', pId, email, coverLetter, workToken, { value: ethers.utils.parseEther(amount) });

    return data;
}

  const getProposals = async (jobId) => {
    const proposals = await contract.call('getfreelancers', jobId);
    const numberOfProposals = proposals[0].length;

    const parsedProposals = [];

    for (let i= 0; i < numberOfProposals; i++ ) {
      parsedProposals.push({
        freelancers: proposals[0][i],
        token: ethers.utils.formatEther(proposals[1][i].toString())
      })
    }

    return parsedProposals;
  }

  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        createJob: publishJob,
        getJobs,
        getUserJobs,
        apply,
        applyToJob,
        getProposals
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);
