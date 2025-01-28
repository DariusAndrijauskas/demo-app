import { useEffect, useRef, useState } from 'react';
import { BiBasket } from 'react-icons/bi';
import { EventName, Notification } from '../../models';
import { useEventSubscribe } from '../../hooks';
import { NotificationBox } from './notification-box';

export const Basket = () => {
    const [notification, setNotification] = useState<Notification>();
    const [notificationStyle, setNotificationStyle] = useState<React.CSSProperties>({});
    const basketRef = useRef<HTMLDivElement>(null);
    const handleAddBasketItem = ({ id }: Notification) => {
        setNotification({ id });
        calculatePosition();
    }
    useEventSubscribe(EventName.addBasketItem, handleAddBasketItem);
    
    useEffect(() => {
        window.addEventListener('resize', calculatePosition);
        return () => {
            window.removeEventListener('resize', calculatePosition);
        }
    }, []);
        
    const calculatePosition = () => {
        const basket = basketRef.current?.getBoundingClientRect();
        if (!basket) return;
        const style: React.CSSProperties = {};
        const viewportWidth = window.innerWidth;
        const margin = 16;
        const ntBoxWidth = 400;
        const ntBoxStopDist = ntBoxWidth / 2 + margin;
        const basketXcenter = basket.left + basket.width / 2;
        if (viewportWidth > 480) {
            style.left = basketXcenter;
            if (basketXcenter < ntBoxStopDist) style.left = ntBoxStopDist;
            if (basketXcenter > (viewportWidth - ntBoxStopDist)) style.left = viewportWidth - ntBoxStopDist;
        } else {
            style.left = ntBoxStopDist - margin / 2;
            style.width = viewportWidth - margin;
        }
        setNotificationStyle(style);
    };
    return <div ref={basketRef} style={{marginLeft: '300px'}}>
        <BiBasket size={25} title='basket' />
        {notification && <NotificationBox key={notification.id} id={notification.id} style={notificationStyle} />}
    </div>;
}