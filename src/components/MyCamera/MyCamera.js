import React, {useState} from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import ImagePreview from '../ImagePreview/ImagePreview';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

export default function MyCamera (props) {

    const [dataUri, setDataUri] = useState('');
 
    function handleTakePhotoAnimationDone (dataUri) {
        setDataUri(dataUri);
        var button = document.getElementById('saveImage');
        button.onclick = function () {
            var a = document.createElement('a');
            a.href = dataUri;
            a.download = 'capture.png';
            a.style = 'display: none';
            button.parentNode.appendChild(a);
            a.click();
            a.remove();
            setDataUri('');
        };
    }

    const isFullscreen = false;
    return (       
        <div key={dataUri}>
        {
          (dataUri)
            ?
            <React.Fragment>
                <ImagePreview dataUri={dataUri}
                    isFullscreen={isFullscreen}
                />
                <Container style={{maxWidth: "768px"}}>
                    <Grid container spacing={3}
                        direction="row"
                        justify="center"
                        alignItems="center"
                        fullWidth>
                        <Grid item xs={6}>
                            <Button variant="contained" color="primary" fullWidth
                                style={{backgroundColor: "#00c853"}} id="saveImage">
                                Save
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="contained" color="secondary" fullWidth
                                onClick={()=>{
                                    setDataUri('');
                                }}>
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </React.Fragment>
            
            :
            <Camera onTakePhotoAnimationDone = {handleTakePhotoAnimationDone}
              isFullscreen={isFullscreen}
            />
        }
      </div>
    );
}