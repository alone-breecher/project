import React, { useState, useEffect } from 'react';
import DisplayJobs from '../components/DisplayJobs';
import { useStateContext } from '../context';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [Job, setJob] = useState([]);

  const { address, contract, getUserJobs, deleteJob } = useStateContext();

  const fetchJobs = async () => {
    setIsLoading(true);
    const data = await getUserJobs();
    setJob(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchJobs();
  }, [address, contract]);

  const handleDelete = async (id) => {
    await deleteJob(id);
    await fetchJobs();
  };

  return (
    <DisplayJobs
      title="Posted Jobs"
      isLoading={isLoading}
      Job={Job}
      handleDelete={handleDelete}
    />
  );
};

export default Profile;