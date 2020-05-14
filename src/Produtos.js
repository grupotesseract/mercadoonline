import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Produto from "./Produto";
import CarrinhoContext from "./CarrinhoContext";
import { bindActionCreators } from "redux";
import * as ProdutosActions from "./store/produtos/actions";
import { connect } from "react-redux";
import { listaProdutos } from "./listaprodutos";

class Produtos extends Component {
  static contextType = CarrinhoContext;

  componentDidMount() {
    const { updateProdutos } = this.props;
    updateProdutos(listaProdutos);
  }
  render() {
    const { produtos } = this.props;
    const { addProduto, decrementaProduto, filtraProdutos } = this.context;
    return (
      <div>
        <Typography variant="h3" style={{ marginTop: 20 }}>
          Lista de produtos
        </Typography>
        {filtraProdutos(produtos).map((produto) => (
          <Produto
            addProduto={addProduto}
            key={produto.id}
            produto={produto}
            decrementaProduto={decrementaProduto}
          />
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { produtos } = state;
  return { produtos: produtos.produtos };
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(ProdutosActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Produtos);
