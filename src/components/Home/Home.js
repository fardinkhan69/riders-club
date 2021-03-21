import React from 'react';
import './Home.css';
import frame from '../images/Frame.png';
import frame1 from '../images/Frame-1.png';
import frame2 from '../images/Frame-2.png';
import frame3 from '../images/Group.png';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Home = () => {

    
    const bike = 'bike';
    const car = 'car';
    const bus = 'bus';
    const train = 'train';
    

    return (
        
        <div className='home-page'>
            <div className="container-fluid " style={{ alignSelf: 'stretch' }}>
                <div className="row card-row">

                    <div className="col-md-3">
                        <Link to={`/destination/${bike}`}>
                            <div className="card-box">
                                <Card style={{ width: '18rem',marginRight:'10px',padding:'40px' }}>
                                <Card.Img variant="top" src={frame} />
                                <Card.Body>
                                    <Card.Title>Bike</Card.Title>
                                    
                                </Card.Body>
                                </Card>
                            </div>
                        </Link>
                    
                    </div>
                    
                    <div className="col-md-3">
                    <Link to={`/destination/${car}`}>
                        <div className="card-box">
                            <Card style={{ width: '18rem',marginRight:'10px',padding:'40px' }}>
                            <Card.Img variant="top" src={frame2} />
                            <Card.Body>
                                <Card.Title>Car</Card.Title>
                                
                            </Card.Body>
                            </Card>
                        </div>
                    </Link>
                    </div>
                   
                    <div className="col-md-3">
                    <Link to={`/destination/${bus}`}>
                        <div className="card-box">
                            <Card style={{ width: '18rem',marginRight:'10px',padding:'40px' }}>
                            <Card.Img variant="top" src={frame1} />
                            <Card.Body>
                                <Card.Title>Bus</Card.Title>
                                
                            </Card.Body>
                            </Card>
                        </div>
                    </Link>
                    </div>
                   
                
                    <div className="col-md-3">
                    <Link to={`/destination/${train}`}>
                        <div className="card-box">
                            <Card style={{ width: '18rem',marginRight:'10px',padding:'40px' }}>
                            <Card.Img variant="top" src={frame3} />
                            <Card.Body>
                                <Card.Title>Train</Card.Title>
                                
                            </Card.Body>
                            </Card>
                        </div>
                    </Link>
                    </div>
                    
                    
                    
                   
                </div>
            </div>
        </div>
    );
};

export default Home;