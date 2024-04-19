import { Link } from "react-router-dom";

function App() {
    return (
        <div>
            <h1>Firebase Example</h1>
            <p>
                <Link to="/authentication">Authentication</Link>
            </p>
            <p>
                <Link to="/database">Realtime Database</Link>
            </p>
            <p>
                <Link to="/storage">Cloud Storage</Link>
            </p>
        </div>
    );
}

export default App;
