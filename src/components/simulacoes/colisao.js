import React, { Component } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import * as THREE from 'three';
import { colisao } from '../../utils';


/**
 * Simulação de colisão
 */
class Colisao extends Component {

    /**
     * Construtor padrão.
     */
    constructor() {
        super();

        // Atributos para inicialização da simulação
        this.state = {
            distancia: 10,          // distância em metros entre as esferas
            esfera1_massa: 10,      // massa em Kg da esfera 1 (azul)
            esfera1_velocidade: 2,  // velocidade em m/s da esfera 1 (azul)
            esfera2_massa: 10,      // massa em Kg da esfera 2 (vermelha)
            esfera2_velocidade: -1  // velocidade em m/s da esfera 2 (vermelha)
        };

        // Atributos da evolução da simulação
        this.colidiram = false;
        this.esfera1_velocidadeAtual = null;
        this.esfera2_velocidadeAtual = null;
    }

    /**
     * Cria o universo virtual para a simulação e inicializa seus parâmetros de 
     * acordo com as configurações. Os parâmetros de acompanhamento devem ser 
     * inicializados e os elementos 3D, luzes, e outros que irão compor o estado 
     * inicial de simulação devem ser inseridos na cena.
     * @param {THREE.Scene} scene Objeto no qual devem ser adicionados os objetos, 
     * luzes e outros elementos da simulação.
     * @param {THREE.PerspectiveCamera} camera Projeção da visão humana ao observar
     *  a cena 3D.
     */
    inicializar(scene, camera) {

        // Inicializa as velocidades atuais com velocidades iniciais e 
        // o status de detecção de colisão entre as esferas
        this.colidiram = false;
        this.esfera1_velocidadeAtual = this.state.esfera1_velocidade;
        this.esfera2_velocidadeAtual = this.state.esfera2_velocidade;

        const raio = 1; // Raio das esferas
        const segmentos = 64; // Quanto maior, mais perfeita será a esfera

        // Define a posição inicial das esferas
        const posicao = (this.state.distancia / 2) + (raio / 2);

        // Cria a esfera 1 (azul)
        const geometry1 = new THREE.SphereGeometry(raio, segmentos, segmentos);
        const material1 = new THREE.MeshPhongMaterial({ color: 0x3A4FE3 });
        this.esfera1 = new THREE.Mesh(geometry1, material1);
        this.esfera1.position.x = -posicao;
        scene.add(this.esfera1);

        // Cria a esfera 2 (vermelha)
        const geometry2 = new THREE.SphereGeometry(raio, segmentos, segmentos);
        const material2 = new THREE.MeshPhongMaterial({ color: 0xCC3D3D });
        this.esfera2 = new THREE.Mesh(geometry2, material2);
        this.esfera2.position.x = posicao;
        scene.add(this.esfera2);

        // Cria iluminação da cena
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(0, 20, 0);
        light.target.position.set(-10, 0, 0);
        scene.add(light);
        scene.add(light.target);

        // Define a posição da câmera (observador da simulação)
        camera.position.set(0, 0, 20);
    }

    /**
     * Método que deverá implementar uma iteração (frame da animação gráfica) da 
     * simulação.
     * @param {THREE.Scene} scene Objeto no qual devem ser adicionados os objetos, 
     * luzes e outros elementos da simulação.
     * @param {THREE.PerspectiveCamera} camera Projeção da visão humana ao observar
     *  a cena 3D.
     * @param {number} elapsedTime Tempo (em segundos) transcorrido entre a iteração 
     * anterior e a iteração atual.
     */
    iterar(scene, camera, elapsedTime) {

        // Verifica se ocorreu colisão entre as esferas
        if (!this.colidiram) {
            this.colidiram = colisao(this.esfera1, this.esfera2);
        }

        // Caso as esferas tenham colidido
        if (this.colidiram) {
            this.esfera1_velocidadeAtual = 0;
            this.esfera2_velocidadeAtual = 0;

        // Caso contrário, atualiza suas posições
        } else {
            this.esfera1.position.x += this.esfera1_velocidadeAtual * elapsedTime;
            this.esfera2.position.x += this.esfera2_velocidadeAtual * elapsedTime;
        }
    }

    /**
     * Retorna o componente contendo o formulário para que o usuário os parâmetros de
     *  configuração inicial da simulação.
     */
    render() {

        // Função para lidar com alterações nos parâmetros de configuração da simulação
        const handleInputChange = (event) => {
            const target = event.target;
            const name = target.name;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            this.setState({
                [name]: value
            });
        };

        // Retorna o componente contendo o formulário de configuração
        return (
            <Form.Row>
                <Col sm={12}>
                    <Form.Group controlId="distancia">
                        <Form.Label>Distância inicial entre as esferas (m):</Form.Label>
                        <Form.Control name="distancia" type="number" placeholder="Valor em metros" value={this.state.distancia} onChange={handleInputChange} />
                    </Form.Group>
                </Col>
                <Col sm={12}>
                    <hr />
                    <h6><strong>Esfera azul</strong></h6>
                </Col>
                <Col sm={12} md={6}>
                    <Form.Group controlId="esfera1_massa">
                        <Form.Label>Massa (Kg):</Form.Label>
                        <Form.Control name="esfera1_massa" type="number" placeholder="Valor em Kg" value={this.state.esfera1_massa} onChange={handleInputChange} />
                    </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                    <Form.Group controlId="esfera1_velocidade">
                        <Form.Label>Velocidade inicial (m/s):</Form.Label>
                        <Form.Control name="esfera1_velocidade" type="number" placeholder="Valor em m/s" value={this.state.esfera1_velocidade} onChange={handleInputChange} />
                    </Form.Group>
                </Col>
                <Col sm={12}>
                    <hr />
                    <h6><strong>Esfera vermelha</strong></h6>
                </Col>
                <Col sm={12} md={6}>
                    <Form.Group controlId="esfera2_massa">
                        <Form.Label>Massa (Kg):</Form.Label>
                        <Form.Control name="esfera2_massa" type="number" placeholder="Valor em Kg" value={this.state.esfera2_massa} onChange={handleInputChange} />
                    </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                    <Form.Group controlId="esfera2_velocidade">
                        <Form.Label>Velocidade inicial (m/s):</Form.Label>
                        <Form.Control name="esfera2_velocidade" type="number" placeholder="Valor em m/s" value={this.state.esfera2_velocidade} onChange={handleInputChange} />
                    </Form.Group>
                </Col>
            </Form.Row>
        );
    }

}

export default Colisao;
