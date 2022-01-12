import React, { Fragment } from 'react';
import fs from 'fs/promises';
import path from 'path';
const Productdetails = (props) => {
    const { loaded } = props;
    if (!loaded) {
        return <h1>Loading...</h1>
    }
    return (
        <Fragment>
            <h1>{loaded.title}</h1>
            <p>{loaded.description}</p>
        </Fragment>
    );
};

async function getData() {
    const filePath = path.join(process.cwd(), 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);
    return data;
}

export async function getStaticProps(context) {
    const { params } = context;

    const productId = params.pid;

    const data = await getData();


    const product = data.products.find(product => product.id === productId);
    if (!product) {
        return { notFound: true }
    }
    return {
        props: {
            loaded: product
        }
    }
};


export async function getStaticPaths() {
    const data = await getData();
    const ids = data.products.map((product) => product.id);
    const pathWithParams = ids.map((id) => ({ params: { pid: id } }));
    console.log(ids);
    return {
        // paths: [
        //     {
        //         params: { pid: 'p1' }
        //     },
        //     {
        //         params: { pid: 'p2' }
        //     },
        //     {
        //         params: { pid: 'p3' }
        //     },
        // ],
        paths: pathWithParams,
        fallback: true,
    }
    //CAN SET FALLBACK TO 'blocking' this will allow me to load page with out the pre loader but loading might take some time.
};

export default Productdetails;