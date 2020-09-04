import React from "react";
import ChannelStore from "./channel-store";

export const StoresContext = React.createContext({
  channel: new ChannelStore(),
  // You can add more stores here
});

export const useStores = () => React.useContext(StoresContext);
