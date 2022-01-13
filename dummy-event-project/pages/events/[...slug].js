import { useRouter } from 'next/router';
import React from 'react';
import ErrorAlert from '../../components/error-alert/error-alert';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import { getFilteredEvents } from '../../dummy-data';

const FilteredEventPage = () => {
    const router = useRouter();
    const filterData = router.query.slug;
    if (!filterData) {
        return <p className='center'>Loading...</p>
    }

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
        return (
            <>
                <ErrorAlert>
                    <p> Filter options are not valid </p>
                </ErrorAlert>
                <div className="center">
                    <Button link='/events'>Show All events</Button>
                </div>
            </>
        )
    }

    const filteredEvents = getFilteredEvents({
        year: filteredYear,
        month: filteredMonth
    });

    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <>
                <ErrorAlert>
                    <p> No events found </p>
                </ErrorAlert>
                <div className="center">
                    <Button link='/events'>Show All events</Button>
                </div>
            </>
        )
    }

    const date = new Date(filteredYear, filteredMonth - 1);

    return (
        <>
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </>
    );
};

export default FilteredEventPage;