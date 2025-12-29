import { createContext, useCallback, useReducer, useRef } from "react";
import { initialState, gameReducer } from "../app/state";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // ref to hold pending CPU timeout id so we can clear it from anywhere
  const cpuTimeoutRef = useRef(null);

  const clearPendingCpuMove = useCallback(() => {
    if (cpuTimeoutRef.current) {
      clearTimeout(cpuTimeoutRef.current);
      cpuTimeoutRef.current = null;
    }
  }, []);

  const scheduleCpuMove = useCallback(
    (fn, delay = 500) => {
      clearPendingCpuMove();
      cpuTimeoutRef.current = setTimeout(() => {
        fn();
        cpuTimeoutRef.current = null;
      }, delay);
      return cpuTimeoutRef.current;
    },
    [clearPendingCpuMove]
  );

  const helpers = {
    clearPendingCpuMove,
    scheduleCpuMove,
  };

  return (
    <GameContext.Provider value={{ state, dispatch, helpers }}>
      {children}
    </GameContext.Provider>
  );
};
