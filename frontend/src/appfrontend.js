import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";

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
                    <div className="card mb-4 box-shadow p-3 bg-light">
                        <img className="card-img-top" style={{height:400}} src={el.image} alt="Card image cap"/>
                        <div className="card-body">
                            <div className="row text-muted"><strong>{el.title}</strong></div>
                            <div className="row text-success lead fw-normal">Year: {el.year}</div>
                        </div>
                    </div>
                </div>
        ));

        return (<div>
                <header>
                    <div className="navbar navbar-dark bg-primary box-shadow">
                        <button className="bg-dark rounded p-2 m-3 text-white" onClick={() => navigate('/Homepage')}>Home</button>
                        <button className="bg-dark rounded p-2 m-3 text-white" onClick={() => navigate('/ViewGames')}>Games</button>
                        <button className="bg-dark rounded p-2 m-3 text-white" onClick={() => navigate('/Aboutpage')}>About</button>
                        {/* <button className="bg-dark rounded p-2 m-3 text-white" onClick={() => navigate('/putcatalog')}>PUT (modify) an Item</button>
                        <button className="bg-dark rounded p-2 m-3 text-white" onClick={() => navigate('/deletecatalog')}>DELETE an Item</button>
                        <button className="bg-dark rounded p-2 m-3 text-white" onClick={() => navigate('/StudentInfo')}>Student Info</button> */}
                    </div>
                </header>

                <div className="bg-white">
                    <div className="album py-5">
                        <div className="row">
                        <p>{topGame.title}: {topGame.rating}</p>
                        <img src={topGame.image}></img>
                        <p>{topGame.review}</p>
                        </div>
                        <div className="row">
                        <p>{secondGame.title}: {secondGame.rating}</p>
                <img src={secondGame.image}></img>
                <p>{secondGame.review}</p>
                        </div>
                    </div>
                </div>
        </div>);
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
            <div className="col-md-3 text-white rounded" key={el.id}>
                    <br/>
                    <div className="card mb-4 box-shadow p-3 bg-light">
                        <button onClick={() => ChangeGame(el.title)}>
                            <img className="card-img-top" style={{height:400}} src={el.image} alt="Card image cap"/>
                        </button>
                        <div className="card-body">
                            <div className="row text-muted"><strong>{el.title}</strong></div>
                            <div className="row text-success lead fw-normal">Year: {el.year}</div>
                        </div>
                    </div>
                </div>
        ));

        return (
            <div>
                {/* Buttons to show CRUD */}
                <header>
                    <div className="navbar navbar-dark bg-primary box-shadow">
                        <button className="bg-dark rounded p-2 m-3 text-white" onClick={() => navigate('/Homepage')}>Home</button>
                        <button className="bg-dark rounded p-2 m-3 text-white" onClick={() => navigate('/ViewGames')}>Games</button>
                        <button className="bg-dark rounded p-2 m-3 text-white" onClick={() => navigate('/Aboutpage')}>About</button>
                        {/* <button className="bg-dark rounded p-2 m-3 text-white" onClick={() => navigate('/putcatalog')}>PUT (modify) an Item</button>
                        <button className="bg-dark rounded p-2 m-3 text-white" onClick={() => navigate('/deletecatalog')}>DELETE an Item</button>
                        <button className="bg-dark rounded p-2 m-3 text-white" onClick={() => navigate('/StudentInfo')}>Student Info</button> */}
                    </div>
                </header>
                {/* Show all products using map */}
                <div className="bg-white">
                    <div className="album py-5">
                        <div className="row">{listGames}</div>
                    </div>
                </div>
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
            <div className="col-md-3 text-white rounded" key={el.id}>
                    <br/>
                    <div className="card mb-4 box-shadow p-3 bg-light">
                        <div className="card-body">
                            <div className="row text-muted"><strong>{el.game_title}</strong></div>
                            <div className="row text-muted"><strong>{el.rating} / 10</strong></div>
                            <div className="row text-success lead fw-normal">{el.review}</div>
                            <button onClick={() => addLike(el.id, el.likes)}>{el.likes}</button>
                            <button onClick={() => deleteReview(el.id)}>Delete</button>
                        </div>
                    </div>
                </div>
        ));
        return(<div>
            {/* Buttons to show CRUD */}
            <header>
                    <div className="navbar navbar-dark bg-primary box-shadow">
                        <button className="bg-dark rounded p-2 m-3 text-white" onClick={() => navigate('/Homepage')}>Home</button>
                        <button className="bg-dark rounded p-2 m-3 text-white" onClick={() => navigate('/ViewGames')}>Games</button>
                        <button className="bg-dark rounded p-2 m-3 text-white" onClick={() => navigate('/Aboutpage')}>About</button>
                        {/* <button className="bg-dark rounded p-2 m-3 text-white" onClick={() => navigate('/putcatalog')}>PUT (modify) an Item</button>
                        <button className="bg-dark rounded p-2 m-3 text-white" onClick={() => navigate('/deletecatalog')}>DELETE an Item</button>
                        <button className="bg-dark rounded p-2 m-3 text-white" onClick={() => navigate('/StudentInfo')}>Student Info</button> */}
                    </div>
                </header>
                {/* Show all products using map */}
                <div className="row">
                    <p>{games.title}, {games.year}</p>
                    <img src={games.imageUrl}></img>
                </div>
                <div>
                    <button onClick={() => navigate('/AddReview')}>Add Review</button>
                </div>
                <div className="bg-white">
                    <div className="album py-5">
                        <div className="row">{listReviews}</div>
                    </div>
                </div>
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
        return(<div>
            <button onClick={() => navigate('/GameReviews')}>Back</button>
            <form onSubmit={handleSubmit}>
            <h1>Post a New Review</h1>
            <input type="text" name="id" value={formData.id} onChange={handleChange} placeholder="ID" required /> <br />
            <input type="text" name="rating" value={formData.rating} onChange={handleChange} placeholder="Rating ?/10" required /> <br />
            <input type="text" name="review" value={formData.review} onChange={handleChange} placeholder="Review" required /> <br />
            <button type="submit">Submit</button>
            </form>
        </div>);
    }

    const Aboutpage = () => {
        const navigate = useNavigate();
        return(<div>
            <button onClick={() => navigate('/Homepage')}>Home</button>
            <button onClick={() => navigate('/ViewGames')}>Games</button>
            <button onClick={() => navigate('/Aboutpage')}>About</button>
        </div>);
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