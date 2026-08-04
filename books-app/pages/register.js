import { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useRouter } from "next/router";

import { registerUser } from "@/lib/authenticate";

export default function Register() {

    const router = useRouter();

    const [userName, setUserName] = useState("");

    const [password, setPassword] = useState("");

    const [password2, setPassword2] = useState("");

    const [warning, setWarning] = useState("");

    async function submitForm(e) {

        e.preventDefault();

        try {

            await registerUser(
                userName,
                password,
                password2
            );

            router.push("/login");

        } catch (err) {

            setWarning(err.message);

        }

    }

    return (

        <Card className="p-4">

            <h2>Register</h2>

            <br />

            {warning &&

                <Alert variant="danger">

                    {warning}

                </Alert>

            }

            <Form onSubmit={submitForm}>

                <Form.Group className="mb-3">

                    <Form.Label>
                        Username
                    </Form.Label>

                    <Form.Control
                        type="text"
                        value={userName}
                        onChange={(e)=>setUserName(e.target.value)}
                        required
                    />

                </Form.Group>

                <Form.Group className="mb-3">

                    <Form.Label>
                        Password
                    </Form.Label>

                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                    />

                </Form.Group>

                <Form.Group className="mb-3">

                    <Form.Label>
                        Confirm Password
                    </Form.Label>

                    <Form.Control
                        type="password"
                        value={password2}
                        onChange={(e)=>setPassword2(e.target.value)}
                        required
                    />

                </Form.Group>

                <Button type="submit">

                    Register

                </Button>

            </Form>

        </Card>

    );

}