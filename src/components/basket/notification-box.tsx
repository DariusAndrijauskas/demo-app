import clsx from 'clsx';
import styles from './notification-box.module.css';
import { useCalculatePosition } from '../../hooks/use-calc-position';

interface NotificationBoxProps {
    id: number;
    ref: React.RefObject<HTMLDivElement>;
}

export const NotificationBox = ({ id, ref }: NotificationBoxProps) => {
    const [style] = useCalculatePosition(ref);
    return <div style={style} className={clsx(styles.notificationBox, styles.fadeOut)}>
        order item No. {id}
    </div>
}