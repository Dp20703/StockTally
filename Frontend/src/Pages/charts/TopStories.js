import TradingViewNewsWidget from '../../components/ChartCompo/TradingViewNewsWidget'
import NavbarCompo from '../../components/Navbar'

const TopStories = () => {
    return (
        <>
            <div>
                <NavbarCompo />
                <TradingViewNewsWidget />
            </div>
        </>
    )
}

export default TopStories