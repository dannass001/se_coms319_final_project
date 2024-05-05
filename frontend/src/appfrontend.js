import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import "./styles/vgReviews.css";
// import "./styles/bootstrap.bundle.min.js";
// import "./styles/bootstrap.bundle.min.js.map";
import "./styles/bootstrap.min.css";
import "./styles/bootstrap.min.css.map";
import "./styles/bootstrap.rtl.min.css";
import "./styles/bootstrap.rtl.min.css.map";
import "./styles/color-modes.js";

function App(){
    const Homepage  = () => {
    
        const navigate = useNavigate();

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
        useEffect(() => {
            fetch("http://localhost:8081/reviews")
            .then((response) => response.json())
            .then((data) => {
                setReviews(data);
            });
        }, []);

        const [games, setGames] = useState([]);
        useEffect(() => {
            fetch("http://localhost:8081/games")
            .then((response) => response.json())
            .then((data) => {
                setGames(data);
            });
        }, []);

            console.log(reviews);

            for(let i = 0; i < reviews.length; i++){
                if(reviews[i].rating > topGame.rating) {

                    secondGame.rating = topGame.rating;
                    secondGame.title = topGame.title;
                    secondGame.review = topGame.review;

                    topGame.rating = reviews[i].rating;
                    topGame.title = reviews[i].game_title;
                    topGame.review = reviews[i].review;

                } else if(reviews[i].rating > secondGame.rating) {

                    secondGame.rating = reviews[i].rating;
                    secondGame.title = reviews[i].game_title;
                    secondGame.review = reviews[i].review;

                }
            }

            console.log(topGame);
            console.log(secondGame);

            // fetch("./games.json")
            // .then(response => response.json())
            // .then(games => getImages(games));

        // function getImages(games) {

        //     for (let i=0; i<games.gamesList.length; i++) {

        //         let title = games.gamesList[i].title;
        //         let image = games.gamesList[i].imageUrl;
        
        //         if (title = topGame.title) {
        //             imageTop = image;
        //         }

        //         if (title = secondGame.title) {
        //             imageSecond = image;
        //         }
        //     }
        // }

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

        return (
            <div>
                {/* Buttons to show CRUD */}
                <header>
                    <div class="navbar navbar-dark bg-primary box-shadow">
                        <button class="bg-dark rounded p-2 m-3 text-white" onClick={() => navigate('/Home')}>Home</button>
                        <button class="bg-dark rounded p-2 m-3 text-white" onClick={() => navigate('/Games')}>Games</button>
                        <button class="bg-dark rounded p-2 m-3 text-white" onClick={() => navigate('/About')}>About</button>
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
            </div>
        );
    }

    const ViewGames = () => {

        const navigate = useNavigate();

        const [games, setGames] = useState([]);
        useEffect(() => {
            fetch("http://localhost:8081/games")
            .then((response) => response.json())
            .then((data) => {
                setGames(data);
            });
        }, []);

        // fetch("./games.json")
        //     .then(response => response.json())
        //     .then(games => getImages(games));

        // function getImages(games) {

        //     for (let i=0; i<games.gamesList.length; i++) {

        //         let title = games.gamesList[i].title;
        //         let image = games.gamesList[i].imageUrl;
        
        //         if (title = topGame.title) {
        //             imageTop = image;
        //         }

        //         if (title = secondGame.title) {
        //             imageSecond = image;
        //         }
        //     }
        // }
        
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

        return (
            <div>
                {/* Buttons to show CRUD */}
                <header>
                    <div class="navbar navbar-dark bg-primary box-shadow">
                        <button class="bg-dark rounded p-2 m-3 text-white" onClick={() => navigate('/Home')}>Home</button>
                        <button class="bg-dark rounded p-2 m-3 text-white" onClick={() => navigate('/Games')}>Games</button>
                        <button class="bg-dark rounded p-2 m-3 text-white" onClick={() => navigate('/About')}>About</button>
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
            </div>
        );

    }

    const GameReviews = () => {
        //this page has buttons to viewgames, addreview, editreview and has the button to delete
        // Define hooks
        /*const [reviews, setReviews] = useState([]);
        const navigate = useNavigate();
        // useEffect to load products when load page
        useEffect(() => {
            fetch("http://localhost:8081/fakestore")
            .then((response) => response.json())
            .then((data) => {
            console.log("Show Catalog of Reviews :", data);
            setReviews(data);
            });
        }, []);
            
        return (<div>
            <button onClick={() => navigate('/Homepage')}>GET Catalog</button>
            <button onClick={() => navigate('/getcatalogid')}>GET Item by Id</button>
            <button onClick={() => navigate('/AddReview')}>POST a new Item</button>
            <button onClick={() => navigate('/AboutPage')}>PUT (modify) an Item</button>
            <button onClick={() => navigate('/deletecatalog')}>DELETE an Item</button>
            {products.map((el) => (
            <div key={el.id}>
            <img src={el.image} width={30} />
            <div>Title: {el.title}</div>
            <div>Category: {el.category}</div>
            <div>Price: {el.price}</div>
            <div>Rating: {el.rating.rate}</div>
            </div>
            ))}

        </div>);*/
    }

    const AddReview = () => {
        // Define HOOKS
        const navigate = useNavigate();
        const [formData, setFormData] = useState({
            id: 21,
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
            <button onClick={() => navigate('/GameReviews')}>Back</button>
            <form onSubmit={handleSubmit}>
            <h1>Post a New Review</h1>
            <input type="text" name="game_title" value={formData.game_title} onChange={handleChange} placeholder="Game" required /> <br />
            <input type="text" name="rating" value={formData.rating} onChange={handleChange} placeholder="Rating ?/10" required /> <br />
            <input type="text" name="review" value={formData.review} onChange={handleChange} placeholder="Review" required /> <br />
            <button type="submit">Submit</button>
            </form>
        </div>);
    }

    const EditReview = () => {
        // Define HOOKS
        /*const navigate = useNavigate();
        const [formData, setFormData] = useState({
            id: '',
            title: '',
            price: '',
            description: '',
            category: '',
            image: '',
            rating: {
                rate: '',
                count: 1
            }
        });
        // Function to add input in formData HOOK using operator ...
        const handleChange = (e) => {
            const { name, value } = e.target;
            if(name != "rating"){
                setFormData(prevState => ({
                    ...prevState,
                    [name]: value
                }));
            }else{
                setFormData(prevState => ({
                    ...prevState,
                    [name]: {
                        rate: value,
                        count: 1
                    }
                }));
            }
        };
            
        // Function to fetch backend for POST - it sends data in BODY
        const handleSubmit = (e) => {
            e.preventDefault();
            //console.log(e.target.value);
            const id = formData.id;
            fetch("http://localhost:8081/fakestore/" + id, {
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
        //needs to return view to game reviews after editing
        return(<div>
            <button onClick={() => navigate('/getcatalog')}>GET Catalog</button>
            <button onClick={() => navigate('/getcatalogid')}>GET Item by Id</button>
            <button onClick={() => navigate('/postcatalog')}>POST a new Item</button>
            <button onClick={() => navigate('/putcatalog')}>PUT (modify) an Item</button>
            <button onClick={() => navigate('/deletecatalog')}>DELETE an Item</button>
            <form onSubmit={handleSubmit}>
            <h1>Update a Product</h1>
            <input type="text" name="id" value={formData.id} onChange={handleChange} placeholder="ID" required /> <br />
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required /> <br />
            <input type="text" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required /> <br />
            <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" required /> <br />
            <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" required /> <br />
            <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" required /> <br />
            <input type="text" name="rating" value={formData.rating.rate} onChange={handleChange} placeholder="Rating" required /> <br />
            <button type="submit">Submit</button>
            </form>
        </div>);*/
    }

    const AboutPage = () => {

    }
    return (
        <Router>
            <Routes>
                <Route path="/Homepage" element={<Homepage />} />
                <Route path="/ViewGames" element={<ViewGames />} />
                <Route path="/GameReviews" element={<GameReviews />} />
                <Route path="/AddReview" element={<AddReview />} />
                <Route path="/EditReview" element={<EditReview />} />
                <Route path="/AboutPage" element={<AboutPage />} />
                <Route path="/" element={<Homepage />} /> {/* Default view */}
            </Routes>
        </Router>
    );
}

export default App;