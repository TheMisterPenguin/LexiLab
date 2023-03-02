import {Segment, Form, Input, Button} from 'semantic-ui-react'
import {Helmet} from "react-helmet";

//import axios from "axios";
//import { useEffect, useState } from 'react';

function rechercherFilm(){
    alert("ouiii")
}

const MovieConversion = () => {
    /*const [content, setContent] = useState([]);

    const fetchMovieConversion = async () => {
        const { data } = await axios.get(
            `https://api.opensubtitles.com/api/v1/subtitles?api_key=${process.env.REACT_APP_API_KEY}`
        );

        console.log(data);

        setContent(data.results);
    };

    useEffect(() => {
        fetchMovieConversion
    }, [])*/

    return (
        <>
            <Helmet>
                <title>Films / Séries - LexiLab</title>
            </Helmet>

            <Segment>
                <Form>
                    <Form.Field>
                        <label>Saisir votre film :</label>
                        <Input focus placeholder='Rechercher...' />
                    </Form.Field>
                </Form>

                <Segment basic textAlign="center">
                    <Button primary onClick={rechercherFilm}>Extraire</Button>
                </Segment>

            </Segment>
        </>
    )
}

export default MovieConversion