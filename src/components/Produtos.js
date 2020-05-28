import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Produto from "./Produto";
import { bindActionCreators } from "redux";
import * as ProdutosActions from "../store/produtos/actions";
import * as PedidosActions from "../store/pedidos/actions";
import { connect } from "react-redux";

const filtraProduto = (produtos, filtroProdutos = '') => {
  return produtos.filter(produto => (
    produto.titulo.toLowerCase().search(filtroProdutos.toLowerCase()) !== -1 ||
    produto.descricao.toLowerCase().search(filtroProdutos.toLowerCase()) !== -1
  ));
};

const Produtos = (props) => {
  const {
    updateProdutos,
    produtos,
    carrinho,
    filtroProdutos,
    addProdutoCarrinho,
    decrementaProdutoCarrinho,
  } = props;

  useEffect(() => {
    updateProdutos();
  }, [updateProdutos]);

  return (
    <div>
      <Typography variant="h3" style={{ marginTop: 20 }}>
        Lista de produtos
      </Typography>
      {produtos &&
        filtraProduto(produtos, filtroProdutos).map((produto) => (
          <Produto
            addProduto={addProdutoCarrinho}
            key={produto.id}
            produto={produto}
            produtoCarrinho={carrinho.find((pc) => pc.id === produto.id)}
            decrementaProduto={decrementaProdutoCarrinho}
          />
        ))}
      {!produtos && <span>Nenhum produto encontrado</span>}
    </div>
  );
}

const mapStateToProps = (state) => {
  const { produtos, pedido } = state;
  const res = { 
    carrinho: [ ...pedido.carrinho ],
    produtos: [ ...produtos.produtos ],
    filtroProdutos: produtos.filtroProdutos,
  };
  return res;
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...ProdutosActions, ...PedidosActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Produtos);
