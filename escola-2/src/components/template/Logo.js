import './Logo.css';
import logo from '../../assets/img/logo.png'

export default function Logo(props) {
    return (
        <aside className="logo">
            <a href='/' className='logo'>
                <img src={ logo } alt='Logo'/>
            </a>
        </aside>
    )
}