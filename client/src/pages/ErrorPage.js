import NavBar from "./NavBar";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
    const error=useRouteError();
    console.log(error);

    return (
        <>
        <header>
            <NavBar />
        </header>
        <main className='landing-homepage'>
            <div className='homepage-words'>
                <h1>Whoops! Something went wrong!</h1>
            </div>
        </main>
        </>
    );
};

export default ErrorPage;