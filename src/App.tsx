import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {Header, Grid, Divider, Segment, Button, Container, Form, Input, Dropdown, Select, Icon} from 'semantic-ui-react';

/*Type qui peut prendre uniquement les chaines de caractères "text" "youtube" "movie" et "pdf"*/
type buttonCategory = "text" | "youtube" | "movie" | "pdf";


function App() {
  const [category, setCategory] = useState<buttonCategory | undefined>();

  return (
    <>
    <Button.Group widths={4}>
      <Button active={category === "text"} onClick={() => setCategory("text")}><Icon name='keyboard outline'/>Texte</Button>
      <Button active={category === "youtube"} onClick={() => setCategory("youtube")}><Icon name='youtube'/> Lien YouTube</Button>
      <Button active={category === "movie"} onClick={() => setCategory("movie")}><Icon name='film'/>Film / Série</Button>
      <Button active={category === "pdf"} onClick={() => setCategory("pdf")}><Icon name='file pdf outline'/>Document PDF</Button>
    </Button.Group>
    </>
  )
}

export default App
