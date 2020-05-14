import styled from "styled-components";

export const LockWrapper = styled.section`
    pointer-events: ${ props => props.hasPermission ? "all" : "none" };
    opacity: ${ props => props.hasPermission ? 1.0 : 0.8 };
`;