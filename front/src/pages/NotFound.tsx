import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className="flex text-center flex-1 m-auto justify-center items-center w-full" style={{ height: '100vh' }}>
            <p className="text-gray-700 font-thin">
                Not Found.
                <Link className="ml-2" to={'/'}>Back to home</Link>
            </p>
        </div>
    )
}

export default NotFound