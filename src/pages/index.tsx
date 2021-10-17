import { useState, useRef } from 'react'
import Link from 'next/link'

import { Footer } from '../components/Footer'
import styles from '../styles/Home.module.scss'

import { api } from '../services/api'


interface MoviesList {
    page: number,
    results: [
      {
        id: number,
        backdrop_path: string,
        original_title: string,
        overview: string,
        poster_path: string,
        release_date: string,
        title: string,
        popularity: number,
        vote_average: number,
        vote_count: number
      }
    ]
}


export default function Home () {

  const [search, setSearch] = useState('')

  const [movies, setMovies] = useState<MoviesList | null>(null)

  const [inputError, setInputError] = useState('')

  const formEl = useRef<HTMLFormElement | null>(null)

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>){
    setSearch(event.target.value)
  }

  async function handleMovies(
    event: React.FormEvent<HTMLFormElement>
    ): Promise<void>{
      event.preventDefault()

      if (search === ''){
        setInputError('Insira o nome de um filme.')
        formEl.current?.reset()
        return
      }

      try{
        const response = await api.get<MoviesList>(`search/movie?api_key=${process.env.API_KEY}&language=${process.env.LANGUAGE}&query=${search}&page=1&include_adult=${process.env.INCLUDE_ADULT}`)

        const moviesList = response.data

        if (moviesList.results.length <= 0) {
          setInputError('Não foi possível localizar nenhum filme com os parâmetros da sua pesquisa.')
          formEl.current?.reset();
          setSearch('')
          return
        }
        setMovies(moviesList)
        formEl.current?.reset();
        setSearch('')
        setInputError('')
      } catch {
        setInputError('Não foi possível localizar nenhum filme com os parâmetros da sua pesquisa.')
      return;
    }
  }
  return (
      <section className={styles.main_section}>

          <h1 className={styles.page_title}>Movie Search Engine</h1>

          <form ref={formEl} className={styles.search_bar} onSubmit={handleMovies}>
            <div>
            <input type="text" className={styles.search_input} placeholder="Pesquise por um filme..." onChange={handleInputChange} />
            <button className={styles.search_btn}>Pesquisar</button>
            </div>
          </form>

            {movies && <p className={styles.search_infos}>Foram encontradas&ensp;<span>{movies.results.length}</span>&ensp;correspondências para a sua pesquisa.</p>}
            {inputError && (
              <div className={styles.error}>
                <span>{inputError}</span>
              </div>
            )}


          <div className={styles.main_content}>

            {movies == null ? '' : movies.results.map(movie => (
              <Link href={`/filme/${movie.id}`} key={movie.id}>
                <a className={styles.card}>
                      <img
                        src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
                      />
                      <h1>{movie.title}</h1>
                      <span>{new Date(movie.release_date).toLocaleDateString('pt-BR')}
                      </span>
                      <p>{movie.overview}</p>
                </a>
              </Link>
            ))}





          </div>

          <Footer />
      </section>
  )
}

