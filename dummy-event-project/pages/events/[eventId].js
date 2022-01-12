import { useRouter } from "next/router";
import { getEventById } from "../../dummy-data";
const EventDetailsPage = () => {
    const router = useRouter();
    const eventId = router.query.eventId;
    const event = getEventById(eventId);

    if (!event) {
        return <p>No event found</p>
    }
    return (
        <div>
            <h3>EVENT DETAILS PAGE</h3>
        </div>
    );
};

export default EventDetailsPage;