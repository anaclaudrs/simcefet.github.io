import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './colaboradores.css';


class Colaboradores extends Component {
    render() {
        return (
            <Container style={{marginBottom: "30px"}}>
                <Row className="mt-4">
                    <Col sm={12}>
                        <h4>Orientadores</h4>
                        <ul>
                            <li className="mt-2 text-justify">
                                <strong>André L. Maravilha: </strong>
                                Possui graduação em Sistemas de Informação pela Universidade 
                                Federal dos Vales do Jequitinhonha e Mucuri (UFVJM, 2011), 
                                Mestrado (2014) e Doutorado (2018) em Engenharia Elétrica pelo 
                                Programa de Pós-graduação em Engenharia Elétrica da UFMG. 
                                Atualmente é professor do CEFET-MG (campus Divinópolis), onde 
                                leciona as disciplinas de Introdução à Programação, Programação 
                                para a Web, e Bancos de Dados.
                                <br />
                            </li>
                            <li className="mt-2 text-justify">
                                <strong>Rafael Marcelino: </strong>
                                Possui graduação em Física pela Universidade Estadual Júlio
                                de Mesquita Filho (2007), Mestrado em supersimetria pelo 
                                Instituto de Física Teórica UNESP (2010) e Doutorado em 
                                Física de Partículas pelo Instituo de Física da USP (2015).
                            </li>
                        </ul>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col sm={12}>
                        <h4>Alunos</h4>
                        <ul>
                            <li className="mt-2">Ana Cláudia Rodrigues e Silva (Curso Técnico Integrado em Informática)</li>
                            <li className="mt-2">Henrique de Castro Fonseca (Curso Técnico Integrado em Informática)</li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        );
        }
}

export default Colaboradores;
