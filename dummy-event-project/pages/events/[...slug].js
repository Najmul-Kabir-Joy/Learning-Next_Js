import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../helpers/api-utils';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/error-alert/error-alert';

const FilteredEventPage = (props) => {
    // const [loadedEvents, setLoadedEvents] = useState();
    const router = useRouter();
    const filterData = router.query.slug;

    // const { data, error } = useSWR(
    //     'https://nextjs-practice-74d60-default-rtdb.firebaseio.com/events.json'
    // );
    // useEffect(() => {
    //     if (data) {
    //         const events = [];

    //         for (const key in data) {
    //             events.push({
    //                 id: key,
    //                 ...data[key]
    //             });
    //         }

    //         setLoadedEvents(events)
    //     }
    // }, [data])

    // if (!loadedEvents) {
    //     return <p className='center'>Loading...</p>
    // }

    // // const filteredYear = +filterData[0];
    // // const filteredMonth = +filterData[1];

    // const filteredYear = filterData[0];
    // const filteredMonth = filterData[1];

    // const numYear = +filteredYear;
    // const numMonth = +filteredMonth;

    // //for client side fetching
    // if (
    //     isNaN(numYear) ||
    //     isNaN(numMonth) ||
    //     numYear > 2030 ||
    //     numYear < 2021 ||
    //     numMonth < 1 ||
    //     numMonth > 12 ||
    //     error
    // ) {
    //     return (
    //         <>
    //             <ErrorAlert>
    //                 <p> Filter options are not valid </p>
    //             </ErrorAlert>
    //             <div className="center">
    //                 <Button link='/events'>Show All events</Button>
    //             </div>
    //         </>
    //     )
    // }

    // const filteredEvents = loadedEvents.filter((event) => {
    //     const eventDate = new Date(event.date);
    //     return (
    //         eventDate.getFullYear() === numYear &&
    //         eventDate.getMonth() === numMonth - 1
    //     );
    // });
    //-------------------------------
    //for ssr
    if (props.hasError) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p> Filter options are not valid </p>
                </ErrorAlert>
                <div className="center">
                    <Button link='/events'>Show All events</Button>
                </div>
            </Fragment>
        )
    }
    const filteredEvents = props.events;

    //--------------
    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p> No events found </p>
                </ErrorAlert>
                <div className="center">
                    <Button link='/events'>Show All events</Button>
                </div>
            </Fragment>
        )
    }
    //-------------
    //FOR SSR 
    const date = new Date(props.date.year, props.date.month - 1);
    //FOR CSF
    //---------
    // const date = new Date(filteredYear, filteredMonth - 1);
    //------------

    return (
        <Fragment>
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </Fragment>
    );
};

//USIGN SSR SYSTEM
export const getServerSideProps = async (context) => {
    const { params } = context;
    const filterData = params.slug;
    const filteredYear = +filterData[0];
    const filteredMonth = +filterData[1];
    if (
        isNaN(filteredYear) ||
        isNaN(filteredMonth) ||
        filteredYear > 2030 ||
        filteredYear < 2020 ||
        filteredMonth < 1 ||
        filteredMonth > 12
    ) {
        return {
            props: { hasError: true }
            // notFound: true,
            // redirect: {
            //     destination: '/error'
            // }
        }
    }

    const filteredEvents = await getFilteredEvents({
        year: filteredYear,
        month: filteredMonth
    });
    return {
        props: {
            events: filteredEvents,
            date: {
                year: filteredYear,
                month: filteredMonth
            }
        }
    }

}

export default FilteredEventPage;