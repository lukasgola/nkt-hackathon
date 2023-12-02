import * as React from 'react';

export const WireCountContext = React.createContext({
    wireCount: {},
    setWireCount: () => {}
});

export const WireCountProvider = (props) => {

    const [wireCount, setWireCount] = React.useState({})
    

    const wireCountObject = {
        wireCount,
        setWireCount: setWireCount
    }

  return (
        <WireCountContext.Provider value={wireCountObject}>
            {props.children}
        </WireCountContext.Provider>
    );
};

// Custom hook to get the theme object returns {isDark, colors, setScheme}
export const useWireCount = () => React.useContext(WireCountContext);