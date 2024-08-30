import React from "react";
import { useState } from "react";

const SortingFunction = ({ leaveRequests, onSort }) => {
  const [sortBy, setSortBy] = useState("");

  const handleSort = (e) => {
    const sortType = e.target.value; // the value from the select box
    setSortBy(sortType);

    let sortedRequests = [...leaveRequests];

    if (sortType === "submittedDate") {
      sortedRequests.sort((a, b) => {
        const dataA = new Date(a.submittedDate);
        const dataB = new Date(b.submittedDate);
        return dataA - dataB;
      });
    } else if (sortType === "status") {
      sortedRequests.sort((a, b) => a.status.localeCompare(b.status));
    }
    onSort(sortedRequests);
  };

  return (
    <div>
      <select
        className=" mb-3 border rounded-xl"
        value={sortBy}
        onChange={handleSort}
      >
        <option value="  "> -- Sort by -- </option>
        <option value="submittedDate">Submitted Date</option>
        <option value="status">Status</option>
      </select>
    </div>
  );
};

export default SortingFunction;
