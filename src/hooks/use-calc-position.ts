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
        window.addEventListener('scroll', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleResize);
        }
    }, []);
        
    const calculatePosition = () => {
        const basket = ref.current?.getBoundingClientRect();
        if (!basket) return {};
        const newStyle: React.CSSProperties = {};
        const viewportWidth = document.documentElement.clientWidth;
        const scrollLeft = window.scrollX
        const ntBoxStopDist = ntBoxWidth / 2 + margin;
        const basketXcenter = basket.left + basket.width / 2 + scrollLeft;
        const leftWall = scrollLeft;
        const rightWall = viewportWidth + scrollLeft;
        if (viewportWidth > mobileCutOff) {
            newStyle.left = basketXcenter;
            if (basketXcenter + ntBoxStopDist > rightWall) 
                newStyle.left = rightWall - ntBoxStopDist;
            if (basketXcenter - ntBoxStopDist < leftWall) 
                newStyle.left = leftWall + ntBoxStopDist;
        }
        else {
            newStyle.left = ntBoxStopDist - margin / 2 + scrollLeft;
            newStyle.width = viewportWidth - margin;
        }
        return newStyle;
    };
    
    return [style]
}