import React from 'react';
import { NavLink, useLocation} from 'react-router-dom';
import Cookies from 'js-cookie';

import appLogo from '../assets/logo.svg';
import classes from './styles/nav.module.css'

const NaviagationBar = () => {

    const url = useLocation();
    
    return (
    <header>
        <nav>
            <div>
                <NavLink to='/'>
                    <div className={classes.logo}>
                        <img src={appLogo} alt="Social Hive" />
                        <h1>Social <span>Hive</span></h1>
                    </div>
                </NavLink>
            </div>
            <div>
                <ul className={classes.nav_list}>
                    <li>
                        <NavLink to='/' className={({isActive}) => isActive ? classes.active : null} end>Posts</NavLink>
                    </li>
                    <li>
                        <NavLink to={Cookies.get('x-auth-token') ? 'profile' : 'login'} className={({isActive}) => isActive ? classes.active : null} end>Profile</NavLink>
                    </li>
                {
                    Cookies.get('x-auth-token') ? 
                    (
                        <li className={classes.nav_btn}>
                            <NavLink to='logout'><button><i className="fa-solid fa-right-from-bracket"></i> Logout</button></NavLink>
                        </li>
                    ) : (
                        <li className={classes.nav_btn}>
                            {
                                url.pathname === '/' &&
                                <NavLink to='login'><button>Login</button></NavLink>
                            }

                            {   
                                url.pathname === '/signup' &&
                                <NavLink to='login'><button>Login</button></NavLink>
                            }
                            
                            {   
                                url.pathname === '/login' &&
                                <NavLink to='signup'><button>Signup</button></NavLink>
                            }
                        </li>
                    )
                }
                </ul>
            </div>
        </nav>
    </header>
    )
}

export default NaviagationBar