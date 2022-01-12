import Image from "next/image";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
import DateIcon from "../icons/date-icon";
import Button from "../ui/button";
import styles from './event-item.module.css';
const EventItem = (props) => {
    const { event } = props;
    const { title, image, date, location, id } = event;

    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        day: "numeric",
        month: 'long',
        year: 'numeric'
    });

    const exploreLink = `/events/${id}`;

    const formattedAddress = location.replace(', ', '\n');
    return (
        <li className={styles.item}>
            <Image src={'/' + image} alt={title} width='250' height='50' />
            <div className={styles.content}>
                <div className={styles.summary}>
                    <h2>{title}</h2>
                    <div className={styles.date}>
                        <DateIcon />
                        <time>{formattedDate}</time>
                    </div>
                    <div className={styles.address}>
                        <AddressIcon />
                        <address>{formattedAddress}</address>
                    </div>
                </div>
                <div className={styles.actions}>
                    <Button link={exploreLink}>
                        <span>Explore event</span>
                        <span className={styles.icon}><ArrowRightIcon /></span>
                    </Button>
                </div>
            </div>
        </li>
    );
};

export default EventItem;