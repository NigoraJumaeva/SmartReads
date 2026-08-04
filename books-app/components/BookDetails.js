import { Container, Row, Col, Button } from 'react-bootstrap';

import { useState, useEffect } from 'react';

import {
    getFavourites,
    addToFavourites,
    removeFromFavourites
} from '@/lib/userData';

import { isAuthenticated } from "@/lib/authenticate";


export default function BookDetails({
    book,
    workId,
    showFavouriteBtn = true
}) {

    const [showAdded, setShowAdded] = useState(false);


    useEffect(() => {

        async function loadFavourites() {

            if (!isAuthenticated()) {
                return;
            }

            try {

                const favourites = await getFavourites();

                setShowAdded(
                    favourites.includes(workId)
                );

            } catch (err) {

                console.log(
                    "Unable to load favourites",
                    err
                );

            }

        }


        loadFavourites();


    }, [workId]);



    async function favouritesClicked() {


        if (!isAuthenticated()) {

            alert("Please login to add favourites.");

            return;

        }


        try {


            if (showAdded) {


                await removeFromFavourites(workId);

                setShowAdded(false);


            } else {


                await addToFavourites(workId);

                setShowAdded(true);


            }


        } catch(err) {

            console.log(err);

        }

    }


    return (
        <Container>
            <Row>

                {/* left column (image) */}
                <Col lg="4">

                    <img
                        onError={(event) => {
                            event.target.onerror = null;
                            event.target.src =
                                'https://placehold.co/400x600?text=Cover+Not+Available';
                        }}
                        className="img-fluid w-100"
                        src={`https://covers.openlibrary.org/b/id/${book?.covers?.[0]}-L.jpg`}
                        alt="Cover Image"
                    />

                    <br />
                    <br />

                </Col>


                {/* right column (details) */}
                <Col lg="8">

                    {/* title */}
                    <h3>{book?.title}</h3>


                    {/* description */}
                    {book?.description && (
                        <p>
                            {
                                typeof book.description === 'string'
                                ? book.description
                                : book.description.value
                            }
                        </p>
                    )}


                    <br />


                    {/* characters */}
                    {book?.subject_people && (
                        <>
                            <h5>Characters</h5>

                            {book.subject_people.join(', ')}

                            <br />
                            <br />
                        </>
                    )}


                    {/* settings */}
                    {book?.subject_places && (
                        <>
                            <h5>Settings</h5>

                            {book.subject_places.join(', ')}

                            <br />
                            <br />
                        </>
                    )}


                    {/* links */}
                    {book?.links && (
                        <>
                            <h5>More Information</h5>

                            {book.links.map((link, index) => (
                                <span key={index}>

                                    <a
                                        href={link.url}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {link.title}
                                    </a>

                                    <br />

                                </span>
                            ))}

                        </>
                    )}



                    {/* Favourite Button */}
                    {showFavouriteBtn && (

                        <Button
                            variant={
                                showAdded
                                ? "primary"
                                : "outline-primary"
                            }
                            onClick={favouritesClicked}
                        >

                            {
                                showAdded
                                ? "+ Favourite (added)"
                                : "+ Favourite"
                            }

                        </Button>

                    )}


                </Col>

            </Row>
        </Container>
    );
}