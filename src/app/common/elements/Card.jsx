const Card = ({children}) => {
    return(
        <article className="bg-bg1 dark:bg-dark-bg1 rounded-lg w-full h-full">
            {children}
        </article>
    )
}

export default Card;