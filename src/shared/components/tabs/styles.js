import styled from 'styled-components';

export const MobileIcon = styled.section`
    height: 24px;
    width: 24px;
`;

export const MobileTitle = styled.span`
    font-family: Poppins;
    font-size: 11px !important;
    color: #a4a1a1;
`;

export const Icon = styled.section`
    padding-top: 3px;
    height: 24px;
    width: 24px;
`;

export const Title = styled.span`
    margin-left: 7px;
    padding-top: 3px;
    font-family: Poppins;
    font-size: 14px;
    color: #a4a1a1;
`;

export const DesktopWrapper = styled.section`

  @media (max-width: 1137px) {
      .desktop {
        display: none !important;
      }
  }

`;

export const MobileWrapper = styled.section`

  @media (max-width: 1137px) {
      .mobile {
        display: block !important;
      }
  }

`;
