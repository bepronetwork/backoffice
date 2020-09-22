import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    align-items: flex-start;

    width: 100%;

    > div {
        &.header {
            > h1 {
                font-size: 20px;
                font-weight: 600;
                color: #814c94;
            }

            > p {
                font-size: 14px;
            }
        }
    }

`

export const SkinPreview = styled.div`
    width: auto;

    background-color: ${props => props.selected ? '#814c94' : '#999999'};
    transition: background-color 0.5s ease;
    border-radius: 9px;
    
    > img {
        height: auto;
        max-height: 300px;
        max-width: 723px;

        border-radius: 6px;
        filter: grayscale(${props => props.selected ? '0%' : '50%' });
        transition: filter 0.5s ease;
    }

`;

export const MobileSkinPreview = styled.div`
    width: auto;

    background-color: ${props => props.selected ? '#814c94' : '#999999'};
    transition: background-color 0.5s ease;
    border-radius: 9px;
    
    > img {
        height: 500px;
        width: auto;

        border-radius: 6px;
        filter: grayscale(${props => props.selected ? '0%' : '50%' });
        transition: filter 0.5s ease;
    }
`;

export const MobileSkinsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 20px;

    width: 100%;
    justify-items: start;
`;

export const Header = styled.div`
    height: 40px;
    width: 100%;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    padding: 5px 20px;

    @media (max-width: 768px) {
        height: 45px;
        padding: 5px 10px;
    }


    > h1 {
        font-size: 15px;
        color: white;

        @media (max-width: 768px) {
            font-size: 13px;
        }
    }
`;