import { useState, useEffect } from "react" 

export const useDeviceSize = () => {
    // create states 
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [graphHeight, setGraphHeight] = useState(0)

    // window resize function
    const handleWindowResize = () => {
        // get inner width & height and set it to state
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        
        // calculate ratio for graphHeight
        // "window.innerHeight * 0.8" -> scale graph height based on inner browser window height
        // " / ((window.innerWidth/window.innerHeight) + 0.8)" -> adjust graph height by screen ratio
        // "(window.innerWidth/window.innerHeight) + 0.8" -> pure ratio caused too much fluxation-- softened by +0.8
        setGraphHeight(window.innerHeight * 0.8 / ((window.innerWidth/window.innerHeight) + 0.8));
    }
    // trigger on reload
    useEffect(() => {
        // component is mounted and window is available
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
    
        // unsubscribe from the event on component unmount
        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);

    // return updated states
    return [width, height, graphHeight]
}