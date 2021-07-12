import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { getPlaiceholder } from "plaiceholder";

import styles from '../styles/Product.module.css'

export default function Product({ product }) {
  return (
    <div className={styles.Wrapper}>
      <Head>
        <title>{product.title}</title>
        <meta name="description" content={product.title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='container'>
        <div className='row'>
          <div className='col-12 mb-5'>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href='/'>Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">{product.title}</li>
              </ol>
            </nav>
          </div>
          <div className='col-12'>
            <div className='row'>
              <article className='col-12'>
                <div className='row'>
                  <div className='col-lg-5'>
                    <Image {...product.image} alt={product.title} placeholder="blur" />
                  </div>
                  <div className='col-lg-7 py-5'>
                    <h1>{product.title}</h1>
                    <p>{product.description}</p>
                    <div className={styles.Price}>{product.price} USD</div>
                    <div>
                      <span className="badge bg-primary">{product.category}</span>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
  const products = await res.json()

  const paths = products.map((product) => ({
    params: { productId: product.id.toString() },
  }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${params.productId}`)
  const product = await res.json()

  const { base64, img } = await getPlaiceholder(product.image)

  return {
    props: {
      product: {
        ...product,
        image: {
          ...img,
          blurDataURL: base64,
        }
      },
    },
  }
}
