import { getFeaturedEvents } from "../helpers/api-utils";
import EventList from "../components/events/event-list";
import Head from "next/head";
import NewsletterRegistration from "../components/input/newsletter-registration";
const Home = (props) => {
  return (
    <div>
      <Head>
        <title>DUMMY EVENT PROJECT</title>
        <meta name="description" content="Just practicing next js course from udemy" />
      </Head>
      <NewsletterRegistration />
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