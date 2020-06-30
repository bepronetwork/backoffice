import React from 'react';
import { Container, Action, VideoGameIcon } from './styles';
import Skeleton from '@material-ui/lab/Skeleton';

import videogamesEnum from '../../Enums/videogames';

const VideoGameTabSkeleton = () => {
    return (
        <Container>
            <Action>
                <Skeleton variant="circle" width="35px" height="35px" /> 
            </Action>
            <VideoGameIcon>
                    <Skeleton variant="rect" width="100%" height="100%" /> 
             </VideoGameIcon>
            { Object.keys(videogamesEnum).map(_videogame => (
                <VideoGameIcon>
                    <Skeleton variant="rect" width="100%" height="100%" /> 
                </VideoGameIcon>
            ))}
        </Container>
    )
}

export default VideoGameTabSkeleton;