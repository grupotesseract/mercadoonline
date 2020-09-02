import React, { useState } from 'react';
import {
  Button,
  createStyles,
  makeStyles,
  Paper,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import * as PedidosActions from "../store/pedidos/actions";
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

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

const FinalizarCompra = ({ enviaPedido, enviaZap, pedido }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [celular, setCelular] = useState('');
  const [numeroEndereco, setNumeroEndereco] = useState('');
  const [errorSubmit, setErrorSubmit] = useState(false);

  const finalizaCompra = () => {
    if (nome === "" || endereco === "") {
      setErrorSubmit(true);
      return;
    }

    enviaPedido({
      nome,
      celular,
      endereco,
    });
  };

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
            {pedido.loading && <CircularProgress />}
            {pedido.pedidoSalvo && !pedido.pedidoEnviado && (
              <>
                <h2>Pedido salvo, enviando pedido para atendimento.</h2>
                <Link to="/">
                  <Button
                    aria-label="Voltar para a página inicial"
                    color="primary"
                    variant="contained"
                  >
                    Ver mais produtos
                  </Button>
                </Link>
                <Button
                  aria-label="Voltar para a página inicial"
                  color="primary"
                  onClick={enviaZap}
                >
                  Reenviar para atendimento
                </Button>
              </>
            )}
            {pedido.pedidoEnviado && (
              <>
                <h2>Pedido Enviado :)</h2>
                <Link to="/">
                  <Button
                    aria-label="Voltar para a página inicial"
                    color="primary"
                    variant="contained"
                  >
                    Ver mais produtos
                  </Button>
                </Link>
                <Button
                  aria-label="Voltar para a página inicial"
                  color="primary"
                  onClick={enviaZap}
                >
                  Reenviar para atendimento
                </Button>
              </>
            )}
            {!pedido.loading && !pedido.pedidoEnviado && (
              <>
                <h2>Finalizar Compra</h2>
                <p>Preencha seus dados e finalize sua compra</p>
                <form>
                  <TextField
                    id="nome"
                    label="Nome"
                    error={errorSubmit && nome === ""}
                    helperText={
                      errorSubmit && nome === "" ? "Preencha seu nome" : null
                    }
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                  <TextField
                    id="endereco"
                    label="Endereço"
                    value={endereco}
                    error={errorSubmit && endereco === ""}
                    helperText={
                      errorSubmit && endereco === ""
                        ? "Digite o seu endereço"
                        : null
                    }
                    onChange={(e) => setEndereco(e.target.value)}
                    required
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
              </>
            )}
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