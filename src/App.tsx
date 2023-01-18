import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {Header, Grid, Divider, Segment, Button, Container, Form, Input, Dropdown, Select} from 'semantic-ui-react';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Grid>
      <Grid.Row/>
      <Grid.Column width={2}/>
      <Grid.Column width={12}>
        <Container textAlign='center'>
      <Header  size="huge">Bonjour,</Header>
      <Header size='large'>Je veux :</Header>
        </Container>

      <Segment basic>
        <Segment basic padded>
            <Grid columns={2} relaxed stackable>
              <Grid.Column>
                <Form>
                  <Form.Field>
                    <label>Texte, Vidéo, Document ...</label>
                    <Input>
                      <Select fluid options={[]}></Select>
                    </Input>
                  </Form.Field>
                </Form>
              </Grid.Column>
              <Grid.Column>
                <Form>
                  <Form.Field>
                    <label>Mon niveau est :</label>
                    <Input>
                      <Select defaultValue={"unknowed"} fluid options={[{key : "unknowed", text :"Je ne connais pas mon niveau", value : "unknowed"}]}></Select>
                    </Input>
                  </Form.Field>
                </Form>
              </Grid.Column>
            </Grid>
            <Divider vertical>ET</Divider>
        </Segment>
        <Container textAlign='center'>
          <Button color='green'>C'est parti</Button>
        </Container>
      </Segment>
      </Grid.Column>
      <Grid.Column width={2}/>
      </Grid>
    </>
  )
}

export default App
