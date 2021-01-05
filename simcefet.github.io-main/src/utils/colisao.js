import * as THREE from 'three';


/**
 * Retorna true se detectar que os objetos colidiram, ou false caso contrário.
 * @param {THREE.Object3D} objeto1 Objeto 3D.
 * @param {THREE.Object3D} objeto2 Outro objeto 3D.
 */
function colisao(objeto1, objeto2) {

    let raycaster = new THREE.Raycaster();
    let origem = objeto1.position.clone();

    for (let i = 0; i < objeto1.geometry.vertices.length; i++) {

        // Define o raio (raycaster) com a origem na posição do objeto 1 
        // direcionado ao i-ésimo vértice da geometria do objeto 1.
        let direcao = objeto1.geometry.vertices[i].clone();

        let vLocal = objeto1.geometry.vertices[i].clone();
        let vGlobal = vLocal.applyMatrix4(objeto1.matrix);
        let vDirecao = vGlobal.sub(objeto1.position);
        let distancia = vDirecao.length();

        // let distancia = Math.abs(origem.distanceTo(direcao));

        // raycaster.set(vOrigem, vDirecao.clone().normalize());
        raycaster.set(origem, direcao.normalize());

        // Verifica se o objeto 2 faz interseção com o raio e, caso faça,
        // verifica se a interseção ocorre entre a origem e o vértice do objeto 1.
        let colisoes = raycaster.intersectObjects([ objeto2 ]);
        if (colisoes.length > 0 && colisoes[0].distance <= distancia) {
            return true;
        }
    }

    // Não foi detectada colisão
    return false;
}

export default colisao;
