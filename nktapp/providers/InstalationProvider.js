import * as React from 'react';

export const InstalationContext = React.createContext({
    instalation: {},
    setInstalation: () => {}
});

export const InstalationProvider = (props) => {

    const [instalation, setInstalation] = React.useState({})
    

    const instalationObject = {
        instalation,
        setInstalation: setInstalation
    }

  return (
        <InstalationContext.Provider value={instalationObject}>
            {props.children}
        </InstalationContext.Provider>
    );
};

// Custom hook to get the theme object returns {isDark, colors, setScheme}
export const useInstalation = () => React.useContext(InstalationContext);