import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [data, setData] = useState();
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => setData(data))
  }, [])
  console.log(data);
  return (
    <>
      <ul>
        {
          data?.map(e => {
            return (
              <li key={e.id}>{e.title}</li>
            )
          })
        }
      </ul>
    </>
  )
}
