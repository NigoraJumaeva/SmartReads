import { useEffect, useState } from "react";

import { Row, Col } from "react-bootstrap";

import { getFavourites } from "@/lib/userData";

import { isAuthenticated } from "@/lib/authenticate";

import PageHeader from "@/components/PageHeader";

import BookCard from "@/components/BookCard";

import RouteGuard from "@/components/RouteGuard";


export default function Favourites() {

    const [favouritesList, setFavouritesList] = useState([]);

    const [authenticated, setAuthenticated] = useState(false);

    const [checkedAuth, setCheckedAuth] = useState(false);


    useEffect(() => {

    async function loadFavourites() {

        const auth = isAuthenticated();

        setAuthenticated(auth);

        setCheckedAuth(true);

        if (auth) {

            const data = await getFavourites();

            setFavouritesList(data);

        }

    }

    loadFavourites();

}, []);



if (!checkedAuth) {

    return null;

}


if (!authenticated) {

    return (

        <PageHeader
            text="Favourites"
            subtext="Please login to view favourites"
        />

    );

}



    if (favouritesList.length === 0) {

        return (

            <PageHeader
                text="Nothing Here"
                subtext="Add a book to your favourites"
            />

        );

    }



    return (
    <RouteGuard auth>
        <>

            <PageHeader
                text="Favourites"
                subtext="Your Favourite Books"
            />


            <Row className="gy-4">

                {
                    favouritesList.map(

                        workId => (

                            <Col
                                lg={3}
                                md={6}
                                key={workId}
                            >

                                <BookCard
                                    workId={workId}
                                />

                            </Col>

                        )

                    )
                }


            </Row>


        </>
    </RouteGuard>


    );


}