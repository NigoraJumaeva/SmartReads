import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { isAuthenticated } from "@/lib/authenticate";


export default function RouteGuard(props) {

    const router = useRouter();

    const [authorized, setAuthorized] = useState(false);


    useEffect(() => {

        const authCheck = () => {

            const loggedIn = !props.auth || isAuthenticated();

            setAuthorized(loggedIn);

            if (!loggedIn) {

                router.push("/login");

            }

        };


        authCheck();


        const hideContent = () => {

            setAuthorized(false);

        };


        router.events.on(
            "routeChangeStart",
            hideContent
        );


        router.events.on(
            "routeChangeComplete",
            authCheck
        );


        return () => {

            router.events.off(
                "routeChangeStart",
                hideContent
            );


            router.events.off(
                "routeChangeComplete",
                authCheck
            );

        };


    }, [router, props.auth]);


    return (

        authorized && props.children

    );

}