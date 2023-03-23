import { useEffect, useState } from "react";
import { Header, Grid, Divider, Segment, Button, Container, Form, Input, Dropdown, Select, Icon, Image } from "semantic-ui-react";
import TextConversion from "./TextConversion";
import {  Route, Routes, useLocation, useNavigate  } from "react-router-dom";
import PDFConversion from "./PDFConversion";
import logo from "./assets/logo_2.svg";
import MovieConversion from "./MovieConversion";
import YoutubeConversion from "./YoutubeConversion";
import { Helmet } from "react-helmet";
import Login from "./Login";
import "./App.css";

/*Type qui peut prendre uniquement les chaines de caractères "text" "youtube" "movie" et "pdf"*/
type buttonCategory = "text" | "youtube" | "movie" | "pdf";

function getSelectedCategory(): buttonCategory | undefined {
	const location = window.location.pathname;
	if (location.startsWith("/text")) return "text";
	if (location.startsWith("/youtube")) return "youtube";
	if (location.startsWith("/film-serie")) return "movie";
	if (location.startsWith("/pdf")) return "pdf";
}

function handleHomeClick() {
  window.scrollTo(0, 0);
}

function App() {
	const [category, setCategory] = useState<buttonCategory | undefined>();
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	
	const [activeItem,setactiveItem]=useState("home")
  	const handleItemClick = (e: any, { name }: any) => {
		if(name === "home") handleHomeClick();
		if(name === "liste") handleLoginClick();
		setactiveItem(name)
	}

  	const handleLoginClick = () => {
    	setIsLoginOpen(true);
  	};

  	const handleLoginClose = () => {
    	setIsLoginOpen(false);
  	};

	useEffect(() => {
		setCategory(getSelectedCategory());
	}, []);

	const navigate = useNavigate();
	return (
		<>
			<Grid>
				<Helmet>
					<title>LexiLab</title>
				</Helmet>
				<Grid.Row />
				<Grid.Row />
				<Grid.Row columns={2}>
					<Grid.Column width={1} />
					<Grid.Column width={8}>
    					<Menu icon='labeled' fixed="top" stackable vertical style={{ marginTop: "6em", marginLeft: "15em" }}>
							<Menu.Item
							name='home'
							active={activeItem === 'home'}
							onClick={handleItemClick}
							>
							<Icon name='home' />
							Home
							</Menu.Item>
							<Menu.Item
							name='liste'
							active={activeItem === 'liste'}
							onClick={handleItemClick}
							>
							<Icon name='list' />
							Liste
							</Menu.Item>
						</Menu>
					</Grid.Column>
					<Grid.Column width={7}>
						<Button floated="right" style={{ backgroundColor: "#FFB155", color: "white" }} onClick={handleLoginClick}>
							Se connecter
						</Button>
						<Login isOpen={isLoginOpen} onClose={handleLoginClose} />
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
				</Grid.Row>
				<Grid.Row >
					<Image centered src={logo} size="medium" wrapped />
				</Grid.Row>
				<Grid.Row>
					<Grid.Column width={2} />
					<Grid.Column width={12}>
					<Header textAlign="center">Votre laboratoire d'anglais personnalisé</Header>
					</Grid.Column>
					<Grid.Column width={2} />
				</Grid.Row>
				<Grid.Row />
				<Grid.Row />
				<Grid.Row>
					<Grid.Column width={2} />
					<Grid.Column width={12}>
					<Header as="h2" textAlign="left">Extraire du vocabulaire :</Header>
					</Grid.Column>
					<Grid.Column width={2} />
				</Grid.Row>
				<Grid.Row>
					<Grid.Column width={2} />
					<Grid.Column width={12}>
					<Button.Group widths={4} className="category-buttons">
						<Button
							size="big"
							active={category === "text"}
							onClick={() => {
								setCategory("text");
								navigate("/texte");
							}}>
							<Icon name="keyboard outline" /> <span className="button-text">Texte</span>
						</Button>
							<Button
								size="big"
								active={category === "youtube"}
								onClick={() => {
									setCategory("youtube");
									navigate("/youtube");
								}}>
								<Icon name="youtube" /> <span className="button-text">Lien YouTube</span>
							</Button>
							<Button
								size="big"
								active={category === "movie"}
								onClick={() => {
									setCategory("movie");
									navigate("/film-serie");
								}}>
								<Icon name="film" /> <span className="button-text">Film / Série</span>
							</Button>
							<Button
								size="big"
								active={category === "pdf"}
								onClick={() => {
									setCategory("pdf");
									navigate("/pdf");
								}}>
								<Icon name="file pdf outline" /> <span className="button-text">Document PDF</span>
							</Button>
						</Button.Group>

					</Grid.Column>
					<Grid.Column width={2} />
				</Grid.Row>
				<Grid.Row textAlign="center">
					<Grid.Column width={2} />
					<Grid.Column width={12} textAlign="center">
						<Routes>
							<Route path="texte" element={<TextConversion />} />
							<Route path="youtube" element={<YoutubeConversion />} />
							<Route path="film-serie" element={<MovieConversion />} />
							<Route path="pdf" element={<PDFConversion />} />
						</Routes>
					</Grid.Column>
					<Grid.Column width={2} />
				</Grid.Row>
			</Grid>
		</>
	);
}

export default App;
