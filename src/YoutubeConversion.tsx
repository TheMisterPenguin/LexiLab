import { Segment, Form, Input, Button } from 'semantic-ui-react'
import {Helmet} from "react-helmet";

import {google} from "googleapis"
import fs from 'fs';



// Créer une instance de l'API YouTube Data v3
const youtube = google.youtube({
    version: 'v3',
    auth: 'AIzaSyCfYS3rzisPDmMRK06xXfSDJCTr4JWb9u4',
});


// Récupérer les sous-titres pour une vidéo
async function getVideoCaptions(videoId: string) {
    try {
      // Appeler l'API YouTube Data v3 pour récupérer les informations de sous-titres
      const captions = await youtube.captions.list({
        part: ['snippet'],
        videoId: videoId,
      });
  
      // Vérifier si la réponse contient au moins un élément dans le tableau `items`
      if (captions.data.items && captions.data.items.length > 0) {
        // Récupérer l'ID de la piste de sous-titres
        const captionsId = captions.data.items[0].id || undefined;
  
        // Appeler l'API YouTube Data v3 pour récupérer le fichier de sous-titres
        const captionsFile = await youtube.captions.download({
          id: captionsId,
          tfmt: 'srt',
        }, { responseType: 'stream' });
  
        // Enregistrer le fichier de sous-titres sur le disque
        const filePath = `captions_${videoId}.srt`;
        const fileStream = fs.createWriteStream(filePath);
        captionsFile.data.pipe(fileStream);
  
        console.log(`Sous-titres enregistrés dans le fichier ${filePath}`);
      } else {
        console.error('Aucun sous-titre trouvé pour cette vidéo.');
      }
    } catch (err) {
      console.error('Une erreur s\'est produite :', err);
    }
  }
  



const YoutubeConversion = () => {
    return (
        <>
            <Helmet>
                <title>Youtube - LexiLab</title>
            </Helmet>

            <Segment>
                <Form>
                    <Form.Field>
                        <label>Saisir votre lien youtube :</label>
                        <Input focus placeholder='URL...' />
                    </Form.Field>
                </Form>

                <Segment basic textAlign="center">
                    <Button primary onClick={(e) => getVideoCaptions('naN9bxUpjHg')}>Extraire</Button>
                </Segment>

            </Segment>
        </>
    )
}

export default YoutubeConversion