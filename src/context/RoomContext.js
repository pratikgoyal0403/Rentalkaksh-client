import React, { createContext, useState } from "react";

const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  return (
    <RoomContext.Provider value={{ rooms, setRooms }}>
      {children}
    </RoomContext.Provider>
  );
};
export {RoomContext};
export default RoomProvider;
