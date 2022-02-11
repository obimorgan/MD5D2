import { Button } from "react-bootstrap"
import { Link } from 'react-router-dom'

export const Google = () => {

    // const handleGoogle = async () => {
    //     let response = fetch(`http://localhost:3001/googleLogin`)

    // }

    return (
        <>
            <a href="http://localhost:3001/users/googleLogin">
                <Button className="success"
                // onClick={handleGoogle()}
                > SignIn with google</Button >
            </a>
        </>
    )
}