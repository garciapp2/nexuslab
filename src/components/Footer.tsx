import React from 'react';
import styled from 'styled-components';
import { Github, ExternalLink } from 'lucide-react';

const FooterContainer = styled.footer`
  background: #1e2328;
  border-top: 1px solid #463714;
  padding: 2rem 0;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
`;

const Disclaimer = styled.p`
  color: #5bc0de;
  font-size: 0.9rem;
  line-height: 1.5;
  max-width: 800px;
`;

const Links = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const FooterLink = styled.a`
  color: #cdbe91;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: #c89b3c;
  }
`;

const Copyright = styled.p`
  color: #5bc0de;
  font-size: 0.8rem;
  margin-top: 1rem;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Disclaimer>
          NexusLab não é endossado pela Riot Games e não reflete as opiniões ou opiniões da Riot Games 
          ou de qualquer pessoa oficialmente envolvida na produção ou gerenciamento das propriedades da Riot Games. 
          Riot Games e todas as propriedades associadas são marcas comerciais ou registradas da Riot Games, Inc.
        </Disclaimer>
        
        <Links>
          <FooterLink 
            href="https://developer.riotgames.com/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <ExternalLink size={16} />
            Riot Games API
          </FooterLink>
          <FooterLink 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Github size={16} />
            GitHub
          </FooterLink>
        </Links>
        
        <Copyright>
          © 2024 NexusLab. Desenvolvido para fins educacionais e de análise de dados.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
