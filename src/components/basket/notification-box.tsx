import clsx from 'clsx';
import styles from './notification-box.module.css';

interface NotificationBoxProps {
    id: number;
    style: React.CSSProperties;
}

export const NotificationBox = ({ id, style }: NotificationBoxProps) => {
    return <div style={style} className={clsx(styles.notificationBox, styles.fadeOut)}>
        order item No. {id}
    </div>
}