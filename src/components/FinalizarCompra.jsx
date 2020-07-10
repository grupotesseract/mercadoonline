import React, { useState } from 'react';
import { Button, createStyles, makeStyles, Paper, TextField } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import * as PedidosActions from "../store/pedidos/actions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

const FinalizarCompra = ({ enviaPedido }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [celular, setCelular] = useState('');
  const [numeroEndereco, setNumeroEndereco] = useState('');

  const finalizaCompra = () => {
    console.log('finalizaCOmpra', {
      nome,
      celular,
      endereco,
    })
    enviaPedido({
      nome,
      celular,
      endereco,
    })
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        color="secondary"
        variant="contained"
        onClick={handleOpen}
        style={{
          marginTop: 5,
          marginBottom: 20,
          padding: 20,
          fontSize: 18,
          width: "100vw",
        }}
      >
        Finalizar Compra
      </Button>
      <Modal
        aria-labelledby="Finalizar Compra"
        aria-describedby="Preencha seus dados e finalize sua compra"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Paper style={{ padding: 20 }}>
            <h2>Finalizar Compra</h2>
            <p>Preencha seus dados e finalize sua compra</p>
            <form>
              <TextField
                id="nome"
                label="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <TextField
                id="endereco"
                label="Endereço"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
              />
              <TextField
                id="numero"
                label="Número"
                value={numeroEndereco}
                onChange={(e) => setNumeroEndereco(e.target.value)}
              />
              <TextField
                id="celular"
                label="Celular"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={finalizaCompra}
              >
                Finalizar Compra
              </Button>
            </form>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
}

function mapStateToProps(state) {
  const { pedido } = state;
  return { 
    pedido,
  };
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(PedidosActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FinalizarCompra);