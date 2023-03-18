import {Segment, Grid, Form, Input, Button, Card, Icon, Image, Container, Header,  Dimmer, Loader} from 'semantic-ui-react'
import {Helmet} from "react-helmet";
import {useEffect, useState} from "react";



function MovieConversion() {

    const [movieData, setMovieData] = useState({
        inputMovie: '',
        resultMovie: '',
        language: '',
        rating: '',
        age: '',
        image: '',
        subTitle: ''
    });

    //A chaque fois que l'utilisateur modifie le contenu de l'input
    const InputChange = (event: { target: { value: any; }; }) => {
        setMovieData({...movieData, inputMovie: event.target.value});
        //console.log(movieData.inputMovie);
    }
    
  
    const fetchMovieConversion = async () => {

        const api = "5fYLrNmowziPVwKwhYS7TjE8goD4E7IU";
    
        const enTete= new Headers({
            "Access-Control-Request-Headers": "X_PINGOTHER, Content-Type",
            "Content-Type": "text/plain, application/x-www-form-urlencoded, charset=UTF-8",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "vary": "Accept-Encoding",
            "Accept-encoding": "gzip, deflate, br",       
        });
        enTete.append("api-key", api);

        var nomFilm = (movieData.inputMovie); //Récupère le titre du film

        //-------------------------Requête de soustitre-------------------------
        var requete = new Request("https://api.opensubtitles.com/api/v1/subtitles?query="+nomFilm, {
            method: 'GET',
            headers: enTete,
        });
        var reponse = await fetch(requete);
        var donnee = await reponse.json();

        //Premier caractère du film en majuscule
        var st = movieData.inputMovie;
        nomFilm = movieData.inputMovie.charAt(0).toUpperCase() + st.slice(1);

        var compteur = 1;

        //Parcours des données
        for(const res of donnee.data){
            if(res.attributes.ratings > "7.0" && res.attributes.ratings < "9" && compteur == 1){
                var idFilm = res.id;

                var note = res.attributes.ratings;

                compteur = compteur -1;

                var langue = res.attributes.language.toUpperCase();

                //Annee de sortie
                var annee = res.attributes.feature_details.year;

                //Lien de l'image
                for(const lien of res.attributes.related_links){
                    var lienImage = lien.img_url;
                }

                //Parcours le files pour obtenir le file_id de film
                for(const file of res.attributes.files){
                    var idFile = file.file_id;
                }
            }
        }

        //-------------------------Requête de téléchargement-------------------------
        requete = new Request("https://api.opensubtitles.com/api/v1/download?file_id="+idFile, {
            method: 'POST',
            headers: enTete
        });

        reponse = await fetch(requete);

        var files = await reponse.json();
            
        var lien;
        lien = files.link;

        //Obtenir le texte du sous-titre
        donnee = await fetch(lien);

        var sousTitre = await donnee.text();

        var result = '';

        // Extraire le texte
        const regexBalise = new RegExp('<\/?i>', 'g');
        const regexChiffre = new RegExp('\\d{2}:\\d{2}:\\d{2},\\d{3} --> \\d{2}:\\d{2}:\\d{2},\\d{3}\\n(.*?)\\n', 'g');
        const pointsDeb = new RegExp('/^\s*\.{3}/');
        const pointFin = new RegExp('/(\s*\.{3})\s*$/');

        compteur = 0;
        let texteChiffre;
        while(texteChiffre = regexChiffre.exec(sousTitre)){
            result += texteChiffre[1].replace(regexBalise, '').replace(pointsDeb, '').replace(pointFin, '');
            //console.log(texteChiffre[1].replace(regexBalise, '').replace(pointsDeb, '').replace(pointFin, ''));    
            compteur++;
        }

        //Enregistrement des données
        setMovieData({
            ...movieData,
            resultMovie: nomFilm,
            language: langue,
            rating: note,
            age: annee,
            image: lienImage,
            subTitle: result
        });

    };

    return (
        <>
            <Helmet>
                <title>Movie - LexiLab</title>
            </Helmet>

            {movieData.resultMovie &&
                <Grid columns={4}>
                    <Grid.Column>
                        <Segment basic textAlign="center">
                            <Card>
                                <Image src={movieData.image} wrapped ui={false} />
                                <Card.Content>
                                    <Card.Header>{movieData.resultMovie}</Card.Header>
                                    <Card.Meta>
                                        <span className='date'>{movieData.age}</span>
                                    </Card.Meta>
                                    <Card.Description>
                                        {movieData.language}
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <a>
                                        <Icon name='edit' />
                                        {movieData.rating}
                                    </a>
                                </Card.Content>
                            </Card>
                        </Segment>
                    </Grid.Column>

                    <Grid.Column>
                        <Segment basic textAlign="center">
                            <Container text>
                                <Header as='h2'>Subtitle</Header>
                                <p>{movieData.subTitle}</p>
                            </Container>
                        </Segment>
                    </Grid.Column>
                </Grid>
            }

            <Segment>
                <Form>
                    <Form.Field>
                        <label>Saisir votre film :</label>
                        <Input value={movieData.inputMovie} onChange={InputChange} placeholder='Rechercher...' />
                    </Form.Field>
                </Form>

                <Segment basic textAlign="center">
                    <Button primary onClick={() => {fetchMovieConversion();}}>Extraire</Button>
                </Segment>
            </Segment>

        </>
    )
}

export default MovieConversion;