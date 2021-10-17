import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { api } from '../../services/api'

import styles from '../../styles/Movie.module.scss'


import Link from 'next/link'
import { Footer } from '../../components/Footer'

interface Movie {
    id: number,
    backdrop_path: string,
    original_title: string,
    overview: string,
    tagline: string,
    poster_path: string,
    release_date?: string,
    title: string,
    popularity: number,
    vote_average: number,
    vote_count: number,
    genres: [
        {
            id: number,
            name: string
        }
    ]
}

interface Cast {
    cast: [
        {
            id: number,
            name: string,
            profile_path: string,
            character: string
        }
    ]
}

interface SimilarMovies {
    results:[
        {
            id: number,
            poster_path: string,
            title: string,
            release_date: string,
            vote_average: number,
            vote_count: number,
        }
    ]
}

export default function Movie(){

    const [movie, setMovie] = useState<Movie>()
    const [cast, setCast] = useState<Cast>()
    const [similarMovies, setSimilarMovies] = useState<SimilarMovies>()

    const router = useRouter()

    const { id } = router.query

    useEffect(() => {
        api
            .get<Movie>(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=${process.env.LANGUAGE}`)
            .then(response =>{
                setMovie(response.data)
            })

        api
            .get<Cast>(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}&language=${process.env.LANGUAGE}&page=1`)
            .then(response => {
                setCast(response.data)
            })

        api
            .get<SimilarMovies>(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.API_KEY}&language=${process.env.LANGUAGE}`)
            .then(response => {
                setSimilarMovies(response.data)
            })

        },[])

  return (
    <>

      <div>
            <div className={styles.header_container}>

                <div className={styles.poster}>
                    <Link href="/">
                        <button>VOLTAR</button>
                    </Link>
                    <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie?.poster_path}`} alt="Poster Image" />
                </div>

                <div className={styles.background_container}>
                    <div className={styles.background_fade}></div>
                    <img
                        src={`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movie?.backdrop_path}`}
                        className={styles.background_image}
                    />
                    <div className={styles.background_fade_end}></div>
                </div>

                <div className={styles.content}>
                    <h1>{movie?.title} {`(${new Date(movie?.release_date as string).toLocaleDateString('pt-BR', {year: 'numeric'})})`}</h1>

                    <div className={styles.genre_list}>
                        {movie?.genres.map(genre => (
                            <span>{genre.name}</span>
                        ))}
                    </div>


                    <p>Avaliação dos usuários    : <span>{movie?.vote_average.toFixed(1)}</span> </p>
                    <p>Quantidade de avaliações: {movie?.vote_count}</p>

                    <h3>{movie?.tagline}</h3>

                    <div className={styles.overview}>

                        <div className={styles.average}></div>

                        <h2>Sinopse</h2>
                        <p>{movie?.overview}</p>
                    </div>
                </div>

            </div>

            <div className={styles.body_container}>
                    <section className={styles.cast_section}>
                        <h1>Elenco</h1>
                        <div className={styles.cast_container}>
                            {cast?.cast.map(person => (
                                <div className={styles.cast_card} key={person.id}>
                                    <img src={`https://www.themoviedb.org/t/p/w138_and_h175_face${person.profile_path}`} alt="Elenco" />
                                    <h2>{person.name}</h2>
                                    <p>{person.character}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className={styles.similar_movies_section}>

                        <h1>Filmes Similares</h1>

                        <div className={styles.similar_movies_container}>

                            {similarMovies?.results.map(similarMovie => (
                                <div className={styles.similar_movies_card} key={similarMovie.id}>
                                    <img src={`https://www.themoviedb.org/t/p/w138_and_h175_face${similarMovie.poster_path}`} alt="Elenco" />
                                    <h2>{similarMovie.title}</h2>
                                    <span>{new Date(similarMovie.release_date).toLocaleDateString('pt-BR')}</span>
                                    <p>Avaliação dos usuários: <span>{similarMovie.vote_average.toFixed(1)}</span></p>
                                    <p>Quantidade de votos: <span>{similarMovie.vote_count}</span></p>
                                </div>
                            ))}
                        </div>
                    </section>
            </div>

            <Footer />
      </div>
    </>
  )
}
