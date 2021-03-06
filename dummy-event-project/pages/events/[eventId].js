import { Fragment } from "react";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import EventContent from "../../components/event-detail/event-content";
import { getEventById, getAllEvents, getFeaturedEvents } from "../../helpers/api-utils";
import ErrorAlert from "../../components/error-alert/error-alert";
import Comments from "../../components/input/comments";
const EventDetailsPage = (props) => {
    const event = props.selectedEvent;
    if (!event) {
        return (
            <div className="center">
                <p>Loading...</p>
            </div>
        )

    }
    return (
        <Fragment>
            <EventSummary title={event.title} />
            <EventLogistics
                date={event.date}
                address={event.location}
                image={event.image}
                imageAlt={event.title}
            />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
            <Comments eventId={event.id} />
        </Fragment>
    );
};

export const getStaticProps = async (context) => {
    const eventId = context.params.eventId;

    const event = await getEventById(eventId);

    return {
        props: {
            selectedEvent: event
        },
        revalidate: 30
    };

}

export const getStaticPaths = async () => {
    const events = await getFeaturedEvents();
    const paths = events.map(event => ({ params: { eventId: event.id } }))
    return {
        paths: paths,
        fallback: true
    }
}

export default EventDetailsPage;