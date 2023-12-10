import React, { useState } from 'react';

export default function useToggle(defaultState?: boolean | false) {
  const [state, setState] = useState(defaultState);

  const toggleState = () => {
    setState(!state);
  };

  return [state, toggleState];
}
