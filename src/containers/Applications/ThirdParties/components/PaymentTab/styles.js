import styled from 'styled-components';
import { Input } from 'reactstrap';

export const InputField = styled(Input)`
    margin: 12px 0px;
    border-radius: 6px;
    border: solid 1.5px rgba(164, 161, 161, 0.35);
    background-color: #fafcff;
    font-family: Poppins;
    font-size: 14px;
    line-height: 24px;
    color: #828282;
`;

export const Actions = styled.section`
    padding-top: 15px;

    > p {
        font-family: Poppins;
        font-size: 13px;
    }
`;
