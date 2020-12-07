import React from 'react';
import { Row, Col, Card, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import * as THREE from 'three';
import './simulacao.css';


const SIMULACAO_STATUS_INDEFINIDA = 0;
const SIMULACAO_STATUS_INICIALIZADA = 1;
const SIMULACAO_STATUS_EXECUTANDO = 2;
const SIMULACAO_STATUS_PARADA = 3;


class Simulacao extends React.Component {

    constructor(props) {
        super(props);

        this.simulacaoId = props.params.id;
        this.simulacaoNome = props.params.nome;
        this.simulacaoRef = null;
        this.simulacaoStatus = SIMULACAO_STATUS_INDEFINIDA;
        this.animationFrameId = null;

        this.SimulacaoComponent = React.lazy(() => import(`../../simulacoes/${this.simulacaoId}`));

        this.state = {
            simulacaoStatus: SIMULACAO_STATUS_INDEFINIDA,
            scene: new THREE.Scene(),
            camera: new THREE.PerspectiveCamera(45, 2, 0.1, 1000),
            //camera: new THREE.OrthographicCamera()
            renderer: new THREE.WebGLRenderer(),
            clock: new THREE.Clock(false)
        };

        this.setSimulacaoRef = (elemento) => {
            if (!this.simulacaoRef && elemento) {
                this.simulacaoRef = elemento;
                this.inicializarSimulacao();
            }
        };

        this.redimensionar = () => {
            const navbarHeight = document.getElementById('app-navbar').offsetHeight;
            const footerHeight = document.getElementById('app-footer').offsetHeight;
            const simulacaoHeight = document.getElementById('app-simulacao').offsetHeight;
            const canvas = document.getElementById('canvas');
    
            let width = canvas.offsetWidth;
            let height = window.innerHeight - navbarHeight - footerHeight - simulacaoHeight + canvas.offsetHeight;
            height = Math.max(height, 480);
            height = Math.min(height, width);
    
            this.state.renderer.setSize(width, height, true);
            this.state.camera.aspect = width / height;
            this.state.camera.updateProjectionMatrix();
            this.state.renderer.render(this.state.scene, this.state.camera);
        };
    }

    inicializarSimulacao() {
        this.state.scene.children.slice().forEach(child => this.state.scene.remove(child));
        this.state.scene.background = new THREE.Color('#f8f9fa');
        this.state.camera.position.set(0, 2, 20);
        this.simulacaoRef.inicializar(this.state.scene, this.state.camera);
        this.state.renderer.render(this.state.scene, this.state.camera);
        this.setState({
            simulacaoStatus: SIMULACAO_STATUS_INICIALIZADA
        });
    }

    iterarSimulacao() {
        this.simulacaoRef.iterar(this.state.scene, this.state.camera, this.state.clock.getDelta());
        this.state.renderer.render(this.state.scene, this.state.camera);
        this.animationFrameId = requestAnimationFrame(this.iterarSimulacao.bind(this));
    }

    executarSimulacao() {
        this.state.clock.start();
        this.iterarSimulacao();
        this.setState({
            simulacaoStatus: SIMULACAO_STATUS_EXECUTANDO
        });
    }

    pararSimulacao() {
        cancelAnimationFrame(this.animationFrameId);
        this.state.clock.stop();
        this.setState({
            simulacaoStatus: SIMULACAO_STATUS_PARADA
        });
    }

    reiniciarSimulacao() {
        cancelAnimationFrame(this.animationFrameId);
        this.state.clock.stop();
        this.inicializarSimulacao();
    }

    componentDidMount() {

        // Ajusta o tamanho do elemento de exibição da cena
        this.redimensionar();
        
        // Injeta o elemento de exibição da cena na página
        const canvas = document.getElementById('canvas');
        canvas.appendChild(this.state.renderer.domElement);

        // Adiciona evento para ajustar elemento de exibição da cena
        // caso a janela da aplicação seja redimensionada
        window.addEventListener('resize', this.redimensionar);
    }

    componentDidUpdate(prevProps) {
        // Não faz nada por aqui...
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.redimensionar);
    }

    render() {
        return (
            <Row className="m-0 p-0">

                {/* Painel de configurações da simulação */}
                <Col className="m-0 p-3 pt-4" sm={12} lg={{ span: 3, order: 2 }}>
                    <Card>
                        <Card.Header className="clearfix">
                            <span className="float-left">Parâmetros da simulação </span>
                            <OverlayTrigger
                                    placement="auto"
                                    overlay={
                                        <Tooltip>Para aplicar as alterações, clique no botão de "Reiniciar" da simulação.</Tooltip>
                                    }>
                                <span className="float-right text-primary"><Icon.InfoCircleFill /></span>
                            </OverlayTrigger>
                        </Card.Header>
                        <Card.Body>
                            <React.Suspense fallback="Aguarde...">
                                <this.SimulacaoComponent ref={this.setSimulacaoRef} />
                            </React.Suspense>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Painel de controle e exibição do universo virtual */}
                <Col id="app-simulacao" className="m-0 p-3 pt-4" sm={12} lg={{ span: 9, order: 1 }}>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col className="text-left text-truncate" xs={6}>
                                    <h5>{this.simulacaoNome}</h5>
                                </Col>
                                <Col className="text-right" xs={6}>
                                    <Button variant="success"
                                            disabled={this.state.simulacaoStatus === SIMULACAO_STATUS_INDEFINIDA || this.state.simulacaoStatus === SIMULACAO_STATUS_EXECUTANDO}
                                            onClick={() => this.executarSimulacao()}>
                                        <Icon.PlayFill />
                                        <span className="d-none d-md-inline"> Executar</span>
                                    </Button>{' '}
                                    <Button variant="danger" 
                                            disabled={this.state.simulacaoStatus === SIMULACAO_STATUS_INDEFINIDA || this.state.simulacaoStatus === SIMULACAO_STATUS_INICIALIZADA || this.state.simulacaoStatus === SIMULACAO_STATUS_PARADA}
                                            onClick={() => this.pararSimulacao()}>
                                        <Icon.PauseFill />
                                        <span className="d-none d-md-inline"> Parar</span>
                                    </Button>{' '}
                                    <Button variant="primary" 
                                            onClick={() => this.reiniciarSimulacao()}>
                                        <Icon.ArrowCounterclockwise />
                                        <span className="d-none d-md-inline"> Reiniciar</span>
                                    </Button>
                                    <br />&nbsp;
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    <Card>
                                        <Card.Body>
                                            <div id="canvas"></div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>
        );
    }
}

export default Simulacao;
