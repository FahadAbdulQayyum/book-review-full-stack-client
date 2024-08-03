import { useContext, useEffect, useRef } from 'react'
import BookContext from '../../context/book/bookContext';

const BookFilter = () => {

    const { filterBook, clearFilter, filtered } = useContext(BookContext);

    const text = useRef<HTMLInputElement>(null);


    useEffect(() => {
        if (filtered === null) { }
    }, [])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (text.current && text.current.value !== '') {
            // const value: string = text.current.valueOf()
            // filterBook(value);

            filterBook(text.current.value);
        } else {
            clearFilter();
        }
    }

    return (
        <form>
            <input type="text" ref={text} placeholder='Search Book' onChange={onChange} />
        </form>
    )
}

export default BookFilter
