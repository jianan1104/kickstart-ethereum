// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;


contract CampaignFactory {
    address[] public deployedCampaign;

    function createCampaign(uint minumum) public {
        address newCampaign =  address(new Campaign(minumum, msg.sender));
        deployedCampaign.push(newCampaign);
    }

    function getDeployedCampaign() public view returns (address[] memory) {
        return deployedCampaign;
    }
}

contract Campaign {

    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        bool created;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    uint public requestsIndex;
    mapping(uint => Request) public requests;
    address public manager;
    uint public minumumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    constructor(uint minimum, address creator) {
        manager = creator;
        minumumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minumumContribution);
        if(!approvers[msg.sender]){
            approvers[msg.sender] = true; 
            approversCount++;
        }
    }

    function createRequest(string memory description, uint value, address recipient) public restricted {
        Request storage newRequest = requests[requestsIndex++];
        newRequest.description = description;
        newRequest.value = value;
        newRequest.recipient = payable(recipient);
        newRequest.complete = false;
        newRequest.created = true;
        newRequest.approvalCount = 0;
    }

    function approveRequest(uint Index) public {
        Request storage request = requests[Index];
        require(request.created, "Request is not defined.");
        require(approvers[msg.sender], "Hey, please donate first.");
        require(!request.approvals[msg.sender], "Do not aprrove again.");

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint Index) public restricted {
        Request storage request = requests[Index];
        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);
        request.recipient.transfer(request.value);
        request.complete = true;
    }

     function getSummary() public view returns(
         uint, uint, uint, uint, address
     ) {
        return (
            minumumContribution,
            address(this).balance,
            requestsIndex,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns(uint) {
        return requestsIndex;
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
}

