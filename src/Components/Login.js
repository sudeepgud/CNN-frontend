import './Login.css';
import {useState} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function Login(){
    const Navigate = useNavigate();
    const [log,setLog] = useState({
        email:"",
        pass:""
    });
    const handleSubmit = async(event)=>{
        event.preventDefault();
        try{
            const {data} = await axios.post(process.env.REACT_APP_BACKEND_URL+'/login',{...log})
            if(data.email){
                document.getElementById('emailred').innerHTML = data.email;
            }
            if(data.pass){
                document.getElementById('passred').innerHTML = data.pass;
            }
            if(data.status === "Login"){
                let {token} = data;
                localStorage.setItem('jwt',token);
                Navigate('/');
            }
        }catch(err){
            console.log(err);
        }
    }
    return( 
    <>
    <div className="container-fluid">
        <div className="row justify-content-evenly log-welcome rounded">
            <div className="col-4">
                <div className="m-4">
                    <h1>Welcome to <span style={{color:"rgb(255, 0, 128)"}}>Our Site</span></h1>
                    <center>
                        <p className="fw-light">Login to Access our Services</p>
                    </center>
                </div>
            </div>
            <form className="col-4 m-4 rounded border bg-light" onSubmit={(e)=>handleSubmit(e)}>
                <div className="m-4">
                <label className="fw-bold">E-mail :</label>
                <input type="email" className="form-control" id="Username" placeholder="Enter E-mail..." onChange={(e)=>setLog({...log,email:e.target.value})}/>
                <p id="emailred" className="outred fs-6 fw-lighter"></p>
                <label className="fw-bold">Password :</label>
                <input type="password" className="form-control" id="Password" placeholder="Enter password..." onChange={(e)=>setLog({...log,pass:e.target.value})}/>
                <p id="passred" className="outred fs-6 fw-lighter"></p>
                <div className="d-flex justify-content-end">
                    <p className="h6 fw-lighter">Don't have an Account?<Link className="log-link fw-lighter" to="/signup"> Sign Up</Link></p>
                </div>
                <div className="d-flex justify-content-end">
                    <button className="btn log-button" type="submit">Login</button>
                </div>
                </div>
            </form>
        </div>
    </div>
    </>);
}