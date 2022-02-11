import { Container, Form, Button, Col } from "react-bootstrap"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Google } from "./Google"

export const LoginPage = () => {

    const navigate = useNavigate()

    const [login, setLogin] = useState({
        email: "",
        password: ""
    })

    const handleInput = (fields, value) => {
        setLogin(login => login && ({
            ...login,
            [fields]: value,
        }))
    }


    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            let response = await fetch(`http://localhost:3001/users/login`, {
                method: 'POST',
                body: JSON.stringify(login),
                headers: {
                    'content-type': 'application/json'
                }
            })
            if (response.ok) {
                navigate("/")
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Container className="d-flex mt-5">
            <Col>
                <Form onSubmit={handleLogin}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={login.email}
                            onChange={e => { handleInput('email', e.target.value) }} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={login.password}
                            onChange={e => { handleInput("password", e.target.value) }} />
                    </Form.Group>
                    <Button className="mt-2" variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </Col>
            <Col className="mt-2">
                <Google />
            </Col>
        </Container>
    )
}