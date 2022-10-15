import { DARK_MODE } from "../types/modeType";
import { useEffect, useState } from "react";
// initial state

const darkModeReducer = (state = {}, action) => {
  switch (action.type) {
    case DARK_MODE:
      return {
        ...state,
        // getting value from the action file and changing isdarkMode State.
        isdarkMode: action.payload,
      };
    default:
      return state;
  }
};

export default darkModeReducer;
