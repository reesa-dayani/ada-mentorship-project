import logo from '../images/Spotify_Icon_RGB_White.png'

const Header = () => {
    return (
        <header> 
            <h1 
                style={{ padding: 20, color: '#FFFFFF', marginTop:0 , verticalAlign: 'middle', fontSize: 30 }}>
                    <img className = "logo" src={logo} alt="Spotify Logo"></img> 
                Sortify
            </h1>
        </header>
    )
}

export default Header