import React from 'react';
import Button from '../ui/button';
import styles from './events-search.module.css';
import { useRef } from 'react';
const EventsSearch = (props) => {
    const yearInput = useRef();
    const monthInput = useRef();
    const submitHandler = (e) => {
        e.preventDefault();

        const selectedYear = yearInput.current.value;
        const selectedMonth = monthInput.current.value;

        props.onSearch(selectedYear, selectedMonth);
    }
    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <div className={styles.controls}>
                <div className={styles.control}>
                    <label htmlFor="yaer">Year</label>
                    <select name="year" id="year" ref={yearInput}>
                        <option value='2021'>2021</option>
                        <option value='2022'>2022</option>
                    </select>
                </div>
                <div className={styles.control}>
                    <label htmlFor="month">Month</label>
                    <select name="month" id="month" ref={monthInput}>
                        <option value="1">Januray</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                </div>
            </div>
            <Button>Find Events</Button>
        </form>
    );
};

export default EventsSearch;