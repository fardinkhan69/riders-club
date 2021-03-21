import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FakeData from '../FakeData/FakeData';
import './Destination.css';
import mapImage from '../images/Map.png';
import personImg from '../images/peopleicon.png'
import GoogleMap from '../Map/GoogleMap';


const Destination = () => {

    const {transport} = useParams();
    console.log(transport)
    const [fakeData,setFakeData] = useState([]);

    const [transportData,setTransportData] = useState(false);


    useEffect(()=>{
        
        const getFakeData = FakeData;
        // console.log(getFakeData)
        const sellectData = getFakeData.filter(data => data.type === transport);
        setFakeData(sellectData);
        

    },[])
    console.log(fakeData);
    const handleDestinationSubmit = (e)=>{
        e.preventDefault();
        setTransportData(true);
    }

    


    return (
        <div>
            <div className="row container">
                <div className="col-md-4">
                    <div className="destion-form-container">
                        {!transportData && <form onSubmit={handleDestinationSubmit}>
                            <div className="mb-3">
                                <label htmlFor="pick_from" className="form-label">Pick From</label>
                                <input type="text"  name="from" required className="form-control" id="pick_from" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="pick_to" className="form-label">Pick To</label>
                                <input type="text"  name="to" required className="form-control" id="pick_to" />
                            </div>
                            
                            
                            <button onClick={handleDestinationSubmit} className="btn btn-primary search-btn">Search</button>
                        </form> }
                        <div className="info-box">
                        {transportData &&
                        <div className="row mt-5 container">
                        <div className="col-md-12 headline">
                            <h3>Mirpur 1 to</h3>
                            <h3>Dhanmondi</h3>

                        </div>
                        { fakeData.length > 0 && fakeData.map(data => {
                            return(
                                <div className="container small-info-box">
                                <div className="row">
                                    <div className="col-md-4">
                                        <img className='transport-img img-fluid' src={data.image} alt=""/>
                                    </div>
                                    <div className="col-md-6">
                                        <span className='pr-3'>{data.type}</span>
                                        <span><img className='person-img img-fluid' src={personImg} />  {data.seat}</span>
                                    </div>
                                    <div className="col-md-2">
                                        <p>{'$' +data.price}</p>
                                    </div>
                                </div>
                            
                            </div>
                            )
                        })
                            
                        }
                        
                        </div>
                        }
                        </div>

                        

                        
                    </div>
                </div>

                <div className="col-md-8 map-side">
                    
                    <GoogleMap></GoogleMap>
                </div>
            </div>
        </div>
    );
};

export default Destination;