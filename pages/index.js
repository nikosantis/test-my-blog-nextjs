import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { getPlaiceholder } from "plaiceholder";

import styles from '../styles/Home.module.css'

export default function Home({ posts }) {
  return (
    <div className={styles.Wrapper}>
      <Head>
        <title>Mi Super Ecommerce</title>
        <meta name="description" content="Mi Super Ecommerce" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <div className='row'>
              {posts.map((product) => (
                <article className='col-lg-3 mb-4' key={product.id}>
                  <div className='card'>
                    <Link href={`/${product.id}`}>
                      <a>
                        <Image {...product.image} alt={product.title} placeholder="blur" />
                      </a>
                    </Link>
                    <div className='card-body'>
                      <Link href={`/${product.id}`}>
                        <a>
                          <h5 className='card-title'>{product.title}</h5>
                        </a>
                      </Link>
                      <p className='card-text'>{product.description.substring(0, 30)} ...</p>
                      <p className='card-text'>{product.price} USD</p>
                      <div>
                        <span className="badge bg-primary">{product.category}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
  const posts = await res.json()

  const postsWithImages = await Promise.all(
    posts.map(async (product) => {
      const { base64, img } = await getPlaiceholder(product.image)

      return {
        ...product,
        image: {
          ...img,
          blurDataURL: base64,
        }
      }
    })
  )

  return {
    props: {
      posts: postsWithImages,
    },
  }
}
