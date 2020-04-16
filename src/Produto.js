import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardMedia } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 20,
    textAlign: 'left',
  },
  title: {
    fontSize: 20,
  },
  pos: {
    marginBottom: 12,
  },
  footer: {
    justifyContent: 'space-between'
  },
  cover: {
    height: '300px',
    width: '300px',
    flexShrink: 0,
  },
  row: {
    display: 'flex',
  },
});

const Produto = (props) => {
  const classes = useStyles();
  const { produto } = props;
  console.log('props produto', props);

  return (
    <Card className={classes.root}>
      <div className={classes.row}>
        <CardMedia
          className={classes.cover}
          image={'/produtos/'+produto.foto}
          title=""
        />
        <CardContent>
            <Typography className={classes.title} gutterBottom>
              {produto.nome}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {produto.nome}
            </Typography>
            <Typography variant="body2" component="p">
              {produto.descricao}
            </Typography>
        </CardContent>
      </div>
      <CardActions className={classes.footer}>
        <span>R$ {produto.preco}</span>

        {
          produto.quantidade > 0 &&
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Button
              color="primary"
              onClick={() => props.decrementaProduto(produto)}>
              <RemoveIcon />
            </Button>
            <div style={{ marginLeft: 10, marginRight: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <b>Qtd: </b>
              <span> {produto.quantidade}</span>
            </div>
            <Button
              color="primary"
              onClick={() => props.addProduto(produto)}>
              <AddIcon />
            </Button>
          </div>
        }
        {
          !props.carrinho &&
          <Button
            variant="contained"
            color="primary"
            onClick={() => props.addProduto(produto)}>
            Adicionar ao carrinho
            <AddIcon />
          </Button>
        }
        {
          props.carrinho &&
          <Button
            variant="contained"
            color="primary"
            onClick={() => props.removeProduto(produto)}>
            Remover item
            <ClearIcon />
          </Button>
        }
      </CardActions>
    </Card>
  );
}
 export default Produto;