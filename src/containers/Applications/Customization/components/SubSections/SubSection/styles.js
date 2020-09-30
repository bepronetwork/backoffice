import styled from 'styled-components';
import { Button as MaterialButton } from '@material-ui/core';

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;

    padding: 10px;
    margin: 20px 0px;

    > h1 {
        font-family: Poppins;
        font-size: 18px;
    }
`;

export const SectionGrid = styled.div`
    position: relative;

    display: grid;

    height: 200px;
    width: 100%;

    max-height: 200px;

    margin: 15px 0px;

    background-color: ${props => props.backgroundColor ? props.backgroundColor : "black"};
    border: solid 1px rgba(164, 161, 161, 0.35);

    &.RightImage {
        grid-template-areas: 
        'Title Image'
        'Text Image';

        grid-template-rows: 40% 60%;
        grid-template-columns: 50% 50%;
    }

    &.LeftImage {
        grid-template-areas: 
        'Image Title'
        'Image Text';

        grid-template-rows: 40% 60%;
        grid-template-columns: 50% 50%;
    }

    &.TopImage {
        grid-template-areas: 
        'Image'
        'Title'
        'Text';

        grid-template-rows: 50% 20% 30%;
        grid-template-columns: 100%;
    }

    &.BottomImage {
        grid-template-areas: 
        'Title'
        'Text'
        'Image';

        grid-template-rows: 20% 30% 50%;
        grid-template-columns: 100%;
    }

`;

export const BackgroundImage = styled.div`
    grid-area: 1 / 1;

    > img {
        position: absolute;
    }
`;

export const Title = styled.section`
    grid-area: Title;

    display: flex;
    justify-content: center;
    align-items: flex-start;

    padding: 10px;

    > h1 {
        position: absolute;
        z-index: 10;

        color: white;
        font-size: 26px;
        font-weight: 500;
        word-break: break-all;
    }
`;

export const Text = styled.section`
    grid-area: Text;

    display: flex;
    justify-content: center;
    align-items: flex-start;

    padding: 10px;

    > p {
        position: absolute;
        z-index: 10;

        color: white;
        font-size: 18px;
        font-weight: 500;
        word-break: break-all;
    }
`;

export const Image = styled.section`
    grid-area: Image;

    height: 100%;
    width: 100%;

    > img {
        position: relative;
        z-index: 10;
    }
`;

export const DropzoneImage = styled.div`
    height: 100%;
    width: 100%;

    border-radius: 6px;
`;

export const BackgroundItems = styled.section`
    display: grid;

    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 25px;
`;

export const UploadButton = styled(MaterialButton)`
    margin: 7px 0px !important;

    text-transform: none !important;
    background-color: #63c965 !important;
    box-shadow: none !important;
    height: 30px !important;
    color: white !important;
    opacity: ${props => props.disabled ? 0.7 : 1};
`;

export const RemoveButton = styled(MaterialButton)`
    margin: 7px 0px !important;

    text-transform: none !important;
    background-color: #e6536e !important;
    box-shadow: none !important;
    height: 30px !important;
    color: white !important;

    opacity: ${props => props.disabled ? 0.7 : 1};
`;

export const DialogHeader = styled.div`
    display: flex;
    justify-content: flex-end;

    width: 100%;
    padding: 20px 30px 0px 30px;
`;

export const Actions = styled.section`
    display: flex;
    flex-wrap: wrap;
`;

export const Location = styled.span`
    font-family: Poppins;
    font-size: 15px;
`;

export const EditSubSection = styled(MaterialButton)`
    width: 100%;
    max-width: 120px;

    text-transform: none !important;
    background-color: rgba(164, 161, 161, 0.35) !important;
    box-shadow: none !important;
    height: 30px !important;
    color: black !important;
    margin: 5px 5px !important;

    > span {
        font-weight: 400;
    }

    > svg {
        margin: 0px 5px;
    }
`;

export const RemoveSubSection = styled(MaterialButton)`
    width: 100%;
    max-width: 120px;

    text-transform: none !important;
    background-color: #e6536e !important;
    box-shadow: none !important;
    height: 30px !important;
    color: white !important;
    margin: 5px 5px !important;

    > span {
        font-weight: 400;
    }
`;

export const Yes = styled(MaterialButton)`
    max-width: 200px;
    
    text-transform: none !important;
    background-color: #63c965 !important;
    box-shadow: none !important;
    height: 30px !important;
    color: white !important;
    margin: 5px 5px !important;
`;

export const Cancel = styled(MaterialButton)`
    max-width: 200px;

    text-transform: none !important;
    background-color: #e6536e !important;
    box-shadow: none !important;
    height: 30px !important;
    color: white !important;
    margin: 5px 5px !important;
`;