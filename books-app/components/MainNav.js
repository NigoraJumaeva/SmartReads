import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import {
  Container,
  Nav,
  Navbar
} from "react-bootstrap";

import {
  isAuthenticated,
  removeToken
} from "@/lib/authenticate";

export default function MainNav() {

  const router = useRouter();

  const [auth, setAuth] = useState(false);


  useEffect(() => {

    setAuth(isAuthenticated());

  }, []);


  function logout() {

    removeToken();

    setAuth(false);

    router.push("/");

  }


  return (
    <>

      <Navbar
        expand="lg"
        className="fixed-top navbar-dark bg-dark"
      >

        <Container>


         <Navbar.Brand href="/">
         Nigora Jumaeva
         </Navbar.Brand>


          <Navbar.Toggle aria-controls="basic-navbar-nav" />


          <Navbar.Collapse id="basic-navbar-nav">


            <Nav className="me-auto">


             <Nav.Link href="/about">
                 About
             </Nav.Link>


             <Nav.Link href="/favourites">
                 Favourites
             </Nav.Link>


            </Nav>


            <Nav>


              {
                auth ?

                <Nav.Link
                  onClick={logout}
                  style={{cursor:"pointer"}}
                >
                  Logout
                </Nav.Link>

                :

                <>

                 <Nav.Link href="/login">
                     Login
                 </Nav.Link>


                 <Nav.Link href="/register">
                      Register
                 </Nav.Link>

                </>

              }


            </Nav>


          </Navbar.Collapse>


        </Container>


      </Navbar>


      <br />
      <br />


    </>
  );

}