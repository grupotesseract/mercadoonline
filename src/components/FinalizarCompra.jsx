import React from 'react';
import { Button, createStyles, makeStyles, Paper } from '@material-ui/core';
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

const FinalizarCompra = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

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
            <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">
              react-transition-group animates me.
            </p>
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