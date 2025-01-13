import { useState } from 'react';
import { BiBasket } from 'react-icons/bi';
import { EventName, Notification } from '../../models';
import { useEventSubscribe } from '../../hooks';
import { NotificationBox } from './notification-box';

export const Basket = () => {
    const [notification, setNotification] = useState<Notification>();
    const handleAddBasketItem = ({ id }: Notification) => {
        setNotification({ id });
    }
    useEventSubscribe(EventName.addBasketItem, handleAddBasketItem);

    return <>
        <div>
            <BiBasket size={25} title='basket' />
        </div>
        {notification && <NotificationBox key={notification.id} id={notification.id} />}
    </>;
}