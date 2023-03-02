import { Segment, Form, Input, Button } from 'semantic-ui-react'
import {Helmet} from "react-helmet";


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
                    <Button primary>Extraire</Button>
                </Segment>

            </Segment>
        </>
    )
}

export default YoutubeConversion