import { Fragment } from "react/jsx-runtime";
import spinner from "../../assets/spinner.gif";

const Spinner = () => {
    return (
        <Fragment>
            <img src={spinner}
                style={{ width: '200px', margin: 'auto', display: 'block' }}
                alt='Loading...'
            />
        </Fragment>
    )
}

export default Spinner
