import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './sobre.css';


class Sobre extends Component {
    render() {
        return (
            <Container style={{marginBottom: "30px"}}>
                <Row className="mt-4">
                    <Col>
                        <h4>Sobre o projeto</h4>
                        <p className="text-justify">
                            O ensino de física é um desafio em escolas de todo o mundo. A descrição da 
                            Natureza, mesmo em suas escalas mais simples, é desafiador e complexa. Além 
                            disso, o crescente desinteresse dos estudantes às aulas de Física no Ensino 
                            Médio é um problema a mais no processo de aprendizagem. Alguns motivos para 
                            este desinteresse são a falta de protagonismo dos alunos, aulas totalmente 
                            expositivas e a falta de preparo dos educadores em acompanhar a evolução 
                            tecnológica que as gerações mais jovens experimentam.<sup>1</sup>
                        </p>
                        <p className="text-justify">
                            Entretanto, os fenômenos estudados no curso de Física do ensino médio têm a 
                            vantagem de serem facilmente visualizados, já que tratam sobre a Física do 
                            cotidiano. Portanto, simular estes fenômenos, sejam colisões, partículas em 
                            movimento sob ação de campos gravitacionais constantes, fluidos em regime 
                            estático ou dinâmico etc, é uma tafera, a princípio, possível de ser feita.
                        </p>
                        <p className="text-justify">
                            O objetivo deste projeto é criar simulações para sistemas físicos simples, 
                            que contenham princípios e enunciados vistos no curso de Física do Ensino 
                            Médio. Em especial, os fenômenos relacionados com a Mecânica.
                        </p>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col>
                        <h4>Referências</h4>
                        <sup>1</sup> S. Klajn. Física - A vilã da escola. UPF Editora, 2002.
                    </Col>
                </Row>
            </Container>
        );
        }
}

export default Sobre;
