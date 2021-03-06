import { useRouter } from 'next/router';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import NewsletterRegistration from '../../components/input/newsletter-registration';
import { getAllEvents } from '../../dummy-data';
const AllEventsPage = (props) => {
    const router = useRouter();
    const events = props.events;
    const findEventsHandler = (year, month) => {
        const fullPath = `/events/${year}/${month}`
        router.push(fullPath);
    }
    return (
        <>
            <EventsSearch onSearch={findEventsHandler} />
            <NewsletterRegistration />
            <EventList items={events} />
        </>
    );
};

export const getStaticProps = async () => {
    const events = await getAllEvents();
    return {
        props: {
            events
        },
        revalidate: 60
    }
}





export default AllEventsPage;