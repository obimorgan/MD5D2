import { Button } from "react-bootstrap"

export const Google = () => {

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