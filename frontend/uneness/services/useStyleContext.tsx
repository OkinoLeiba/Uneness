
import React, { useContext } from 'react';
import { StyleContext } from '../components/LayOut';


// May not be needed and will try to wrap context provider around what is being return by the consumer component
export const withStyleContext = (WrappedComponent: any) => {
  return (props: any) => {
    const context = useContext(StyleContext);
    return <WrappedComponent {...props} styleContext={context} />;
  };
};
