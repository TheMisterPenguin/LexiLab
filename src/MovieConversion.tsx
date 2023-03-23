import { Segment, Grid, Form, Input, Button, Card, Icon, Image, Container, Header, Dimmer, Loader } from 'semantic-ui-react'
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react"

type Movie = {
    id: number;
    rating: number;
    age: number;
    title: string;
    image: string;
    idFile: number;
};

type MovieData = {
    inputMovie: string;
    movieResults: Movie[];
};

/*function sousTitre(id: number) {
    const [idFile, setIdFile] = useState<number>(0);

    setIdFile(id);

    console.log(idFile);
    return <p>ID de fichier sélectionné : {idFile}</p>;
}*/

//Fonction qui vérifie si l'image est éxploitable
async function imageValide(url: string){
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    }
    catch (error) {
        return false;
    }
}

function MovieConversion() {
    const [isLoading, setIsLoading] = useState(false);

    const [movieData, setMovieData] = useState<MovieData>({
        inputMovie: "",
        movieResults: [], // Tableau vide pour stocker les résultats des films
    });

    //Récupérer le contenu de l'input
    const InputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setMovieData({ ...movieData, inputMovie: event.target.value });
        //onChange={(e) => {setMovieData({ ...movieData, inputMovie: e.target.value })}}
    };
    
    const fetchMovieConversion = async () => {
        setIsLoading(true);

        const enTete = new Headers({
            "api-key": "5fYLrNmowziPVwKwhYS7TjE8goD4E7IU",
            "Content-Type": "text/plain, application/x-www-form-urlencoded, charset=UTF-8",
            "Accept": "application/json",
            "Accept-encoding": "gzip, deflate, br",
        });

        var nomFilm = (movieData.inputMovie);
        nomFilm = nomFilm.replaceAll(" ", "+");

        var requete = new Request("https://api.opensubtitles.com/api/v1/subtitles?query=" + nomFilm, {
            method: 'GET',
            headers: enTete,
        });
        var reponse = await fetch(requete);
        var donnee = await reponse.json();
        console.log(donnee);

        var tabTemp: Movie[] = []; //Création d'une table temporaire pour récupérer les films

        for (const res of donnee.data) {
            if (res.attributes.related_links != null) {

                var idFilm = res.id;
                var note = res.attributes.ratings;
                var annee = res.attributes.feature_details.year;
                var titre = res.attributes.feature_details.title;
                var lienImage = res.attributes.related_links[0].img_url;
                var idFile = res.attributes.files[0].file_id;

                tabTemp.push({
                    id: idFilm,
                    rating: note,
                    age: annee,
                    title: titre,
                    image: lienImage,
                    idFile: idFile
                });
            }
        }

        //Supprime les objets qui ont les mêmes titres et garder l'objet qui a la plus haute note
        const supprimeRedondance: { [title: string]: Movie } = tabTemp.reduce((nbValeur, valActuel) => {
            if (valActuel.title in nbValeur) {
                if (valActuel.rating > nbValeur[valActuel.title].rating) {
                    nbValeur[valActuel.title] = valActuel;
                }
            }
            else {
                nbValeur[valActuel.title] = valActuel;
            }
            return nbValeur;
        }, {} as { [title: string]: Movie });

        //Vérifie si l'image est exploitable(différents de 404), et ajouter l'objet
        const results: Movie[] = await Promise.all(
            Object.values(supprimeRedondance).map(async movie => {
                const status = await imageValide(movie.image);
                if (status) {
                    return movie;
                }
                return null;
            })
        ).then(movies => movies.filter(movie => movie !== null) as Movie[]);

        //Récupére les résultats
        setMovieData({
            ...movieData,
            movieResults: results // Mettre à jour le tableau avec les résultats des films
        });

        setIsLoading(false);
    }

    const [idFile, setIdFile] = useState<number>(0);
    
    const handleMovie = (id: number) => {
        setIdFile(id);
        console.log(id);
    };

    return (
        <>
            <Helmet>
                <title>Movie - LexiLab</title>
            </Helmet>

            <Segment>
                <Form>
                    <Form.Field>
                        <label>Saisir votre film :</label>
                        <Input value={movieData.inputMovie} onChange={InputChange} placeholder='Rechercher...' />
                    </Form.Field>
                </Form>

                <Segment basic textAlign="center">
                    {isLoading ? (
                        <Loader active inline="centered" />
                    ) : (
                        <Button primary onClick={() => { fetchMovieConversion(); }}>Extraire</Button>
                    )}
                </Segment>
            </Segment>

            <Grid columns={3}>
                {movieData.movieResults.map((movie) => (
                    <Grid.Column key={movie.id}>
                        <Segment basic textAlign="center">
                            <Card value = {idFile} onClick={() => handleMovie(movie.idFile)}>
                                <Image src={movie.image} />
                                <Card.Content>
                                    <Card.Header>{movie.title}</Card.Header>
                                    <Card.Meta>
                                        <span className="date">{movie.age}</span>
                                    </Card.Meta>
                                </Card.Content>
                                <Card.Content extra>
                                    <Icon name="edit" />{movie.rating}
                                </Card.Content>
                            </Card>
                        </Segment>
                    </Grid.Column>
                ))}
            </Grid>
        </>
    )
}

export default MovieConversion;