import React from "react";

import matchStatus from '../Enums/status';

const Status = props => {
  const { status } = props;

    return (
      <svg
        fill="none"
        viewBox="0 0 234 26"
        id="9674855289a3943b51dcc520de928f73"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M234 0H0v5h1.01a30 30 0 0120.78 8.362l3.655 3.51a30 30 0 0020.78 8.361h141.473a29.999 29.999 0 0020.009-7.648l5.516-4.937A29.997 29.997 0 01233.232 5H234V0z"
          fill={matchStatus[status].backgroundColor}
        />
        <text x="50%" y="50%" text-anchor="middle" fill={matchStatus[status].textColor} dy=".3em">{(matchStatus[status].text).toUpperCase()}</text>
      </svg>
    );
};

export default Status;
