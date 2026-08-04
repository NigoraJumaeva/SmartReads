import { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useRouter } from "next/router";
import { useAtom } from "jotai";

import { authenticateUser } from "@/lib/authenticate";
import { getFavourites } from "@/lib/userData";
import { favouritesAtom } from "@/store";

export default function Login() {

    const router = useRouter();

    const [userName, setUserName] = useState("");

    const [password, setPassword] = useState("");

    const [warning, setWarning] = useState("");

    const [, setFavouritesList] = useAtom(favouritesAtom);

    async function updateAtom() {

        setFavouritesList(
            await getFavourites()
        );

    }

    async function submitForm(e) {

        e.preventDefault();

        try {

            await authenticateUser(
                userName,
                password
            );

            await updateAtom();

            router.push("/");

        } catch (err) {

            setWarning(err.message);

        }

    }

    return (

        <Card className="p-4">

            <h2>Login</h2>

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

                <Button type="submit">

                    Login

                </Button>

            </Form>

        </Card>

    );

}