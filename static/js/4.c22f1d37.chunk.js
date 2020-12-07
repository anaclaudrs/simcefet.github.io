(this["webpackJsonpcefetmg-simulador-fisica"]=this["webpackJsonpcefetmg-simulador-fisica"]||[]).push([[4,8,15],{33:function(e,a,t){"use strict";t.r(a);var i=t(54);a.default=i.default},54:function(e,a,t){"use strict";t.r(a);var i=t(83),s=t(84),n=t(85),c=t(86),r=t(7),o=t(0),l=t.n(o),m=t(91),u=t(90),d=t(103),h=t(102),j=t(97),f=t(49),b=t(98),p=t(99),x=t(100),O=t(101),v=t(93),S=(t(73),function(e){Object(n.a)(o,e);var a=Object(c.a)(o);function o(e){var s;return Object(i.a)(this,o),(s=a.call(this,e)).simulacaoId=e.params.id,s.simulacaoNome=e.params.nome,s.simulacaoRef=null,s.simulacaoStatus=0,s.animationFrameId=null,s.SimulacaoComponent=l.a.lazy((function(){return t(94)("./".concat(s.simulacaoId))})),s.state={simulacaoStatus:0,scene:new v.h,camera:new v.f(45,2,.1,1e3),renderer:new v.j,clock:new v.a(!1)},s.setSimulacaoRef=function(e){!s.simulacaoRef&&e&&(s.simulacaoRef=e,s.inicializarSimulacao())},s.redimensionar=function(){var e=document.getElementById("app-navbar").offsetHeight,a=document.getElementById("app-footer").offsetHeight,t=document.getElementById("app-simulacao").offsetHeight,i=document.getElementById("canvas"),n=i.offsetWidth,c=window.innerHeight-e-a-t+i.offsetHeight;c=Math.max(c,480),c=Math.min(c,n),s.state.renderer.setSize(n,c,!0),s.state.camera.aspect=n/c,s.state.camera.updateProjectionMatrix(),s.state.renderer.render(s.state.scene,s.state.camera)},s}return Object(s.a)(o,[{key:"inicializarSimulacao",value:function(){var e=this;this.state.scene.children.slice().forEach((function(a){return e.state.scene.remove(a)})),this.state.scene.background=new v.b("#f8f9fa"),this.state.camera.position.set(0,2,20),this.simulacaoRef.inicializar(this.state.scene,this.state.camera),this.state.renderer.render(this.state.scene,this.state.camera),this.setState({simulacaoStatus:1})}},{key:"iterarSimulacao",value:function(){this.simulacaoRef.iterar(this.state.scene,this.state.camera,this.state.clock.getDelta()),this.state.renderer.render(this.state.scene,this.state.camera),this.animationFrameId=requestAnimationFrame(this.iterarSimulacao.bind(this))}},{key:"executarSimulacao",value:function(){this.state.clock.start(),this.iterarSimulacao(),this.setState({simulacaoStatus:2})}},{key:"pararSimulacao",value:function(){cancelAnimationFrame(this.animationFrameId),this.state.clock.stop(),this.setState({simulacaoStatus:3})}},{key:"reiniciarSimulacao",value:function(){cancelAnimationFrame(this.animationFrameId),this.state.clock.stop(),this.inicializarSimulacao()}},{key:"componentDidMount",value:function(){this.redimensionar(),document.getElementById("canvas").appendChild(this.state.renderer.domElement),window.addEventListener("resize",this.redimensionar)}},{key:"componentDidUpdate",value:function(e){}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.redimensionar)}},{key:"render",value:function(){var e=this;return Object(r.jsxs)(m.a,{className:"m-0 p-0",children:[Object(r.jsx)(u.a,{className:"m-0 p-3 pt-4",sm:12,lg:{span:3,order:2},children:Object(r.jsxs)(d.a,{children:[Object(r.jsxs)(d.a.Header,{className:"clearfix",children:[Object(r.jsx)("span",{className:"float-left",children:"Par\xe2metros da simula\xe7\xe3o "}),Object(r.jsx)(h.a,{placement:"auto",overlay:Object(r.jsx)(j.a,{children:'Para aplicar as altera\xe7\xf5es, clique no bot\xe3o de "Reiniciar" da simula\xe7\xe3o.'}),children:Object(r.jsx)("span",{className:"float-right text-primary",children:Object(r.jsx)(b.a,{})})})]}),Object(r.jsx)(d.a.Body,{children:Object(r.jsx)(l.a.Suspense,{fallback:"Aguarde...",children:Object(r.jsx)(this.SimulacaoComponent,{ref:this.setSimulacaoRef})})})]})}),Object(r.jsx)(u.a,{id:"app-simulacao",className:"m-0 p-3 pt-4",sm:12,lg:{span:9,order:1},children:Object(r.jsx)(d.a,{children:Object(r.jsxs)(d.a.Body,{children:[Object(r.jsxs)(m.a,{children:[Object(r.jsx)(u.a,{className:"text-left text-truncate",xs:6,children:Object(r.jsx)("h5",{children:this.simulacaoNome})}),Object(r.jsxs)(u.a,{className:"text-right",xs:6,children:[Object(r.jsxs)(f.a,{variant:"success",disabled:0===this.state.simulacaoStatus||2===this.state.simulacaoStatus,onClick:function(){return e.executarSimulacao()},children:[Object(r.jsx)(p.a,{}),Object(r.jsx)("span",{className:"d-none d-md-inline",children:" Executar"})]})," ",Object(r.jsxs)(f.a,{variant:"danger",disabled:0===this.state.simulacaoStatus||1===this.state.simulacaoStatus||3===this.state.simulacaoStatus,onClick:function(){return e.pararSimulacao()},children:[Object(r.jsx)(x.a,{}),Object(r.jsx)("span",{className:"d-none d-md-inline",children:" Parar"})]})," ",Object(r.jsxs)(f.a,{variant:"primary",onClick:function(){return e.reiniciarSimulacao()},children:[Object(r.jsx)(O.a,{}),Object(r.jsx)("span",{className:"d-none d-md-inline",children:" Reiniciar"})]}),Object(r.jsx)("br",{}),"\xa0"]})]}),Object(r.jsx)(m.a,{children:Object(r.jsx)(u.a,{sm:12,children:Object(r.jsx)(d.a,{children:Object(r.jsx)(d.a.Body,{children:Object(r.jsx)("div",{id:"canvas"})})})})})]})})})]})}}]),o}(l.a.Component));a.default=S},73:function(e,a,t){},94:function(e,a,t){var i={"./":[36],"./colisao-unidimensional-elastica":[92,9],"./colisao-unidimensional-elastica.js":[92,9],"./index":[36],"./index.js":[36]};function s(e){if(!t.o(i,e))return Promise.resolve().then((function(){var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}));var a=i[e],s=a[0];return Promise.all(a.slice(1).map(t.e)).then((function(){return t(s)}))}s.keys=function(){return Object.keys(i)},s.id=94,e.exports=s}}]);
//# sourceMappingURL=4.c22f1d37.chunk.js.map