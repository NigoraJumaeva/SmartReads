/********************************************************************************
* WEB422 – Assignment 3
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Nigora Jumaeva Student ID: 101498244 Date: August 1, 2026
*
********************************************************************************/import PageHeader from "@/components/PageHeader";

import { Form, Button, Row, Col } from "react-bootstrap";

import { useForm } from "react-hook-form";

import { useRouter } from "next/router";
export default function Home() {

    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    function submitForm(data) {

        router.push({
            pathname: "/books",
            query: Object.fromEntries(
                Object.entries(data).filter(([key, value]) => value !== "")
            )
        });

    }

    return (
        <>
            <PageHeader
                text="Book Search"
                subtext="Search the Open Library database"
            />

            <Form onSubmit={handleSubmit(submitForm)}>

                <Row>

                    <Col md={6}>

                        <Form.Group className="mb-3">

                            <Form.Label>Author</Form.Label>

                            <Form.Control

                                type="text"

                                {...register("author", {
                                    required: "Author is required."
                                })}

                                className={errors.author ? "is-invalid" : ""}
                            />

                            <Form.Control.Feedback type="invalid">
                                {errors.author?.message}
                            </Form.Control.Feedback>

                        </Form.Group>

                    </Col>

                    <Col md={6}>

                        <Form.Group className="mb-3">

                            <Form.Label>Title</Form.Label>

                            <Form.Control
                                type="text"
                                {...register("title")}
                            />

                        </Form.Group>

                    </Col>

                </Row>

                <Row>

                    <Col md={6}>

                        <Form.Group className="mb-3">

                            <Form.Label>Subject</Form.Label>

                            <Form.Control
                                type="text"
                                {...register("subject")}
                            />

                        </Form.Group>

                    </Col>

                    <Col md={6}>

                        <Form.Group className="mb-3">

                            <Form.Label>Language</Form.Label>

                            <Form.Control
                                type="text"
                                {...register("language")}
                            />

                        </Form.Group>

                    </Col>

                </Row>

                <Row>

                    <Col md={6}>

                        <Form.Group className="mb-3">

                            <Form.Label>First Publish Year</Form.Label>

                            <Form.Control
                                type="number"
                                {...register("first_publish_year")}
                            />

                        </Form.Group>

                    </Col>

                </Row>

                <Button
                    type="submit"
                    variant="primary"
                >
                    Search
                </Button>

            </Form>

        </>
    );

}