import {useState, useEffect} from "react";
import { Segment, Form, Input, Button, Image, Grid,Loader } from 'semantic-ui-react';
import {Helmet} from "react-helmet";
import ExtractWordGrid from "./ExtractWordGrid";


/**
 * récupère l'id de la vidéo youtube grâce à son lien
 * @param url le lien de la vidéo youtube
 * @returns null si le lien n'est pas valide, sinon l'id de la vidéo
 */
function getVideoId(url : string) {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/|v\/)?([^\s&]+)/;
    const match = url.match(regex);
    if (match && match[1])
      return match[1];
    else
      return null;
}

/**
 * obtient les mots de la vidéo youtube avec leur niveau et leur type
 * @param id l'id de la vidéo youtube
 * @returns null si la requête n'a pas abouti, sinon les mots de la vidéo
 */
async function getExtractedWords(id : string) {
    const res = await fetch(`http://${import.meta.env.VITE_SERVER_URL}/api/parseYoutubeVideo`, {
        headers: {"Content-Type": "text/plain",},
        body: id,
        method: "POST",
    })

    if(res.status !== 200) // si la requête n'a pas abouti
        return null;
    else
        return res.json();
}


const YoutubeConversion = () => {
    const [url, setUrl] = useState<string>("");
    const [videoId, setVideoId] = useState<string | null>(null);
    const [thumbnail, setThumbnail] = useState<string | null>(null);
    const [urlError, setUrlError] = useState('');
    const [fetching, setFetching] = useState(false);
    const [words, setWords] = useState<{mot: string, niveau: string, type: string, traduction: string}[]>([]);

    useEffect(() => {
        if (videoId != null)
            setThumbnail(`https://img.youtube.com/vi/${videoId}/0.jpg`);
        else
            setThumbnail(null);
    }, [videoId]);

    const updateUrl = (e: any) => {
        setUrl(e.target.value);
        setUrlError('');
    }

    function extractVideo(){
        setFetching(true);
        const videoId = getVideoId(url);
        setVideoId(videoId);

        if (videoId == null){
            setUrlError("URL invalide ou non supportée !");
            setFetching(false);
        }
        else
            getExtractedWords(videoId).then((res) => {
                if(res === null)
                    setUrlError("URL invalide ou non supportée !");
                else{
                    setWords(res);
                }
                setFetching(false);
            });
    }

    return (
        <>
            <Helmet>
                <title>Youtube - LexiLab</title>
            </Helmet>
            <Segment>
                <Grid columns={videoId === null ? 1 : 2}>  
                    <Grid.Row verticalAlign="middle">
                        {videoId === null ? <></> : <Grid.Column width={7}>
                        <Image  src={thumbnail} width={300}  />
                        </Grid.Column>}
                        <Grid.Column>
                            <Form>
                                <Form.Field>
                                    <label>Saisir votre lien youtube :</label>
                                    <Input onChange={updateUrl} focus placeholder='Colle le lien de la vidéo ici...' error={urlError !== ''}/>
                                    {urlError !== '' && (
                                        <div className='ui pointing red basic label'>
                                            {urlError}
                                        </div>
                                    )}
                                </Form.Field>
                                <Segment basic>
                                    <Button loading={fetching} disabled={fetching} onClick={() => extractVideo()} primary>Extraire</Button>
                                </Segment>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
            {words.length === 0 ? <></> :
                <ExtractWordGrid props={words as any} />
            }   
        </>
    )
}

export default YoutubeConversion;