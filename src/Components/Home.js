import {useState,useEffect } from "react";
import axios from 'axios';

export default function Home(){
    const [images,setImages] = useState([]);
    let isUser = false;
    if(document.cookie.match(('jwt'))!=null){
        isUser = true;
    }
    useEffect(()=>{
        async function getImages(){
            const {data} = await axios.post(process.env.REACT_APP_BACKEND_URL+'/downloadlabel')
            setImages(data.images);
        }
        getImages();
    },[])
    return (
        <>
        {
            isUser?
            <>
                <h1 className="fw-light">Previous Prediction Results</h1>
                <table className="table table-hover" id="tab">
                <thead className="bg-dark text-white sticky-top">
                    <tr>
                    <th>Image</th>
                    <th className="text-center">Prediction</th>
                    <th className="text-center">Label</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        images!=null?
                        images.map((row)=>
                            <tr key={row._id}>
                                <td><img className="img-thumbnail" src={row.image} alt="input"/></td>
                                <td className="text-center">{row.prediction}</td>
                                <td className="text-center">{row.label?<p className="text-success">Correct</p>:<p className="text-danger">Wrong</p>}</td>
                            </tr>
                        ):null
                    }
                </tbody>
            </table>
            </>
            :
            <></>
        }
        </>
    );
}