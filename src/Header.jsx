import React, { useState, useContext } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link, Redirect } from 'react-router-dom';
import { Button, MenuItem } from '@material-ui/core';
import CarrinhoContext from './CarrinhoContext';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    flexGrow: 1,
    textAlign: 'left',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    display: 'flex',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'flex',
  },
}));


export default function Header() {
  const classes = useStyles();
  const [menuOpen, setMenuOpen] = useState(null)
  const [redirect, setRedirect] = useState(null)

  const context = useContext(CarrinhoContext);
  const { setFiltro } = context;



  const handleMenuOpen = (event) => {
    setMenuOpen(event.currentTarget);
  }

  const handleMenuClose = () => {
    setMenuOpen(null);
  };

  const MenuPrincipal = () => <Menu
    id="simple-menu"
    anchorEl={menuOpen}
    keepMounted
    open={Boolean(menuOpen)}
    onClose={handleMenuClose}
  >
    <MenuItem onClick={() => setRedirect('/')}>Produtos</MenuItem>
    <MenuItem onClick={() => setRedirect('/carrinho')}>Carrinho</MenuItem>
    <MenuItem onClick={() => setRedirect('/config')}>Configurações</MenuItem>
  </Menu>;

  return (
    <div className={classes.grow}>
      {redirect &&
        <Redirect to={redirect} />
      }
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <MenuPrincipal />
          <Link to="/" className={classes.title}>
            <Typography variant="h6" noWrap>Lista de produtos</Typography>
          </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Buscar produto..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={e => setFiltro(e.target.value)}
            />
          </div>
          <div className={classes.sectionDesktop}>
            <Link to="/carrinho">
              <Button aria-label="Veja seu carrinho de compras" color="inherit">
                carrinho&nbsp;
                <ShoppingCartIcon />
              </Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
