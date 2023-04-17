import { Link } from 'react-router-dom'
function NoPage() {

    return (
        <>
            <div className="text-center">
                <p>No page</p>
                <Link to="/">Back to homepage</Link>
            </div>
        </>
    )
}

export default NoPage
