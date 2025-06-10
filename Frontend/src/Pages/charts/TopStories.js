import TradingViewNewsWidget from '../../components/ChartCompo/TradingViewNewsWidget'
import NavbarCompo from '../../components/Navbar'

const TopStories = () => {
    return (
        <>
            <div id="dashboard" className='overflow-x-auto'>
                <NavbarCompo />
                <TradingViewNewsWidget />
            </div>
        </>
    )
}

export default TopStories