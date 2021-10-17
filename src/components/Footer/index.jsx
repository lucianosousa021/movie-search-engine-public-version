import styles from '../../styles/Footer.module.scss'

export function Footer(){
    return(
        <footer className={styles.footer_bar}>

            <div className={styles.footer_content}>

                <div>
                    <h2>Sobre</h2>
                    <br />
                    <p>Esse site foi desenvolvido unica e exclusivamente com a finalidade de <strong>estudo</strong>.</p>
                    <br />
                    <p>Para essa experiência, usei o NextJS e a api da <a href="https://www.themoviedb.org/" rel="rel=noopener" target="_blank"><strong>The Movie Data Base</strong></a>.</p>
                    <br />
                    <p>O projeto está no meu <a href="https://github.com/lucianosousa021/movie-search-engine-public-version" rel="rel=noopener" target="_blank"><strong>GitHub</strong></a>.</p>

                </div>

            </div>

            <div className={styles.footer_copyright}>
                <p>Desenvolvido por: <a href="https://lucianosousa021.netlify.app/" rel="rel=noopener" target="_blank"> <strong>Luciano Sousa - 2021</strong> </a></p>
            </div>

        </footer>
    )
}