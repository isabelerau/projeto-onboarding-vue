import { Cliente } from "./Cliente.d";

type Filtro = {
  nome?: { text: string; value: Cliente };
  ativo?: boolean;
};

export default Filtro;
