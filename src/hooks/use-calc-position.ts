import { useEffect, useState } from "react";

export const useCalculatePosition = (ref : React.RefObject<HTMLDivElement>) => {
    const margin = 16;
    const ntBoxWidth = 400;
    const mobileCutOff = 480;
    const [style, setStyle] = useState<React.CSSProperties>({ display: 'none' });
    const handleResize = () => setStyle(calculatePosition());
    
    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);
        
    const calculatePosition = () => {
        const basket = ref.current?.getBoundingClientRect();
        if (!basket) return {};
        const newStyle: React.CSSProperties = {};
        const viewportWidth = window.innerWidth;
        const ntBoxStopDist = ntBoxWidth / 2 + margin;
        const basketXcenter = basket.left + basket.width / 2;
        if (viewportWidth > mobileCutOff) {
            newStyle.left = basketXcenter;
            if (basketXcenter < ntBoxStopDist) newStyle.left = ntBoxStopDist;
            if (basketXcenter > (viewportWidth - ntBoxStopDist)) newStyle.left = viewportWidth - ntBoxStopDist;
        } else {
            newStyle.left = ntBoxStopDist - margin / 2;
            newStyle.width = viewportWidth - margin;
        }
        return newStyle;
    };
    
    return [style]
}