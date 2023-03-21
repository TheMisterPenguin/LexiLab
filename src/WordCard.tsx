import { Button, Card } from 'semantic-ui-react';
import WordCardProps from './types/WordCardTypes';

function WordCard(props : WordCardProps) {
    const { word } = props;

    return (<Card>
        <Card.Content>
            <Card.Header>{word.mot}</Card.Header>
            <Card.Meta>{word.type}</Card.Meta>
            <Card.Description>
                <p>{word.niveau}</p>
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button primary>Enregistrer</Button>
        </Card.Content>
    </Card>);
}

export default WordCard;
