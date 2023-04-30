// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract NodeGi {

    struct Job {
        address owner;
        string title;
        string description;
        uint256 token;
        uint256 deadline;
        uint256 proposalsReceived;
        string email;
        string coverLetter;
        uint256 workToken;
        address freelancer;
    }

    mapping(uint256 => Job) public jobs;

    uint256 public numberOfJobs = 0;

    function createJob(address _owner, string memory _title, string memory _description, uint256 _token, uint256 _deadline) public returns (uint256) {
        require(_deadline > block.timestamp, "The deadline of the work should be in the future.");

        Job storage job = jobs[numberOfJobs];
        job.owner = _owner;
        job.title = _title;
        job.description = _description;
        job.token = _token;
        job.deadline = _deadline;
        job.proposalsReceived = 0;

        numberOfJobs++;

        return numberOfJobs - 1;
    }

    function applyToJob(uint256 _id, address _freelancer, string memory _email, string memory _coverLetter, uint256 _workToken) public payable {
        Job storage job = jobs[_id];

        require(msg.value == job.token, "You must send the correct amount of tokens to apply for this job.");
        require(job.deadline > block.timestamp, "The deadline for this job has passed.");

        job.freelancer = _freelancer;
        job.email = _email;
        job.workToken = _workToken;
        job.coverLetter = _coverLetter;

        (bool sent,) = payable(job.owner).call{value: job.token}("");

        if(sent) {
            job.proposalsReceived++;
        }
    }

    function getFreelancer(uint256 _id) public view returns (address freelancer ) {
        Job storage job = jobs[_id];
        return job.freelancer;
    }

    function getJobs() public view returns (Job[] memory) {
        Job[] memory allJobs = new Job[](numberOfJobs);

        for (uint i = 0; i < numberOfJobs; i++) {
            allJobs[i] = jobs[i];
        }

        return allJobs;
    }

    function getProposals(uint256 _id) public view returns (address freelancer, string memory email, string memory coverLetter, uint256 workToken) {
        Job storage job = jobs[_id];
        return (job.freelancer, job.email, job.coverLetter, job.workToken);
    }

    function deleteJob(uint256 _id) public {
        Job storage job = jobs[_id];

        require(job.owner == msg.sender, "Only the job owner can delete the job.");

        delete jobs[_id];

        numberOfJobs--;
    }
}
