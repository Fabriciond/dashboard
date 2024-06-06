import './components.css';
import logo from '../assets/dinametra.png';
export const NavComponent = () => {
    return(
        <>
           <nav className="navegation">
                <div className="content">
                    <img src={logo} alt="Logo-dinametra" />
                    <h1>Weather App</h1>
                </div>
           </nav>
        </>
    )

}