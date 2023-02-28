import { useRef, useState } from "react"; 
import { Header, Segment, Icon, Button } from "semantic-ui-react";
import PDF from "pdfjs-dist";
import {Helmet} from "react-helmet";
const PDFConversion = () => {
    const inputRef = useRef(null);
    const [iconColor, setIconColor] = useState<"black" | "red">("black");
    const [displayFileName, setDisplayFileName] = useState<String | undefined>("Dépot de document PDF");
    const handleFileUpload = (e : React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files?.item(0);
        setDisplayFileName(file?.name);
        setIconColor("red");
        
    }    

    return (
        <>
        <Helmet>
            <title>PDF - LexiLab</title>
        </Helmet>
        <Segment>
            <Segment placeholder>
                <Header icon>
                    <Icon name="file pdf outline" color={iconColor}/>
                    {displayFileName}
                </Header>
                <Button onClick={() => inputRef.current.click()} color="black">
                    <input ref={inputRef} type="file" style={{display : "none"}} accept="application/pdf" onChange={handleFileUpload}/>
                    Sélection</Button>
            </Segment>
        </Segment>
        </>
    )
}

export default PDFConversion;