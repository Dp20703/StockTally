import TradingViewNewsWidget from '../../components/ChartCompo/TradingViewNewsWidget'
import NavbarCompo from '../../components/Navbar'

const TopStories = () => {
    return (
        <>
            <NavbarCompo />
            <div id="dashboard" className='overflow-x-auto'>
                <TradingViewNewsWidget />
            </div>
        </>
    )
}

export default TopStories