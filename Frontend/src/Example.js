import { Button, Page, ProfitValue, StatusBadge } from "./components/ui"
import { colors } from "./theme/theme";

function Example() {
    const trade = {
        name: "TCS",
        profit: -150,
        status: "closed",
    };

    return (
        <Page className="p-8">
            <div>
                <p style={{ color: colors.textPrimary }}>Hello kem chho</p>
            </div>
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-xl text-text-primary">Watchlist</h1>

                {/* st-* button */}
                <Button variant='green'>
                    + New Trade
                </Button>
            </div>

            {/* Card */}
            <div className="st-card p-4 flex flex-col gap-4">

                <div className="flex justify-between">
                    <h2 className="text-text-primary">My Trade</h2>
                    <StatusBadge status={trade.status} />
                </div>

                <div>
                    Profit: <ProfitValue value={trade.profit} />
                </div>

            </div>

        </Page>
    );
}

export default Example;