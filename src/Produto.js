import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardMedia } from '@material-ui/core';

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
        <Button size="small" onClick={() => props.addProduto(produto)}>Adicionar ao carrinho</Button>
      </CardActions>
    </Card>
  );
}
 export default Produto;