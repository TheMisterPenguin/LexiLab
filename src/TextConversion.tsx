import { Segment, TextArea, Form, Button } from "semantic-ui-react"
import {Helmet} from "react-helmet";

const TextConversion = () => {
    return (
        <>
            <Helmet>
				<title>Texte - LexiLab</title>
			</Helmet>
            <Segment>
                <Form>
                <Form.Field>
                    <label>Saisir votre texte :</label>
                    <TextArea rows={10}></TextArea>
                </Form.Field>
                </Form>
                <Segment basic textAlign="center">
                    <Button primary>Extraire</Button>
                </Segment>
            </Segment>
        </>
    )
}

export default TextConversion