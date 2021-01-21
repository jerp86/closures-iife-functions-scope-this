const BTN_REINICIAR = 'btnReiniciar';
const ID_CONTADOR = 'contador';
const VALOR_CONTADOR = 100;
const PERIODO_INTERVALOR = 10;

class ContadorComponent {
  constructor() {
    this.inicializar()
  }

  prepararContadorProxy() {
    const handler = {
      set: (currentContext, propertyKey, newValue) => {
        console.log({ currentContext, propertyKey, newValue });

        currentContext[propertyKey] = newValue;
        return true;
      }
    };

    const contador = new Proxy({
      valor: VALOR_CONTADOR,
      efetuarParada: () => {},
    }, handler);

    return contador;
  }

  atualizarTexto = ({ elementoContador, contador }) => () => {
    const identificadorTexto = '$$contador';
    const textoPadrao = `Começando em <strong>${identificadorTexto}</strong> segundos...`;

    elementoContador.innerHTML = textoPadrao.replace(identificadorTexto, contador.valor--);
  }

  inicializar() {
    console.log('inicializou!!');

    const elementoContador = document.getElementById(ID_CONTADOR);
    const contador = this.prepararContadorProxy();
    const argumentos = {
      elementoContador,
      contador,
    };
    const fn = this.atualizarTexto(argumentos);

    const idIntervalo = setInterval(fn, PERIODO_INTERVALOR);
  }
}