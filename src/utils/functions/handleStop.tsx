/* eslint-disable @typescript-eslint/no-explicit-any */
const handleStop = (e: any) => {
  e.stopPropagation();
  e.preventDefault();
};

export default handleStop;
