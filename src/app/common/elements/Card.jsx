const Card = ({children}) => {
    return(
        <article className="bg-light-bg1 dark:bg-dark-bg1 rounded-lg w-full h-full">
            {children}
        </article>
    )
}

export default Card;