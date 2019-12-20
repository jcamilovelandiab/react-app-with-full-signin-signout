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
        console.log(dataUri);
        var img = document.getElementById('captureTaken');
        var button = document.getElementById('saveImage');
        img.src = dataUri;
        img.onload = function () {
            button.removeAttribute('disabled');
        };
        button.onclick = function () {
            window.location.href = img.src.replace('image/png', 'image/octet-stream');
        };
    }
   
    const isFullscreen = false;
    return (
      <div>
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
                        fullWidth
                    >
                        <Grid item xs={6}>
                            <Button variant="contained" color="primary" fullWidth
                                style={{backgroundColor: "#00c853"}} id="saveImage">
                                Save
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="contained" color="secondary" fullWidth>
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </React.Fragment>
            
            : <Camera onTakePhotoAnimationDone = {handleTakePhotoAnimationDone}
              isFullscreen={isFullscreen}
            />
        }
      </div>
    );
}