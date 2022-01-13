import { getFeaturedEvents } from "../helpers/api-utils";
import EventList from "../components/events/event-list";
const Home = (props) => {
  return (
    <div>
      <EventList items={props.events} />
    </div>
  );
};


export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents
    },
    revalidate: 1800
  }
}

export default Home;