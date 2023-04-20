import { useState, useEffect } from "react" 

export const useDeviceSize = () => {

    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [graphHeight, setGraphHeight] = useState(0)

    const handleWindowResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        
        // "window.innerHeight * 0.8" -> scale graph height based on inner browser window height
        // " / ((window.innerWidth/window.innerHeight) + 0.8)" -> adjust graph height by screen ratio
        // "(window.innerWidth/window.innerHeight) + 0.8" -> pure ratio caused too much fluxation-- softened by +0.8
        setGraphHeight(window.innerHeight * 0.8 / ((window.innerWidth/window.innerHeight) + 0.8));
    }

    useEffect(() => {
        // component is mounted and window is available
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
    
        // unsubscribe from the event on component unmount
        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);

    return [width, height, graphHeight]
}