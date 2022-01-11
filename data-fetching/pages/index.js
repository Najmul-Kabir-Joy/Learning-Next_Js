// import Head from 'next/head'
// import Image from 'next/image'
// import { useEffect, useState } from 'react'
// import styles from '../styles/Home.module.css'
import fs from 'fs/promises';
import path from 'path';
function Home(props) {
  const { products } = props;
  // const [data, setData] = useState();
  // useEffect(() => {
  //   fetch('https://jsonplaceholder.typicode.com/posts')
  //     .then(res => res.json())
  //     .then(data => setData(data))
  // }, [])

  return (
    <>
      {/* <ul>
        {
          data?.map(e => {
            return (
              <li key={e.id}>{e.title}</li>
            )
          })
        }
      </ul> */}
      {
        products.map(e => <h1 key={e.id}>{e.title}</h1>)
      }
    </>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products,
    },
    //WILL WORK IN PRODUCTTION THIS IS CALL INCREMENTAL STATIC GENERATION (ISR);
    revalidate: 10
  }
}

export default Home;
