import { useState, useEffect } from "react";
import useSWR from "swr";

const LastSales = (props) => {
    const [sales, setSales] = useState(props.sales);
    // const [isLoading, setIsLoading] = useState(false);
    //APPROACH USING useSWR
    //THE EXACT BELOW LINE DOESN'T WORK AT ALL SO USING THE SECOND ONE
    // const { data, error } = useSWR('https://nextjs-practice-74d60-default-rtdb.firebaseio.com/sales.json')
    const { data, error } = useSWR('https://nextjs-practice-74d60-default-rtdb.firebaseio.com/sales.json', (url) => fetch(url).then(res => res.json()))
    //USING USE EfFECT TO CONVERT THE DATA IN USABLE DATA
    useEffect(() => {
        if (data) {
            const usableData = [];
            for (const key in data) {
                usableData.push({
                    id: key,
                    uname: data[key].uname,
                    volume: data[key].volume
                });
            }
            setSales(usableData);
        }
    }, [data])
    // console.log('data', data);
    // console.log('usadata', sales);
    //APPROACH USING USE EFFECT
    // useEffect(() => {
    //     setIsLoading(true);
    //     fetch('https://nextjs-practice-74d60-default-rtdb.firebaseio.com/sales.json')
    //         .then(res => res.json())
    //         .then(data => {
    //             const usableData = [];
    //             for (const key in data) {
    //                 usableData.push({ id: key, uname: data[key].uname, volume: data[key].volume });
    //             }
    //             setSales(usableData);
    //             setIsLoading(false);
    //         })
    // }, [])

    if (error) {
        return <p>Failed to load</p>
    }
    if (!data && !sales) {
        return <p>Loading...</p>
    }

    return (
        <ul>
            {
                sales.map(sale => {
                    return (
                        <li key={sale.id}>{sale.uname}, {sale.volume}, {sale.id}</li>
                    )
                })
            }
        </ul>
    );
};

export default LastSales;

export async function getStaticProps() {
    const res = await fetch('https://nextjs-practice-74d60-default-rtdb.firebaseio.com/sales.json')
    const data = await res.json();
    const usableData = [];
    for (const key in data) {
        usableData.push({
            id: key,
            uname: data[key].uname,
            volume: data[key].volume
        });
    }

    return {
        props: {
            sales: usableData
        },
        revalidate: 10
    };
}