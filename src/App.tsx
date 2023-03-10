import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { Header, Grid, Divider, Segment, Button, Container, Form, Input, Dropdown, Select, Icon, Image } from "semantic-ui-react";
import TextConversion from "./TextConversion";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import PDFConversion from "./PDFConversion";
import logo from "./assets/logo_2.svg";
import MovieConversion from "./MovieConversion";
import YoutubeConversion from "./YoutubeConversion";
import { Helmet } from "react-helmet";

/*Type qui peut prendre uniquement les chaines de caractères "text" "youtube" "movie" et "pdf"*/
type buttonCategory = "text" | "youtube" | "movie" | "pdf";

function getSelectedCategory(): buttonCategory | undefined {
	const location = window.location.pathname;
	if (location.startsWith("/text")) return "text";
	if (location.startsWith("/youtube")) return "youtube";
	if (location.startsWith("/film-serie")) return "movie";
	if (location.startsWith("/pdf")) return "pdf";
}

function App() {
	const [category, setCategory] = useState<buttonCategory | undefined>();

	useEffect(() => {
		setCategory(getSelectedCategory());
	}, []);

	const navigate = useNavigate();
	return (
		<>
			<Helmet>
				<title>LexiLab</title>
			</Helmet>
			<Grid>
				<Grid.Row />
				<Grid.Row />
				<Grid.Row />
				<Grid.Row>
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
						<Button.Group widths={4}>
							<Button
								size="big"
								active={category === "text"}
								onClick={() => {
									setCategory("text");
									navigate("/texte");
								}}>
								<Icon name="keyboard outline" /> Texte
							</Button>
							<Button
								size="big"
								active={category === "youtube"}
								onClick={() => {
									setCategory("youtube");
									navigate("/youtube");
								}}>
								<Icon name="youtube" /> Lien YouTube
							</Button>
							<Button
								size="big"
								active={category === "movie"}
								onClick={() => {
									setCategory("movie");
									navigate("/film-serie");
								}}>
								<Icon name="film" /> Film / Série
							</Button>
							<Button
								size="big"
								active={category === "pdf"}
								onClick={() => {
									setCategory("pdf");
									navigate("/pdf");
								}}>
								<Icon name="file pdf outline" /> Document PDF
							</Button>
						</Button.Group>

					</Grid.Column>
					<Grid.Column width={2} />
				</Grid.Row>
				<Grid.Row textAlign="center">
					<Grid.Column width={1} />
					<Grid.Column width={14} textAlign="center">
						<Routes>
							<Route path="texte" element={<TextConversion />} />
							<Route path="youtube" element={<YoutubeConversion />} />
							<Route path="film-serie" element={<MovieConversion />} />
							<Route path="pdf" element={<PDFConversion />} />
						</Routes>
					</Grid.Column>
					<Grid.Column width={1} />
				</Grid.Row>
			</Grid>
		</>
	);
}

export default App;
