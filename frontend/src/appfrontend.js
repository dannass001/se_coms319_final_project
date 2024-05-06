import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

// Bootstrap styling imports
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/js/bootstrap.bundle.js.map";
import "./styles/vgReviews.css";
import "./styles/bootstrap.min.css";


function App(){
    const [currentGame, setCurrentGame] = useState("Minecraft");
    const Homepage  = () => {
        const navigate = useNavigate();
        //get code from midterm
        let topGame = {
            title: '',
            rating: 0,
            image: '',
            review: ''
        };

        let secondGame = {
            title: '',
            rating: 0,
            image: '',
            review: ''
        };
        const [reviews, setReviews] = useState([]);
        const [games, setGames] = useState([]);
        useEffect(() => {
            fetch("http://localhost:8081/reviews")
            .then((response) => response.json())
            .then((data) => {
                setReviews(data);
            });
            fetch("http://localhost:8080/games")
            .then((response) => response.json())
            .then((data) => {
                setGames(data);
            });
        }, []);
        for(let i = 0; i < reviews.length; i++){
            if(reviews[i].rating > topGame.rating){
                secondGame.rating = topGame.rating;
                secondGame.title = topGame.title;
                secondGame.review = topGame.review;
                topGame.rating = reviews[i].rating;
                topGame.title = reviews[i].game_title;
                topGame.review = reviews[i].review;
            }else if(reviews[i].rating > secondGame.rating){
                secondGame.rating = reviews[i].rating;
                secondGame.title = reviews[i].game_title;
                secondGame.review = reviews[i].review;
            }
        }
        for (let i = 0; i < games.length; i++){
            var title = games[i].title;
            var image = games[i].imageUrl;
    
            if(title == topGame.title){
                topGame.image = image;
            }else if(title == secondGame.title){
                secondGame.image = image;
            }
        }

        const listGames = games.map((el) => (
            // GAMES
            <div className="col-md-3 text-white rounded" key={el.id}>
                    <br/>
                    <div className="card mb-4 box-shadow p-3 bg-container">
                        <img className="card-img-top" style={{height:400}} src={el.image} alt="Card image cap"/>
                        <div className="card-body">
                            <div className="row text-muted"><strong>{el.title}</strong></div>
                            <div className="row text-success lead fw-normal">Year: {el.year}</div>
                        </div>
                    </div>
                </div>
        ));

        return (
            <div style={{backgroundImage: "url('./myotherimages/carbon.jpg')"}}>
                <link rel="canonical" href="https://getbootstrap.com/docs/5.3/examples/carousel/"></link>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@docsearch/css@3"/>
                <header data-bs-theme="dark d-flex flex-wrap justify-content-right py-3 mb-4 border-bottom">
                    <nav className="bg-dark navbar navbar-expand-md navbar-dark fixed-top justify-content-center">
                        <div className="container-fluid">
                        <a href="/" className="navbar-brand align-items-center">Video Game Reviews</a>
                            <ul className="nav nav-pills me-auto mb-2 mb-md-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page"  onClick={() => navigate('/Homepage')}>Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => navigate('/ViewGames')}>Games</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => navigate('/Aboutpage')}>About</a>
                            </li>
                            </ul>
                        </div>
                    </nav>
                </header>

                <main>
                    <div id="myCarousel" className="carousel slide mb-6" data-bs-ride="carousel" style={{background: "#450000"}}>
                        <div className="carousel-indicators">
                        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        </div>
                        <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img id="img1" className="bd-placeholder-img" src={topGame.image}/>
                            <div className="container">
                                <div className="carousel-caption text-end" style={{color: "aliceblue"}}>
                                    <h1>Top Review #1</h1>
                                    <h2>{topGame.title}, Rating: {topGame.rating}</h2>
                                    <h3>{topGame.review}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img id="img2" className="bd-placeholder-img" src={secondGame.image}/>
                            <div className="container">
                            <div className="carousel-caption text-end" style={{color: "aliceblue"}}>
                                <h1>Top Review #2</h1>
                                <h2>{secondGame.title}, Rating: {secondGame.rating}</h2>
                                <h3>{secondGame.review}</h3>
                            </div>
                            </div>
                        </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                        </button>
                    </div>

                {/* <!-- Featurettes ============================================================= -->
                <!-- Wrap the rest of the page in another container to center all the content. --> */}

                <div className="container marketing bg-container p-5 text-white">

                    {/* <!-- START THE FEATURETTES --> */}

                    <div className="row featurette">
                    <div className="col-md-7">
                        <h2 className="featurette-heading fw-normal lh-1">Welcome to our Video Game Reviews</h2>
                        <p className="lead" style={{padding: "2%"}}>Please enjoy our reviews on our <a style={{color:"blue"}} onClick={() => navigate('/ViewGames')}>Games Page</a>.</p>
                    </div>
                    <div className="col-md-5">
                        <img className="img-fluid" width="100%" height="100%" src={'./myotherimages/gaming.png'} alt=""></img>
                    </div>
                    </div>

                    {/* <!-- /END THE FEATURETTES --> */}
                </div>
                <br/>
                <br/>
                <br/>
                </main>
                <footer className="container bg-footer text-white">
                    <p className="float-end"><a href="#">Back to top</a></p>
                    <p>&copy; Daniel Nass &middot; David Scranton</p>
                </footer>
                
            </div>
        );
    }

    const ViewGames = () => {
        const navigate = useNavigate();
        const [games, setGames] = useState([]);
        useEffect(() => {
            fetch("http://localhost:8080/games")
            .then((response) => response.json())
            .then((data) => {
                setGames(data);
            });
        }, []);

        const ChangeGame = (input) => {
            setCurrentGame(input);
            navigate('/GameReviews');
        }
        const listGames = games.map((el) => (
            // GAMES
            <div className="col-3 text-white" key={el.id}>
                    <br/>
                    <div className="mb-4 box-shadow p-3 bg-container" key={el.id}>
                        <button onClick={() => ChangeGame(el.title)}>
                            <img className="card-img-top" style={{height:400}} src={el.imageUrl} alt="Card image cap"/>
                        </button>
                        <div className="card-body">
                            <div className="row text-white lead fw-normal"><strong>{el.title} <br/> Year: {el.year}</strong></div>
                        </div>
                    </div>
                </div>
        ));

        return (
            <div style={{backgroundImage: "url('./myotherimages/carbon.jpg')"}}>
                {/* Buttons to show CRUD */}
                <header data-bs-theme="dark d-flex flex-wrap justify-content-right py-3 mb-4 border-bottom">
                    <nav className="bg-dark navbar navbar-expand-md navbar-dark fixed-top justify-content-center">
                        <div className="container-fluid">
                        <a href="/" className="navbar-brand align-items-center">Video Game Reviews</a>
                            <ul className="nav nav-pills me-auto mb-2 mb-md-0">
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => navigate('/Homepage')}>Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" onClick={() => navigate('/ViewGames')}>Games</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => navigate('/Aboutpage')}>About</a>
                            </li>
                            </ul>
                        </div>
                    </nav>
                </header>
                {/* Show all products using map */}
                <div>
                    <div className="album py-5" style={{backgroundImage: "url('myotherimages/carbon.jpg')"}}>
                        <div className="row">{listGames}</div>
                    </div>
                </div>

                <footer className="container bg-footer text-white">
                    <p className="float-end"><a href="#">Back to top</a></p>
                    <p>&copy; Daniel Nass &middot; David Scranton</p>
                </footer>
            </div>);
    }

    const GameReviews = () => {
        const navigate = useNavigate();
        const [reviews, setReviews] = useState([]);
        const [games, setGames] = useState([]); 
        useEffect(() => {
            fetch("http://localhost:8081/reviews/" + currentGame)
            .then((response) => response.json())
            .then((data) => {
                setReviews(data);
            });
            fetch("http://localhost:8080/games/" + currentGame)
            .then((response) => response.json())
            .then((data) => {
                setGames(data);
            });
        }, []);

        const addLike = (id, likes) => {
            let formData = {
                "likes": likes + 1,
            }
            fetch("http://localhost:8081/reviews/" + id, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })
            .then(response => {
                if (response.status != 200){
                    return response.json()
                    .then(errData =>{
                    throw new Error(`PUT response was not ok :\n Status:${response.status}. \n Error: ${errData.error}`);
                    })
                }
                return response.json();
            })
            .then(data => {
            console.log(data);
            alert("Item changed successfully!");
            })
            .catch(error => {
                console.error('Error changing item:', error);
                alert('Error changing product:'+error.message); // Display alert if there's an error
            });
        }

        const deleteReview = (id) => {
            fetch("http://localhost:8081/reviews/" + id, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({"id":id}),
            })
            .then(response => {
            if (response.status != 200){
                return response.json()
                .then(errData =>{
                throw new Error(`POST response was not ok :\n Status:${response.status}. \n Error: ${errData.error}`);
                })
            }
            return response.json();})
            .then((data) => {
                console.log("Delete a product completed : ", id);
                console.log(data);
                // reload products from the local products array
                // show alert
                if (data) {
                    const key = Object.keys(data);
                    const value = Object.values(data);
                    alert(key+value);
                }
            })
            .catch(error => {
                console.error('Error adding item:', error);
                alert('Error adding product:'+error.message); // Display alert if there's an error
            });
        }

        const listReviews = reviews.map((el) => (
            // GAMES
            <div className="col-md-3 m-3 text-white rounded" key={el.id}>
                    <br/>
                    <div className="card mb-4 box-shadow p-3 bg-container bg-primary">
                        <div className="card-body">
                            <div className="row text-dark"><strong>{el.game_title}: {el.rating}/10</strong></div>
                            <div className="row text-white"><em>{el.review}</em></div>
                            <div className="d-flex flex-row-reverse">
                                <button className="m-1 rounded bg-white" onClick={() => deleteReview(el.id)}>Delete</button>
                                <button className="m-1 rounded bg-white" onClick={() => addLike(el.id, el.likes)}>{el.likes}</button>
                            </div>
                        </div>
                    </div>
                </div>
        ));
        return(<div style={{backgroundImage: "url('myotherimages/carbon.jpg')"}}>
            {/* Buttons to show CRUD */}
            <header data-bs-theme="dark d-flex flex-wrap justify-content-right py-3 mb-4 border-bottom">
                    <nav className="bg-dark navbar navbar-expand-md navbar-dark fixed-top justify-content-center">
                        <div className="container-fluid">
                        <a href="/" className="navbar-brand align-items-center">Video Game Reviews</a>
                            <ul className="nav nav-pills me-auto mb-2 mb-md-0">
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => navigate('/Homepage')}>Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" onClick={() => navigate('/ViewGames')}>Games</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => navigate('/Aboutpage')}>About</a>
                            </li>
                            </ul>
                        </div>
                    </nav>
                </header>

                {/* Show all products using map */}
                <div className="d-flex flex-row-reverse mt-2">
                    <button className="bg-success text-white p-3 m-2 rounded" onClick={() => navigate('/AddReview')}>Add New Game Review <strong>+</strong></button>
                </div>
                <div>
                    <div className="album py-5">
                        <div className="row">{listReviews}</div>
                    </div>
                </div>
                <footer className="container bg-footer text-white">
                    <p className="float-end"><a href="#">Back to top</a></p>
                    <p>&copy; Daniel Nass &middot; David Scranton</p>
                </footer>
        </div>)
    }

    const AddReview = () => {
        // Define HOOKS
        const navigate = useNavigate();
        const [formData, setFormData] = useState({
            id: '',
            game_title: currentGame,
            review: '',
            likes: 0,
            rating: '',
            comments: ''
        });
        const [reviews, setReviews] = useState([]);
        useEffect(() => {
            fetch("http://localhost:8081/reviews")
            .then((response) => response.json())
            .then((data) => {
                setReviews(data);
            });
        }, []);
        // Function to add input in formData HOOK using operator ...
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        };
            
        // Function to fetch backend for POST - it sends data in BODY
        const handleSubmit = (e) => {
            e.preventDefault();
            console.log(e.target.value);
            fetch("http://localhost:8081/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })
            .then(response => {
                if (response.status != 200){
                    return response.json()
                    .then(errData =>{
                    throw new Error(`POST response was not ok :\n Status:${response.status}. \n Error: ${errData.error}`);
                    })
                }
                return response.json();
            })
            .then(data => {
            console.log(data);
            alert("Review added successfully!");
            })
            .catch(error => {
                console.error('Error adding item:', error);
                alert('Error adding review:'+error.message); // Display alert if there's an error
            });
        }
        return(
            <div style={{backgroundImage: "url('myotherimages/carbon.jpg')"}}>
                <header data-bs-theme="dark d-flex flex-wrap justify-content-right py-3 mb-4 border-bottom">
                    <nav className="bg-dark navbar navbar-expand-md navbar-dark fixed-top justify-content-center">
                        <div className="container-fluid">
                        <a href="/" className="navbar-brand align-items-center">Video Game Reviews</a>
                            <ul className="nav nav-pills me-auto mb-2 mb-md-0">
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => navigate('/Homepage')}>Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" onClick={() => navigate('/ViewGames')}>Games</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => navigate('/Aboutpage')}>About</a>
                            </li>
                            </ul>
                        </div>
                    </nav>
                </header>
                <main>
                <div>
                    <br/>
                <button className="btn btn-light mb-2 p-2 m-3" onClick={() => navigate('/GameReviews')}>Back</button>
                <section className="py-5 text-center container text-white">
                    <div className="row bg-container py-lg-5">
                        <div className="col-lg-6 col-md-8 mx-auto">
                            <form onSubmit={handleSubmit}>
                                <h1 className="text-white">Post a New Review</h1>
                                <br/>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="id" value={formData.id} onChange={handleChange} placeholder="id" required />
                                    <small id="idHelp" className="form-text text-white">Please enter a review id. Don't reuse any other id numbers.</small>
                                </div>
                                <br/>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="rating" value={formData.rating} onChange={handleChange} placeholder="Rating ?/10" required />
                                    <small id="ratingHelp" className="form-text text-white">Please enter your numeral from 1-10 of the game here.</small>
                                </div>
                                <br/>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="review" value={formData.review} onChange={handleChange} placeholder="Review" required />
                                    <small id="reviewHelp" className="form-text text-white">Please enter review of the game here.</small>
                                </div>
                                <br/>
                                <button className="btn btn-success mb-2" type="submit">Submit Review</button>
                            </form>
                        </div>
                    </div>
                </section>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <footer className="container bg-footer text-white">
                        <p className="float-end"><a href="#">Back to top</a></p>
                        <p>&copy; Daniel Nass &middot; David Scranton</p>
                    </footer>
                    </main>
            </div>
        );
    }

    const Aboutpage = () => {
        const navigate = useNavigate();
        return(
            <div style={{backgroundImage: "url('myotherimages/carbon.jpg')"}}>
                <header data-bs-theme="dark d-flex flex-wrap justify-content-right py-3 mb-4 border-bottom">
                    <nav className="bg-dark navbar navbar-expand-md navbar-dark fixed-top justify-content-center">
                        <div className="container-fluid">
                        <a href="/" className="navbar-brand align-items-center">Video Game Reviews</a>
                            <ul className="nav nav-pills me-auto mb-2 mb-md-0">
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => navigate('/Homepage')}>Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => navigate('/ViewGames')}>Games</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" onClick={() => navigate('/Aboutpage')}>About</a>
                            </li>
                            </ul>
                        </div>
                    </nav>
                </header>

                <main className="bg-main">

                <section className="py-5 text-center container text-white">
                    <div className="row py-lg-5">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1>About</h1>
                        <h2 className="fw-light">SE/ComS319 Construction of User Interfaces, Spring 2024</h2>
                    </div>
                    </div>
                </section>

                    <div className="container marketing">

                        {/* <!-- START THE FEATURETTES --> */}

                        <hr className="featurette-divider" style={{color:"white"}}/>

                        <div className="row featurette bg-container">
                        <div className="col-md-7 text-white">
                            <h2 className="featurette-heading fw-normal lh-1"><span className="text-body-">Daniel Nass</span></h2>
                            <p className="lead">drnass@iastate.edu</p>
                        </div>
                        <div className="col-md-5">
                            <img src="myotherimages/dan.png"/>
                        </div>
                        </div>

                        <hr className="featurette-divider" style={{color:"white"}}/>

                        <div className="row featurette bg-container">
                        <div className="col-md-7 order-md-2 text-white">
                            <h2 className="featurette-heading fw-normal lh-1"><span className="text-body-">David Scranton</span></h2>
                            <p className="lead">dscranto@iastate.edu</p>
                        </div>
                        <div className="col-md-5 order-md-1">
                            <img src="myotherimages/davey.jpeg"/>
                        </div>
                        </div>

                        <hr className="featurette-divider" style={{color:"white"}}/>

                        <div className="row featurette bg-container">
                        <div className="col-md-7 text-white">
                            <h2 className="featurette-heading fw-normal lh-1"><span className="text-body-">SE/COMS319 Construction of User Interfaces, Spring 2024</span></h2>
                            <p className="lead">5/5/24</p>
                            <p className="lead">Dr.Abraham N. Aldaco Gastelum, aaldaco@iastate.edu</p>
                            <p className="lead">Dr.Ali Jannesari, jannesar@iastate.edu</p>
                        </div>
                        <div className="col-md-5">
                            
                        </div>
                        </div>

                        <hr className="featurette-divider" style={{color:"white"}}/>

                        {/* <!-- /END THE FEATURETTES --> */}

                    </div>


                    {/* <!-- FOOTER --> */}
                    <footer className="container bg-footer text-white">
                        <p className="float-end"><a href="#">Back to top</a></p>
                        <p>&copy; Daniel Nass &middot; David Scranton</p>
                    </footer>
                </main>
            </div>
        );
    }
    return (
        <Router>
            <Routes>
                <Route path="/Homepage" element={<Homepage />} />
                <Route path="/ViewGames" element={<ViewGames />} />
                <Route path="/GameReviews" element={<GameReviews />} />
                <Route path="/AddReview" element={<AddReview />} />
                <Route path="/Aboutpage" element={<Aboutpage />} />
                <Route path="/" element={<Homepage />} /> {/* Default view */}
            </Routes>
        </Router>
    );
}

export default App;