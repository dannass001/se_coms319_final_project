import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import "./styles/vgReviews.css";

function App(){
    const [currentGame, setCurrentGame] = useState();
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
            <div class="col-md-3 text-white rounded" key={el.id}>
                    <br/>
                    <div class="card mb-4 box-shadow p-3 bg-light">
                        <img class="card-img-top" style={{height:400}} src={el.image} alt="Card image cap"/>
                        <div class="card-body">
                            <div class="row text-muted"><strong>{el.title}</strong></div>
                            <div class="row text-success lead fw-normal">Year: {el.year}</div>
                        </div>
                    </div>
                </div>
        ));

        return (<div>
                <header>
                    <div class="navbar navbar-dark bg-primary box-shadow">
                        <button class="bg-dark rounded p-2 m-3 text-white" onClick={() => navigate('/Homepage')}>Home</button>
                        <button class="bg-dark rounded p-2 m-3 text-white" onClick={() => navigate('/ViewGames')}>Games</button>
                        <button class="bg-dark rounded p-2 m-3 text-white" onClick={() => navigate('/Aboutpage')}>About</button>
                        {/* <button class="bg-dark rounded p-2 m-3 text-white" onClick={() => navigate('/putcatalog')}>PUT (modify) an Item</button>
                        <button class="bg-dark rounded p-2 m-3 text-white" onClick={() => navigate('/deletecatalog')}>DELETE an Item</button>
                        <button class="bg-dark rounded p-2 m-3 text-white" onClick={() => navigate('/StudentInfo')}>Student Info</button> */}
                    </div>
                </header>
                <div class="bg-white">
                    <div class="album py-5">
                        <div class="row">
                        <p>{topGame.title}: {topGame.rating}</p>
                        <img src={topGame.image}></img>
                        <p>{topGame.review}</p>
                        </div>
                        <div class="row">
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
            <div class="col-md-3 text-white rounded" key={el.id}>
                    <br/>
                    <div class="card mb-4 box-shadow p-3 bg-light">
                        <button onClick={() => ChangeGame(el.title)}>
                            <img class="card-img-top" style={{height:400}} src={el.image} alt="Card image cap"/>
                        </button>
                        <div class="card-body">
                            <div class="row text-muted"><strong>{el.title}</strong></div>
                            <div class="row text-success lead fw-normal">Year: {el.year}</div>
                        </div>
                    </div>
                </div>
        ));

        return (
            <div>
                {/* Buttons to show CRUD */}
                <header>
                    <div class="navbar navbar-dark bg-primary box-shadow">
                        <button class="bg-dark rounded p-2 m-3 text-white" onClick={() => navigate('/Homepage')}>Home</button>
                        <button class="bg-dark rounded p-2 m-3 text-white" onClick={() => navigate('/ViewGames')}>Games</button>
                        <button class="bg-dark rounded p-2 m-3 text-white" onClick={() => navigate('/Aboutpage')}>About</button>
                        {/* <button class="bg-dark rounded p-2 m-3 text-white" onClick={() => navigate('/putcatalog')}>PUT (modify) an Item</button>
                        <button class="bg-dark rounded p-2 m-3 text-white" onClick={() => navigate('/deletecatalog')}>DELETE an Item</button>
                        <button class="bg-dark rounded p-2 m-3 text-white" onClick={() => navigate('/StudentInfo')}>Student Info</button> */}
                    </div>
                </header>
                {/* Show all products using map */}
                <div class="bg-white">
                    <div class="album py-5">
                        <div class="row">{listGames}</div>
                    </div>
                </div>
            </div>);
    }

    const GameReviews = () => {
        const navigate = useNavigate();
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
        return(<div>
            <button onClick={() => navigate('/Homepage')}>Home</button>
            <button onClick={() => navigate('/ViewGames')}>Games</button>
            <button onClick={() => navigate('/Aboutpage')}>About</button>
            <p>{currentGame}</p>
        </div>)
    }

    const AddReview = () => {
        // Define HOOKS
        const navigate = useNavigate();
        const [formData, setFormData] = useState({
            id: '',
            game_title: '',
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
            <button onClick={() => navigate('/Homepage')}>Back</button>
            <form onSubmit={handleSubmit}>
            <h1>Post a New Review</h1>
            <input type="text" name="id" value={formData.id} onChange={handleChange} placeholder="ID" required /> <br />
            <input type="text" name="game_title" value={formData.game_title} onChange={handleChange} placeholder="Game" required /> <br />
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