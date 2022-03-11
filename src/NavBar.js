import React, { useState } from 'react'
import { Link, Route, withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Badge, AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, Tooltip, MenuItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle';

import Home from "./components/home-components/Home"
import Login from "./components/home-components/Login"
import Register from "./components/home-components/Register"
import Account from './components/home-components/Account'
import MyNotes from './components/home-components/MyNotes'
import { userLoggedOut } from './redux/action/loginAction'
import { handleLogOutAction } from './redux/action/myNotesAction'
import './link.css'

const NavBar = (props) => {
     const [anchorElNav, setAnchorElNav] = useState(null); // NavBar State Variables
     const [anchorElUser, setAnchorElUser] = useState(null); // NavBar State Variables
     const store = useSelector((store) => {
          return store
     })
     const dispatch = useDispatch()

     // NavBar functions
     const handleOpenNavMenu = (event) => {
          setAnchorElNav(event.currentTarget);
     };
     const handleOpenUserMenu = (event) => {
          setAnchorElUser(event.currentTarget);
     };
     const handleCloseNavMenu = () => {
          setAnchorElNav(null);
     };
     const handleCloseUserMenu = () => {
          setAnchorElUser(null);
     };
     // NavBar functions

     const handleLogOut = () => {
          dispatch(userLoggedOut())
          dispatch(handleLogOutAction())
          localStorage.removeItem('token')
          props.history.push('/')
          alert('successfully loggedout')
     }

     const pages = [
          <Link to="/">HOME</Link>,
          <Link to="/login"> LOGIN </Link>,
          <Link to="/register"> REGISTER</Link>
     ]

     const settings = [
          <Link to="/">HOME</Link>,
          <Link to='/account'> ACCOUNT </Link>,
          <Badge color="secondary" max={5} badgeContent={store.myNotes.length}>
               <Link to="/mynotes"> MY NOTES </Link>
          </Badge>,
          <Link onClick={handleLogOut} to="/"> LOGOUT</Link>
     ]

     return (
          <div>
               <div>
                    <AppBar position="static" style={{ background: '#a26ff5', color: "black" }}>
                         <Container maxWidth="xl">
                              <Toolbar disableGutters>
                                   <Typography
                                        variant="h6"
                                        noWrap
                                        component="div"
                                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                                   >
                                        MY PERSONAL NOTE TAKING APP
                                   </Typography>

                                   <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                        <IconButton
                                             size="large"
                                             aria-label="account of current user"
                                             aria-controls="menu-appbar"
                                             aria-haspopup="true"
                                             onClick={handleOpenNavMenu}
                                             color="inherit"
                                        >
                                             <MenuIcon />
                                        </IconButton>
                                        <Menu
                                             id="menu-appbar"
                                             anchorEl={anchorElNav}
                                             anchorOrigin={{
                                                  vertical: 'bottom',
                                                  horizontal: 'left',
                                             }}
                                             keepMounted
                                             transformOrigin={{
                                                  vertical: 'top',
                                                  horizontal: 'left',
                                             }}
                                             open={Boolean(anchorElNav)}
                                             onClose={handleCloseNavMenu}
                                             sx={{
                                                  display: { xs: 'block', md: 'none' },
                                             }}
                                        >

                                             {
                                                  !store.isLoggedIn ? (
                                                       pages.map((page, i) => (
                                                            <MenuItem key={i} onClick={handleCloseNavMenu}>
                                                                 <Typography textAlign="center">{page}</Typography>
                                                            </MenuItem>
                                                       ))
                                                  ) : (
                                                       settings.map((setting, i) => (
                                                            <MenuItem key={i} onClick={handleCloseNavMenu}>
                                                                 <Typography textAlign="center">{setting}</Typography>
                                                            </MenuItem>
                                                       ))
                                                  )
                                             }
                                        </Menu>
                                   </Box>
                                   <Typography
                                        variant="h6"
                                        noWrap
                                        component="div"
                                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                                   >
                                        MY PERSONAL NOTE TAKING APP
                                   </Typography>
                                   <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                                        {
                                             !store.isLoggedIn ? (
                                                  pages.map((page, i) => (
                                                       <Button
                                                            key={i}
                                                            onClick={handleCloseNavMenu}
                                                            sx={{ my: 2, color: 'white', display: 'block' }}
                                                       >
                                                            {page}
                                                       </Button>
                                                  ))
                                             ) : (
                                                  settings.map((setting, i) => (
                                                       <Button
                                                            key={i}
                                                            onClick={handleCloseNavMenu}
                                                            sx={{ my: 2, color: 'white', display: 'block' }}
                                                       >
                                                            {setting}
                                                       </Button>
                                                  ))
                                             )
                                        }
                                   </Box>

                                   {
                                        store.isLoggedIn && (
                                             <Box sx={{ flexGrow: 0 }}>
                                                  <Tooltip title="Open settings">
                                                       <IconButton
                                                            onClick={handleOpenUserMenu}
                                                            sx={{ p: 0 }}
                                                            size="large"
                                                            aria-label="account of current user"
                                                            aria-controls="menu-appbar"
                                                            aria-haspopup="true"
                                                            color="inherit"
                                                       >
                                                            <Badge color="warning" overlap="circular" badgeContent=" ">
                                                                 <AccountCircle />
                                                            </Badge>

                                                       </IconButton>
                                                  </Tooltip>
                                                  <Menu
                                                       sx={{ mt: '45px' }}
                                                       id="menu-appbar"
                                                       anchorEl={anchorElUser}
                                                       anchorOrigin={{
                                                            vertical: 'top',
                                                            horizontal: 'right',
                                                       }}
                                                       keepMounted
                                                       transformOrigin={{
                                                            vertical: 'top',
                                                            horizontal: 'right',
                                                       }}
                                                       open={Boolean(anchorElUser)}
                                                       onClose={handleCloseUserMenu}
                                                  >
                                                       {settings.map((setting, i) => (
                                                            <MenuItem key={i} onClick={handleCloseUserMenu}>
                                                                 <Typography textAlign="center">{setting}</Typography>
                                                            </MenuItem>
                                                       ))}
                                                  </Menu>
                                             </Box>
                                        )
                                   }
                              </Toolbar>
                         </Container>
                    </AppBar>
               </div>
               <Route path='/' component={Home} exact={true} />
               <Route path='/login' component={Login} />
               <Route path="/register" component={Register} />
               <Route path='/account' component={Account} />
               <Route path="/mynotes" component={MyNotes} />
          </div>
     )
}

export default withRouter(NavBar)