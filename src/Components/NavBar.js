import {Link,useNavigate,Outlet} from 'react-router-dom';
import './NavBar.css';

export default function NavBar(){
    const Navigate = useNavigate();
    let isUser = false;
    if(localStorage.getItem('jwt')!=null){
        isUser = true;
    }
    function LogOut(e){
        localStorage.removeItem('jwt');
        Navigate('/');
    }
    return(
        <>
        <nav className="navbar navbar-expand-md bg-gradient shadow-lg p-0">
            <div className="container navbar-brand">
                <Link className="nav-link link-light" to="">SiteName</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#NavDrop">
                <span className="navbar-toggler-icon"></span>
                </button>
            </div>
            {
                isUser?
                <div className="collapse navbar-collapse justify-content-end" id="NavDrop">
                <button className="btn p-1" onClick={e=>LogOut(e)}><span className="nav-link">Log Out</span></button>
                <button className="btn p-1"><Link className="nav-link" to="/predict">Predict</Link></button>
                </div>
                :
                <div className="collapse navbar-collapse justify-content-end" id="NavDrop">
                <button className="btn p-1"><Link className="nav-link" to="/login">Log In</Link></button>
                <button className="btn p-1"><Link className="nav-link" to="/signup">Sign Up</Link></button>
                </div>
            }
        </nav>
        <Outlet/>
        </>
    )
}