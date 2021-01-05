import React, { useState, lazy, Suspense } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { ListaSimulacoes } from './components/simulacoes';

// Importa arquivos CSS
import './assets/css/App.css';

// Importa imagens
import logo from './assets/images/logo.png';

// IDs das páginas
const PAGINA_HOME = 'home';
const PAGINA_COLABORADORES = 'colaboradores';
const PAGINA_SOBRE = 'sobre';
const PAGINA_SIMULACAO = 'simulacao';


function Carregando(props) {
  return(
    <div>Carregando...</div>
  );
}

function Conteudo(props) {
  let Pagina = lazy(() => import(`./components/paginas/${props.pagina}`));
  return (
    <div>
      <Suspense fallback={(<Carregando />)}>
        <Pagina params={props.params} />
      </Suspense>
    </div>
  );
}

function App() {

  const [pagina, setPagina] = useState({
    id: PAGINA_HOME,
    params: null
  });
  
  const navegar = (id, params) => {
    setPagina({
      id: id,
      params: params
    });
  }

  return (
    <>
      {/* Barra de navegação */}
      <Navbar id="app-navbar" collapseOnSelect expand="lg" variant="dark" sticky="top" >
        <Navbar.Brand href="#home" onClick={() => navegar(PAGINA_HOME, null)}>
          <img alt="Logo CEFET-MG" src={logo} height="35" className="d-inline-block align-top" />{' '}
          Simulador de Física
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home" onClick={() => navegar(PAGINA_HOME, null)}>Início</Nav.Link>
            <NavDropdown title="Simulações" id="collasible-nav-dropdown">
              {ListaSimulacoes.map(simulacao => (
                <NavDropdown.Item 
                  key={simulacao.id} href={`#${simulacao.id}`}
                  onClick={() => navegar(PAGINA_SIMULACAO, {id: simulacao.id, nome: simulacao.nome})}
                >
                  {simulacao.nome}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#colaboradores" onClick={() => navegar(PAGINA_COLABORADORES, null)}>Colaboradores</Nav.Link>
            <Nav.Link href="#sobre" onClick={() => navegar(PAGINA_SOBRE, null)}>Sobre</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Conteúdo principal */}
      <Container className="my-container" fluid>
        <Conteudo pagina={pagina.id} params={pagina.params} />
      </Container>

      {/* Rodapé */}
      <Navbar id="app-footer" variant="dark" fixed="bottom" className=".rodape">
        <small className="text-white">
          <span className="d-none d-md-block">&copy; 2020 Copyrights Centro Federal de Educação Tecnológica de Minas Gerais</span>
          <span className="d-md-none">&copy; 2020 Copyrights CEFET-MG</span>
        </small>
      </Navbar>
    </>
  );

}

export default App;
